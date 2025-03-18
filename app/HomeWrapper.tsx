"use client";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotif } from "./context/NotificationProvider";
import { LoadingSpinner } from "./components";

const ParamsComponent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const emailConfirmed = params.get("email_confirmed") === "true";
  const signedIn = params.get("signedIn") === "true";
  const { setNotif } = useNotif();
  const role = params.get("role");
  // ✅ Prevent redundant execution
  const hasHandledEmail = useRef(false);
  const hasHandledSignIn = useRef(false);

  // ✅ Handle email confirmation
  useEffect(() => {
    if (emailConfirmed && !hasHandledEmail.current) {
      hasHandledEmail.current = true;
      setNotif("success", "Email confirmed. Please sign in to continue.");
      setTimeout(() => {
        router.replace(`/sign-in?role=${role}`);
      }, 3000);
    }
  }, [emailConfirmed, router, setNotif, role]);

  // ✅ Handle successful sign-in
  useEffect(() => {
    if (signedIn && !hasHandledSignIn.current) {
      hasHandledSignIn.current = true;
      setNotif("success", "Signed in successfully!");
    }
  }, [signedIn, setNotif]);

  return null;
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ParamsComponent />
    </Suspense>
  );
};

export default Page;
