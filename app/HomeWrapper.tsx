"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useNotif } from "./context/NotificationProvider";
import { LoadingSpinner } from "./components";

const ParamsComponent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const emailConfirmed = params.get("email_confirmed") === "true";
  const signedIn = params.get("signedIn") === "true";
  const [hashParams, setHashParams] = useState(
    new URLSearchParams(window.location.hash.substring(1))
  );

  const error = params.get("error");

  useEffect(() => {
    const handleHashChange = () => {
      setHashParams(new URLSearchParams(window.location.hash.substring(1)));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  const type = hashParams.get("type");
  const { setNotif } = useNotif();
  const role = params.get("role") || "CANDIDATE";
  // ✅ Prevent redundant execution
  const hasHandledEmail = useRef(false);
  const hasHandledSignIn = useRef(false);

  useEffect(() => {
    if (error) {
      setNotif("error", "you do not have access to that page");
    }
  }, [error, setNotif, role, router]);

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
    const accessToken = hashParams.get("access_token") || "";
    if (type === "recovery") {
      redirect(`/sign-in?action=reset-password&accessToken=${accessToken}`);
    }
  }, [hashParams, type]);

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
