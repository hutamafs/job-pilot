"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LoadingSpinner } from "@/app/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotif } from "@/app/context/NotificationProvider";
import { useAuth } from "@/app/context/AuthProvider";
import ResetPasswordModal from "@/app/components/pages/SignIn/ResetPasswordModal";
import SetPasswordModal from "@/app/components/pages/SignIn/SetPasswordModal";

const SignInPage = () => {
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl");
  const role = params?.get("role");
  const { setNotif } = useNotif();
  const { setUser, setRole } = useAuth();
  const [routeRole, setRouteRole] = useState(role || "CANDIDATE");

  useEffect(() => {
    if (callbackUrl) {
      setRole("");
      setUser(null);
    }
  }, [setRole, setUser, callbackUrl]);

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          type: routeRole,
        }),
      });
      const { message, user } = await res.json();
      if (res.ok) {
        setRole(user.type);
        setUser(user);
        setNotif("success", "Signed in successfully");
        router.push(callbackUrl || "/");
      } else {
        throw new Error(message);
      }
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {/* Toggle between Candidate & Employer */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setRouteRole("CANDIDATE")}
            className={`px-4 py-2 rounded-l-md ${routeRole === "CANDIDATE" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Candidate
          </button>
          <button
            onClick={() => setRouteRole("COMPANY")}
            className={`px-4 py-2 rounded-r-md ${routeRole === "COMPANY" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Company
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {routeRole} Sign In
        </h2>

        <form className="flex flex-col gap-4 mt-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border h-10 p-2 rounded-md w-full"
            onChange={handleChange}
            value={formData.email}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border h-10 p-2 rounded-md w-full"
            onChange={handleChange}
            value={formData.password}
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            onClick={handleSubmit}
            disabled={isLoading || !formData.email || !formData.password}
          >
            {isLoading ? <LoadingSpinner /> : "Sign in"}
          </button>
        </form>

        {/* Reset Password Link */}
        <p className="text-center text-sm mt-2 text-gray-600">
          <button
            type="button"
            className="text-orange-600 hidden hover:underline bg-transparent border-none p-0 cursor-pointer"
            onClick={() => setShowResetPasswordModal(true)}
          >
            Forgot your password?
          </button>
        </p>

        {showResetPasswordModal && (
          <ResetPasswordModal
            onClose={() => setShowResetPasswordModal(false)}
          />
        )}

        {showSetPasswordModal && (
          <SetPasswordModal onClose={() => setShowSetPasswordModal(false)} />
        )}

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href={
              routeRole === "COMPANY"
                ? "/company/sign-up"
                : "/candidate/sign-up"
            }
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
