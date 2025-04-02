"use client";
import Modal from "../../common/Modal";
import { useState } from "react";
import { supabase } from "@/app/utils/supabase";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useNotif } from "@/app/context/NotificationProvider";
import { useAuth } from "@/app/context/AuthProvider";

const ResetPasswordModal = ({
  onClose,
}: {
  onClose: () => void;
  setResetPasswordRole: (role: string) => void;
}) => {
  const { setNotif } = useNotif();
  const { setRole } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-role-by-email?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
        }
      );
      const { data: role } = await response.json();
      setRole(role);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in?action=reset-password&role=${role}`,
      });

      if (error) throw new Error(error.message);
      if (data) {
        setNotif("success", "Password reset email sent successfully");
      }
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal closeModal={onClose}>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">Reset Password</h2>
        <p className="text-sm text-gray-500">
          Enter your email address to receive a link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2"
        />
        <button
          onClick={resetPassword}
          disabled={isLoading}
          className={`btn ${isLoading ? "loading" : ""} bg-primary500 text-white p-2 rounded-md hover:text-orange-500 font-medium transition `}
        >
          {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
        </button>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
