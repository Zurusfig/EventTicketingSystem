"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.url) {
      window.location.href = res.url; // NextAuth-compliant redirect
    }
  };

    return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-color gap-8 mx-4">
        <div className="text-4xl md:text-5xl lg:text-6xl font-black text-center text-text-color my-8">THE PERFORMERS</div>
        <div className="w-full flex flex-col items-center justify-center gap-6">
            <form
                onSubmit={handleSubmit}
                className="mx-4 w-full max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 p-6 rounded-xl bg-bg-alternate-color shadow text-text-alternate-color py-6 md:px-8 lg:px-10 xl:pg-12"
            >
                <h1 className="py-6 text-2xl md:text-3xl lg:text-4xl font-black text-center">Sign in</h1>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-color"
                    required
                />
                </div>

                <div>
                <label className="block text-sm mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-color"
                    required
                />
                </div>

                <button
                type="submit"
                disabled={loading}
                className="my-6 cursor-pointer w-full rounded-full bg-lime-color text-navy-color py-4 font-medium hover:scale-102 transition-all duration-300 hover:bg-lime-color/90"
                >
                {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
            <div className="text-sm text-center text-text-muted-color">
                Don't have an account? <Link href="/signup" className="text-purple-color hover:text-purple-color/80 transition-all duration-300">Sign up</Link>
            </div>
      </div>
    </main>
  );
}