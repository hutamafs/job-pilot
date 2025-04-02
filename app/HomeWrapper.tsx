"use client";
import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useNotif } from "./context/NotificationProvider";
import { LoadingSpinner } from "./components";
import { supabase } from "@/app/utils/supabase";

const ParamsComponent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const emailConfirmed = params.get("email_confirmed") === "true";
  const signedIn = params.get("signedIn") === "true";
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const type = hashParams.get("type");
  const { setNotif } = useNotif();
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
    const accessToken = params.get("access_token") || "";
    const getRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser(accessToken);
      return user;
    };

    if (type === "recovery") {
      (async () => {
        const user = await getRole();

        if (user) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user`,
            {
              headers: {
                Authorization: `${user?.id}`,
              },
            }
          );
          const { role } = await res.json();
          redirect(`/sign-in?action=reset-password&role=${role}`);
        }
      })();
    }
  }, [params, type]);

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
