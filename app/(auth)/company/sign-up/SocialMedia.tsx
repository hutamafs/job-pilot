"use client";
// import { StepProps } from "./page";
import { useState } from "react";

export default function SocialMedia() {
  const [links, setLinks] = useState([{ id: 1, platform: "", url: "" }]);

  const addLink = () => {
    setLinks([...links, { id: links.length + 1, platform: "", url: "" }]);
  };

  // const handleChange = (
  //   e:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={link.id} className="flex gap-2">
          <select className="w-1/3 border p-2 rounded-md">
            <option>Facebook</option>
            <option>Twitter</option>
            <option>Instagram</option>
          </select>
          <input
            type="url"
            placeholder="Profile Link"
            className="w-2/3 border p-2 rounded-md"
            value={link.url}
            onChange={(e) => {
              const updatedLinks = [...links];
              updatedLinks[index].url = e.target.value;
              setLinks(updatedLinks);
            }}
          />
        </div>
      ))}

      <button
        onClick={addLink}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md mt-2"
      >
        + Add Social Link
      </button>
    </div>
  );
}
