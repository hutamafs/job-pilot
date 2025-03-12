"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotif } from "./context/NotificationProvider";
import { useEffect } from "react";
import { LoadingSpinner } from "./components";

const ParamsComponent = () => {
  const params = useSearchParams();
  const router = useRouter();
  const confirmed = params.get("email_confirmed") === "true";
  const { setNotif } = useNotif();

  useEffect(() => {
    if (confirmed) {
      setNotif("success", "Email confirmed. Please sign in to continue.");
      setTimeout(() => {
        router.replace("/sign-in");
      }, 3000);
    }
  }, [confirmed, router, setNotif]);
  return <></>;
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ParamsComponent />
    </Suspense>
  );
};

export default Page;
