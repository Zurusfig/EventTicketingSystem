"use client"

import { useState, FormEvent, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // console.log(process.env.NEXT_PUBLIC_API_URL);

    // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`);

    // console.log(name, email, password, tel);

    const passwordStrength = useMemo(() => {
        if (!password) return { score: 0, label: "None", requirements: [] };

        const requirements = [
            { text: "At least 8 characters", met: password.length >= 8 },
            { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
            { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
            { text: "Contains number", met: /[0-9]/.test(password) },
            { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        ];

        const score = requirements.filter(r => r.met).length;
        const labels = ["Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
        
        return {
            score,
            label: labels[score] || "None",
            requirements,
        };
    }, [password]);

    const passwordsMatch = useMemo(() => {
        if (!confirmPassword) return false;
        return password === confirmPassword;
    }, [password, confirmPassword]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        } else if (passwordStrength.score < 2) {
            setError("Password is too weak");
            setLoading(false);
            return;
        } else if (!passwordsMatch) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            setLoading(false);
            return;
        }

        // Validate name
        if (name.trim().length < 2) {
            setError("Name must be at least 2 characters");
            setLoading(false);
            return;
        }

        // Validate tel
        const telRegex = /^\d{10}$/;
        if (!telRegex.test(tel)) {
            setError("Please enter a valid phone number");
            setLoading(false);
            return;
        }

        const today = new Date().toISOString().slice(0, 10);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        name,
                        email,
                        password,
                        tel,  
                        // role: "member",
                        // createdAt: today,
                     }),
                  }
            )

            const data = await res.json().catch(() => null);
            //console.log("status", res.status, "body", data);

            if(!res.ok) {
                const body = await res.json();
                throw new Error(body.message || "Registration failed or Email already exists. Please try again.");
                console.log("Registration failed");
            }

            await signIn("credentials", {
                email:email.trim().toLowerCase(),
                password,
                callbackUrl: "/",
            });

            console.log("Registration successful");
        } catch (error) {
            setError("Registration failed or Email already exists. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return {
        values: { email, name, tel, password, confirmPassword },
        setters: { setEmail, setName, setTel, setPassword, setConfirmPassword },
        loading,
        error,
        passwordStrength,
        passwordsMatch,
        handleSubmit,
    };
}