"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Submitted!");
  }

  return (
    <form className="w-full flex flex-col space-y-2">
      <input
        className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 text-black"
        type="text"
        name="firstName"
        placeholder="First name"
        onChange={handleChange}
      />
      <input
        className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 text-black"
        type="text"
        name="lastName"
        placeholder="Last name"
        onChange={handleChange}
      />
      <input
        className="h-10 w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 text-black"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <button
        className="w-full h-10 bg-[#0f172a] hover:bg-[#0f172a]/90 transition-colors text-white text-sm rounded-md font-medium"
        onClick={handleSubmit}
      >
        Register
      </button>
    </form>
  );
}
