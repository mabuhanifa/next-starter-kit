"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  const { data: session, status } = useSession();
  console.log("Session:", session, "Status:", status);

  if (status === "loading") {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (session && session.user) {
    return (
      <div className="relative group">
        <div className="flex items-center gap-2">
          <Image
            src={session.user.image ?? "/images/default-avatar.png"}
            alt={session.user.name ?? "User Avatar"}
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </div>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
          <div className="px-4 py-2 text-sm text-gray-700 truncate">
            {session.user.name}
          </div>
          <div className="border-t border-gray-100"></div>
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="bg-black hover:bg-hugg-green-dark text-white font-bold py-2 px-4 rounded-md text-sm"
    >
      Sign In
    </button>
  );
}
