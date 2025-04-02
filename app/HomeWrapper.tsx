"use client";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useNotif } from "./context/NotificationProvider";
import { useAuth } from "./context/AuthProvider";
import { LoadingSpinner } from "./components";
import { supabase } from "@/app/utils/supabase";

const ParamsComponent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const emailConfirmed = params.get("email_confirmed") === "true";
  const signedIn = params.get("signedIn") === "true";
  const { setNotif } = useNotif();
  const { role: setPasswordRole } = useAuth();
  const role = params.get("role") || "CANDIDATE";
  // ✅ Prevent redundant execution
  const hasHandledEmail = useRef(false);
  const hasHandledSignIn = useRef(false);

  // ✅ Handle email confirmation
  useEffect(() => {
    if (emailConfirmed && !hasHandledEmail.current) {
      hasHandledEmail.current = true;
      setTimeout(() => {
        setNotif("success", "Email confirmed. Please sign in to continue.");
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

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        redirect(`/sign-in?action=reset-password&role=${setPasswordRole}`);
      }
    });
  }, [setPasswordRole]);

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
