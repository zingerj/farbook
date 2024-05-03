/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, type ButtonHTMLAttributes } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useSignIn } from "@farcaster/auth-kit";
import { signIn as _signIn, useSession } from "next-auth/react";
import QRCode from "react-qr-code";
import { redirect } from "next/navigation";

/**
 * Wraps the Farcaster Authkit sign-in button + next-auth sign-in in a client component.
 */
export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [open, toggle] = useState(false);

  const { signIn, connect, data, isConnected, url } = useSignIn({});

  const session = useSession();
  const fid = session?.data?.user?.fid;

  useEffect(() => {
    if (data?.fid) {
      void (async () => {
        const user = {
          id: data.fid,
          fid: data.fid,
          username: data.username,
          bio: data.bio,
          display_name: data.displayName,
          pfp_url: data.pfpUrl,
          verifications: data.verifications,
          custody: data.custody,
        };

        await _signIn("credentials", { ...user, redirect: false });
      })();
    }
  }, [data]);

  useEffect(() => {
    // redirect to home once signed in
    if (fid) redirect("/");
  }, [fid]);

  useEffect(() => {
    if (open) {
      void connect();
    }
  }, [open]);

  useEffect(() => {
    if (isConnected) {
      console.log("connected");
      signIn();
    }
  }, [isConnected]);

  return (
    <Dialog.Root open={open} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <button {...props}>{children}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 top-0 z-10 h-screen w-screen bg-fb-dgrey opacity-25" />
        <div className="col-c-c fixed left-0 top-0 z-20 h-screen w-screen">
          <Dialog.Content className="col-c-c rounded-lg bg-white p-4 text-fb-dgrey">
            <span className="text-lg font-bold">
              Scan this QR Code to sign in
            </span>
            <span className="text-sm">Only desktop is supported</span>
            <div className="h-4" />
            {url ? (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={url}
                viewBox={`0 0 256 256`}
                fgColor="#24325D"
              />
            ) : (
              "Loading..."
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
