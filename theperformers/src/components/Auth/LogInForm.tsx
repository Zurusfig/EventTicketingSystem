"use client";

import { useLoginForm } from "@/hooks/useLoginForm";
export default function LogInForm() {
    const {
        values: { email, password },
        setters: { setEmail, setPassword },
        loading,
        error,
        handleSubmit,
    } = useLoginForm();

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="cursor-pointer my-4 w-full rounded-full bg-lime-color text-navy-color py-3 font-medium hover:bg-lime-color/90 disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
                </form>
        </div>
    );
}