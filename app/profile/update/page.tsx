"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, UserCheck } from "lucide-react";

function UpdateNameForm({ initialName }: { initialName: string }) {
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
      // Follows https://better-auth.com/docs/concepts/users-accounts#update-user
      await authClient.updateUser({
        name: name.trim(),
      });
      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("তথ্য আপডেট ব্যর্থ হয়েছে");
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
          placeholder="আপনার নতুন নাম লিখুন"
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
          <span>তথ্য আপডেট করুন</span>
        )}
      </button>
    </form>
  );
}

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const redirectedRef = React.useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !redirectedRef.current) {
      redirectedRef.current = true;
      toast.error("অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?callbackUrl=/profile/update");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[450px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              তথ্য পরিবর্তন করুন
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              আপনার অ্যাকাউন্টের নাম আপডেট করুন
            </p>
          </div>
        </div>

        <UpdateNameForm initialName={session.user.name || ""} />

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
