"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
    }

    return () => {
      if (modalRoot && elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 max-w-4xl rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh] z-[1001]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
