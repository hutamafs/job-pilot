"use client";
import Modal from "../../common/Modal";
import LoadingSpinner from "../../common/LoadingSpinner";

import { useState } from "react";

const ResetPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
          onClick={() => {
            setIsLoading(true);
            // Call the onSubmit function with the email
            // onSubmit(email);
            setTimeout(() => {
              setIsLoading(false);
              onClose();
            }, 2000);
          }}
          disabled={isLoading}
          className={`btn ${isLoading ? "loading" : ""}`}
        >
          {isLoading ? <LoadingSpinner /> : "Send Reset Link"}
        </button>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
