"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Notification, LoadingSpinner } from "@/app/components";
import { useAuth } from "@/app/context/AuthProvider";

const CandidateSignIn = () => {
  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl");
  const redirectUrl = callbackUrl ? decodeURIComponent(callbackUrl) : "/";
  const { fetchUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "candidate",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify({ ...formData, callbackUrl }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Sign in successful",
        });
        await fetchUser();
        router.push(redirectUrl);
      }
      throw new Error(data.message || "Sign in failed");
    } catch (error) {
      setNotification({
        type: "error",
        message: (error as Error).message,
      });
    } finally {
      setNotification({
        type: "",
        message: "",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Candidate Sign In
        </h2>

        {notification.message && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification({ type: "", message: "" })}
          />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 rounded-md w-full"
          />

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/candidate/sign-up"
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CandidateSignIn />
    </Suspense>
  );
};

export default Page;
