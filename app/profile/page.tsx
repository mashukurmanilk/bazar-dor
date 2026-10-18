"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { LogOut, Loader2, Edit3 } from "lucide-react";

function ProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    setUpdating(true);
    try {
      await authClient.updateUser({
        name: name.trim(),
      });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট করতে ব্যর্থ হয়েছে");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
          নাম
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm text-gray-900 bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={updating}
        className="w-full py-3 px-4 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
      >
        {updating ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <span>আপডেট</span>
        )}
      </button>
    </form>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const redirectedRef = React.useRef(false);

  // Protect profile page
  useEffect(() => {
    if (!isPending && !session?.user && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?callbackUrl=/profile");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সাইন আউট সফল হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[450px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      </div>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="space-y-6">
        {/* Card 1: User Identity Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                width={64}
                height={64}
                unoptimized
                className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-600/20 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-700 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-xs">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {user.name || "নাম সেট করা হয়নি"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile/update"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>আপডেট পেজ</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Card 2: তথ্য (Information Update Form) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
            তথ্য
          </h3>
          <ProfileForm initialName={user.name || ""} />
        </div>
      </div>
    </div>
  );
}
