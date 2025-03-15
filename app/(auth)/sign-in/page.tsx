import { Suspense } from "react";
import Link from "next/link";
import { LoadingSpinner } from "@/app/components";
import { signInAction } from "@/app/api/(auth)/sign-in/route";

const CandidateSignIn = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-6 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Candidate Sign In
        </h2>
        <form className="flex flex-col gap-4 mt-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border h-10 p-2 rounded-md w-full"
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border h-10 p-2 rounded-md w-full"
          />

          {/* Sign In Button */}
          <button
            // type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            formAction={signInAction}
          >
            sign in
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
