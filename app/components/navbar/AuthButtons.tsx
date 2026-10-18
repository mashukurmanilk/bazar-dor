"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/app/lib/auth-client";
import { LogOut, User as UserIcon, ChevronDown } from "lucide-react";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (session?.user) {
    const user = session.user;
    const displayName = user.name || user.email?.split("@")[0] || "ব্যবহারকারী";
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-xl hover:bg-gray-100 transition-colors border border-gray-200/80 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {/* Avatar image or initial */}
          {user.image ? (
            <Image
              src={user.image}
              alt={displayName}
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-600/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-semibold flex items-center justify-center text-sm shadow-xs">
              {initial}
            </div>
          )}

          <span className="hidden sm:inline-block font-medium text-sm text-gray-800 max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3.5 py-2.5 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {displayName}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">
                {user.email}
              </p>
            </div>

            <Link
              href="/profile"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserIcon className="w-4 h-4 text-gray-400" />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>সাইন আউট</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Logged-out state: "সাইন ইন" + "সাইন আপ"
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/signin"
        className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white shadow-xs"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
