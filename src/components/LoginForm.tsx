"use client";

import { Metadata } from "next";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Login | Libello",
  description: "Login to your account",
};

export default function LoginForm() {
  const [email, setEmail] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Submitted!");
  }

  return (
    <form className="w-full flex flex-col space-y-2">
      <input
        className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 text-black"
        type="email"
        placeholder="name@example.com"
        onChange={handleChange}
      />
      <button
        className="w-full h-10 bg-[#0f172a] hover:bg-[#0f172a]/90 transition-colors text-white text-sm rounded-md font-medium"
        onClick={handleSubmit}
      >
        Sign in
      </button>
    </form>
  );
}
