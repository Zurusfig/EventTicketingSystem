import AuthCard from "@/components/Auth/AuthCard";
import RegisterForm from "@/components/Auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {

    return (
        <div className="min-h-screen fixed inset-0 overflow-hidden">
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
