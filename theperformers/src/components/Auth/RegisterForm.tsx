"use client";

import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterForm() {
    const {
        values: { email, name, tel, password },
        setters: { setEmail, setName, setTel, setPassword },
        loading,
        error,
        handleSubmit,
    } = useRegisterForm();
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
                <div className="block text-sm mb-1">Name</div>
                <input
                className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-alternate-color"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>

            <div>
                <div className="block text-sm mb-1">Telephone Number</div>
                <input
                className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-alternate-color"
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                pattern="^\d{10}$"
                title="Please enter a 10-digit telephone number"
                required
                />
            </div>

            <div>
                <div className="block text-sm mb-1">Email</div>
                <input
                type="email"
                className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-alternate-color"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div>
                <div className="block text-sm mb-1">Password</div>
                <input
                type="password"
                className="w-full border border-border-color rounded px-3 py-2 bg-bg-color text-text-alternate-color"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full rounded-full bg-lime-color text-navy-color py-3 font-semibold hover:bg-lime-color/90 disabled:opacity-50"
            >
                {loading ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}