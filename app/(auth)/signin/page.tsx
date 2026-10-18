"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।");
        setLoading(false);
      } else {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push(callbackUrl);
        router.refresh();
        setTimeout(() => {
          if (window.location.pathname === "/signin") {
            window.location.href = callbackUrl;
          }
        }, 300);
      }
    } catch (err) {
      console.error("Sign in error:", err);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
    } catch {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন ব্যর্থ হয়েছে।`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-220px)] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      <div className="max-w-[440px] w-full bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            সাইন ইন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-normal">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm text-gray-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-sm text-gray-900 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl text-white bg-emerald-700 hover:bg-emerald-800 font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>সাইন ইন</span>
            )}
          </button>
        </form>

        {/* Divider "অথবা" */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">
            অথবা
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!!socialLoading}
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-[13px] font-medium text-gray-700 transition-colors cursor-pointer shadow-2xs"
          >
            {socialLoading === "google" ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="truncate">Google দিয়ে চালান</span>
          </button>

          <button
            type="button"
            disabled={!!socialLoading}
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-[13px] font-medium text-gray-700 transition-colors cursor-pointer shadow-2xs"
          >
            {socialLoading === "github" ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
            ) : (
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
            <span className="truncate">GitHub দিয়ে চালান</span>
          </button>
        </div>

        {/* Link to SignUp */}
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Return to Home link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-emerald-700 transition-colors mt-6 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-220px)] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-700" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
