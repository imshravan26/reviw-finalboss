import type { GithubInstallationStatus } from "~/features/dashboard/lib/types";
import { getGithubApp } from "~/features/github/utils/github-app";
import { GithubInstallation } from "@repo/database/schema";
import { db, eq } from "@repo/database/index";
import { getServerSession } from "~/features/auth/actions";
import { redirect } from "next/navigation";
import { DASHBOARD_ROUTES } from "~/features/dashboard/lib/routes";

function getAccountLogin(
  account: { login?: string; slug?: string } | null | undefined,
): string | null {
  if (!account) return null;
  if ("login" in account && account.login) return account.login;
  if (account.slug) return account.slug;
  return null;
}

function buildDisconnectedStatus(): GithubInstallationStatus {
  return { connected: false, accountLogin: null, installedAt: null };
}

export async function getInstallationStatus(userId: string) {
  const [installation] = await db
    .select()
    .from(GithubInstallation)
    .where(eq(GithubInstallation.userId, userId))
    .limit(1);

  if (!installation) {
    return buildDisconnectedStatus();
  }

  return {
    connected: true,
    accountLogin: installation.accountLogin,
    installedAt: installation.createdAt.toISOString(),
  };
}

export async function saveInstallation(userId: string, installationId: number) {
  const app = getGithubApp();

  const { data } = await app.octokit.request(
    "GET /app/installations/{installation_id}",
    {
      installation_id: installationId,
    },
  );

  const accountLogin = getAccountLogin(data.account);

  await db
    .insert(GithubInstallation)
    .values({
      id: crypto.randomUUID(),
      userId,
      installationId,
      accountLogin,
      accountType: data.target_type ?? null,
    })
    .onConflictDoUpdate({
      target: GithubInstallation.userId,
      set: {
        installationId,
        accountLogin,
        accountType: data.target_type ?? null,
        updatedAt: new Date(),
      },
    });
}

export async function deleteInstallation(userId: string) {
  const [installation] = await db
    .select()
    .from(GithubInstallation)
    .where(eq(GithubInstallation.userId, userId))
    .limit(1);

  if (!installation) {
    return;
  }

  const app = getGithubApp();

  await app.octokit.request("DELETE /app/installations/{installation_id}", {
    installation_id: installation.installationId,
  });

  await db
    .delete(GithubInstallation)
    .where(eq(GithubInstallation.userId, userId));
}

export async function getuserIdByInstallationId(installationId: number) {
  const [installation] = await db
    .select()
    .from(GithubInstallation)
    .where(eq(GithubInstallation.installationId, installationId))
    .limit(1);

  if (!installation) {
    return null;
  }

  return installation.userId;
}
