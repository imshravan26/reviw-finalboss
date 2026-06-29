import { App } from "octokit";

let githubApp: App | null = null;

export function getGithubApp(): App {
  if (!githubApp) {
    githubApp = new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      webhooks: {
        secret: process.env.GITHUB_WEBHOOK_SECRET!,
      },
    });
  }

  return githubApp;
}

export function getGithubInstallURL(userId: string) {
  const url = new URL("https://github.com/apps/reviw-app/installations/new");
  // state round trips the userId to the callback url so we can identify the user when the installation is complete
  url.searchParams.set("state", userId);
  return url.toString();
}
