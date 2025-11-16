"use client";

import AuthCard from "@/components/Auth/AuthCard";
import LogInForm from "@/components/Auth/LogInForm";
import Link from "next/link";

export default function LoginPage() {
    return (
    <>
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
    </>
  );
}