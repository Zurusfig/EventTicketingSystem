"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";

export function useLoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });

        if(res?.error) {
            setError(res.error);
        } else if(res?.url) {
            window.location.href = res.url || "/";
        }
    };


    return {
        values: { email, password },
        setters: { setEmail, setPassword },
        loading,
        error,
        handleSubmit,
    }
}