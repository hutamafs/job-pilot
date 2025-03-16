"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/components/Modal";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { LoadingSpinner } from "@/app/components";
import { useNotif } from "@/app/context/NotificationProvider";

interface CoverLetterFormProps {
  isOpen: boolean;
  onClose: () => void;
  setIsApplied: (isApplied: boolean) => void;
  id: string;
  name: string;
}

const ApplyJobModal: React.FC<CoverLetterFormProps> = ({
  isOpen,
  onClose,
  id,
  name,
  setIsApplied,
}) => {
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState(
    "<p>Write down your biography here...</p>"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { setNotif } = useNotif();

  const editor = useEditor({
    extensions: [StarterKit, BulletList, OrderedList, ListItem],
    content: coverLetter,
    onUpdate: ({ editor }) => {
      setCoverLetter(editor.getHTML());
    },
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/jobs/${id}/apply-job`, {
        method: "POST",
        body: JSON.stringify({
          coverLetter,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setIsApplied(true);
      setNotif("success", data.message);
      router.refresh();
      onClose();
    } catch (error) {
      setNotif("error", (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal closeModal={onClose}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white max-w-4xl w-full p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg font-semibold mb-4">Apply as {name}</h2>

            {/* Cover Letter Input */}
            <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
              Cover Letter
            </label>

            {/* Toolbar */}
            {editor && (
              <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 bg-gray-100 p-2 rounded-md">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-2 py-1 text-sm rounded-md ${
                    editor.isActive("bold")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  bold
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-2 py-1 text-sm rounded-md ${
                    editor.isActive("italic")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Italic
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className="px-2 py-1 text-sm bg-gray-200 rounded-md"
                >
                  Strike
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`px-2 py-1 text-sm rounded-md ${
                    editor.isActive("bulletList")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Bullet list
                </button>
                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`px-2 py-1 text-sm rounded-md ${
                    editor.isActive("orderedList")
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Ordered list
                </button>
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().chain().focus().undo().run()}
                  className={`px-2 py-1 text-sm rounded-md ${
                    !editor.can().chain().focus().undo().run()
                      ? "bg-gray-200"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Undo
                </button>
              </div>
            )}

            {/* Editor Content */}
            <div className="border editor-container rounded-md mt-4 p-2 min-h-[150px] h-[200px]">
              <EditorContent editor={editor} />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                apply now
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ApplyJobModal;
