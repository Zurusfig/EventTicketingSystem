"use client";

import AuthCard from "@/components/Auth/AuthCard";
import LogInForm from "@/components/Auth/LogInForm";
import Link from "next/link";
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
    <div className="min-h-screen fixed inset-0 overflow-hidden">
        <AuthCard title="Sign In">
            <LogInForm />
            <div className="text-sm text-center text-text-alternate-color mt-4">
                Don't have an account?{" "}
                <Link
                href="/signup"
                className="text-purple-color hover:text-purple-color/80 transition-all duration-300"
                >
                Sign up
                </Link>
            </div>
        </AuthCard>
    </div>
  );
}