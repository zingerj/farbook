"use client";

import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  console.log(session);
  return (
    <div className="h-screen w-screen">
      <button onClick={() => signOut({ callbackUrl: "/sign-in" })}>
        Sign Out
      </button>
    </div>
  );
}
