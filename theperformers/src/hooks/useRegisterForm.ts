"use client"

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // console.log(process.env.NEXT_PUBLIC_API_URL);

    // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`);

    // console.log(name, email, password, tel);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
            console.log("status", res.status, "body", data);

            if(!res.ok) {
                const body = await res.json();
                throw new Error(body.message || "Failed to register");
                console.log("Registration failed");
            }

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
            });

            console.log("Registration successful");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to register");
        } finally {
            setLoading(false);
        }
    }

    return {
        values: { email, name, tel, password },
        setters: { setEmail, setName, setTel, setPassword },
        loading,
        error,
        handleSubmit,
    };
}