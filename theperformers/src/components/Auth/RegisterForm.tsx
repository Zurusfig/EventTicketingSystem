"use client";

import { useRegisterForm } from "@/hooks/useRegisterForm";

export default function RegisterForm() {
    const {
        values: { email, name, tel, password, confirmPassword },
        setters: { setEmail, setName, setTel, setPassword, setConfirmPassword },
        loading,
        error,
        passwordStrength,
        passwordsMatch,
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
                {password && (
                    <div className="text-xs mt-1">
                        <div className={`${passwordStrength.score >= 2 ? 'text-green-500' : 'text-yellow-500'}`}>
                            Strength: {passwordStrength.label}
                        </div>
                        {passwordStrength.requirements.map((req, idx) => (
                            <div key={idx} className={req.met ? 'text-green-500' : 'text-gray-400'}>
                                {req.met ? '✓' : '○'} {req.text}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <div className="block text-sm mb-1">Confirm Password</div>
                <input
                    type="password"
                    className={`w-full border rounded px-3 py-2 bg-bg-color text-text-alternate-color ${
                        confirmPassword && !passwordsMatch 
                            ? 'border-red-500' 
                            : 'border-border-color'
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {confirmPassword && !passwordsMatch && (
                    <div className="text-red-500 text-xs mt-1">Passwords do not match</div>
                )}
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