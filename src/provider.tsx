"use client";

import { AuthKitProvider } from "@farcaster/auth-kit";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import "@farcaster/auth-kit/styles.css";

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <AuthKitProvider config={config}>{children}</AuthKitProvider>
    </SessionProvider>
  );
}

const config = {
  rpcUrl: process.env.RPC_URL,
  domain: "thefarbook.com",
  siweUri: "https://thefarbook.com/login",
};
