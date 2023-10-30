"use client";

import Image from "next/image";
import { useState } from "react";
import { Zap } from "lucide-react";
import useSWR from "swr";
import Spinner from "./common/Spinner";
import { useEffect } from "react";
import { db } from "@/services/firebase";
import { collection, addDoc, setDoc } from "firebase/firestore";
import { io } from "socket.io-client";

const buttons: string[] = [
  "U1",
  "U2",
  "U3",
  "U4",
  "🔄",
  "V1",
  "V2",
  "V3",
  "V4",
];

const SOCKET_IO_SERVER_URL = "http://localhost:3000";

export default function CreateOperations() {
  const [prompt, setPrompt] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_IO_SERVER_URL);

    socket.on("the-next-leg", (data: any) => {
      console.log("Received event:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
      console.log("Something went wrong!");
    }
  }

  return (
    <main className="min-h-screen relative mt-12 flex flex-col items-center">
      <div className="w-1/2 mt-12 flex flex-col items-center spacy-y-4">
        <div className="flex flex-col items-center leading-none">
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="text-gray-500 font-medium">
            Generate your own coloring books
          </p>
        </div>
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
        <div className="mt-6">
          <div className="h-[500px] w-[500px] flex flex-col justify-center items-center space-y-4 border rounded-md"></div>
        </div>
        <div className="w-full mt-6 flex justify-center items-center space-x-2">
          {buttons.map((button: string, idx: number) => {
            return (
              <button
                className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 rounded-md text-sm text-black font-medium"
                key={idx}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
