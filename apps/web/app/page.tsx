"use client";
// import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ClientGreeting } from "./client-greeting";
import { ModeToggle } from "~/components/mode-toggle";
import { authClient } from "~/lib/auth-client";
import { UserMenuWithSession } from "~/features/auth/components/user-menu";

export default function Home() {
  const { data } = authClient.useSession();
  console.log("Session data:", data);

  return (
    // <HydrateClient>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <main className="min-h-screen bg-background text-foreground ">
        <header className="top-0 z-50 bg-background/95 backdrop-blur w-full justify-center items-center border-b border-border">
          <div className=" flex h-14 items-center justify-between px-10 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-heading text-lg font-semibold tracking-normal"
              aria-label="reviw home"
            >
              reviw
            </Link>

            <div className="items-center justify-center space-x-1">
              <UserMenuWithSession variant="compact" /> <ModeToggle />
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Hello world!</h1>
          <ClientGreeting />
        </section>
      </main>
    </ErrorBoundary>
    // </HydrateClient>
  );
}
