"use client";
import Modal from "../../common/Modal";
import { useState } from "react";
import { supabase } from "@/app/utils/supabase";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useNotif } from "@/app/context/NotificationProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const { setNotif } = useNotif();
  const [formData, setFormData] = useState({
    password: "",
    confirmedPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmedPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetPassword = async () => {
    try {
      setIsLoading(true);
      if (formData.password !== formData.confirmedPassword) {
        setNotif("error", "Passwords do not match");
        return;
      }
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) throw new Error(error.message);
      if (data) {
        setNotif("success", "Password has been changed");

        onClose();
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
          Enter your new password and confirmation password.
        </p>
        <div className="relative">
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded-md w-full pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                password: !showPassword.password,
              }))
            }
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPassword.password ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword.confirmedPassword ? "text" : "password"}
            name="confirmedPassword"
            placeholder="Confirm Password"
            value={formData.confirmedPassword}
            onChange={handleChange}
            className="border p-2 rounded-md w-full pr-10"
          />
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmedPassword: !showPassword.confirmedPassword,
              }))
            }
            className="absolute right-3 top-3 text-gray-600"
          >
            {showPassword.confirmedPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={resetPassword}
          disabled={isLoading}
          className={`btn ${isLoading ? "loading" : ""} bg-primary500 text-white p-2 rounded-md hover:text-orange-500 font-medium transition `}
        >
          {isLoading ? <LoadingSpinner /> : "Update"}
        </button>
      </div>
    </Modal>
  );
};

export default SetPasswordModal;
