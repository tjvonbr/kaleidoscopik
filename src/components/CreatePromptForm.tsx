"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

export function CreatePromptForm() {
  const [prompt, setPrompt] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsMutating(true);

    const response = await fetch("/api/imagine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    setIsMutating(false);

    if (!response.ok) {
    }

    setPrompt("");
  }

  return (
    <form className="w-3/4 mt-6 flex space-x-2">
      <div className="relative flex-grow bg-gray-100 border border-gray-200 rounded-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <Zap color="gray" size={15} />
        </span>
        <input
          className="h-full w-full py-2 text-sm bg-gray-100 rounded-md pl-7 transition-colors focus:outline-none focus:text-gray-900"
          type="text"
          placeholder="What are you looking for?"
          value={prompt}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      <button
        className="flex justify-center items-center bg-black text-white rounded-md text-sm font-medium h-10 w-[100px]"
        onClick={handleSubmit}
      >
        {isMutating ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
