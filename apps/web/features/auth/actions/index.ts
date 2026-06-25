"use server";

import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEFAULT_AUTH_CALLBAcK,
  getSafeCallbackPath,
  SIGN_IN_PATH,
} from "../utils";

export async function signInWithGithub(formData: FormData) {
  const callbackUrl = formData.get("callbackUrl")?.toString() || "/";

  const redirectTo = getSafeCallbackPath(
    typeof callbackUrl === "string" ? callbackUrl : null,
  );
  const result = await auth.api.signInSocial({
    body: {
      provider: "github",
      callbackURL: redirectTo,
    },
  });

  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth(redirectTo = SIGN_IN_PATH) {
  const session = await getServerSession();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}

export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBAcK) {
  const session = await getServerSession();
  if (session) {
    redirect(redirectTo);
  }
}
