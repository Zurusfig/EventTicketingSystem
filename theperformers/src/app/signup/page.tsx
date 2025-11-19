"use client";
import AuthCard from "@/components/Auth/AuthCard";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterPage() {

  const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push("/"); // Redirect to home if already logged in
        }
    }, [session, router]);


    // Don't render form if user is logged in (while redirecting)
    if (session?.user) {
        return null;
    }

    return (
      <div className="min-h-screen flex items-center justify-center py-12 bg-bg-color">
        <AuthCard title="Sign Up">
      <RegisterForm />
      <div className="text-sm text-center text-text-alternate-color mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-purple-color hover:text-purple-color/80 transition-all duration-300"
        >
          Sign in
        </Link>
      </div>
    </AuthCard>
    </div>
    );
}
