"use client";

import Image from "next/image";
import { PrintableImage } from "./PrintableImage";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Zap } from "lucide-react";

// Keep this here for development purposes to avoid making calls to OpenAI
const testImgUrl =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-nlKxgKwNROEfS68Tr5qWFg99/user-5TOtUFOGV7FOActUOQWvYrAp/img-3URoqdAiboVtyh7lccDsLqgl.png?st=2023-12-02T21%3A52%3A37Z&se=2023-12-02T23%3A52%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-02T22%3A45%3A05Z&ske=2023-12-03T22%3A45%3A05Z&sks=b&skv=2021-08-06&sig=aJKeoITqg2tjUAS%2B1fA21p8RXQ%2BIB4kYD6%2BL2Il8Kc4%3D";

export default function CreateOperations() {
  const [imageUrl, setImageUrl] = useState<null | string>(testImgUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const printableImgRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printableImgRef.current,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      console.log("Something went wrong!");
    }

    const { data } = await response.json();
    setImageUrl(data[0].url);
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
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </form>
        <div className="mt-6">
          {imageUrl ? (
            <>
              <Image src={imageUrl} alt={prompt} height={500} width={500} />
              <div style={{ display: "none" }}>
                <PrintableImage
                  alt={prompt}
                  onClick={handlePrint}
                  prompt={prompt}
                  src={imageUrl}
                  ref={printableImgRef}
                />
              </div>
            </>
          ) : (
            <div className="h-[500px] w-[500px] flex flex-col justify-center items-center space-y-4 border rounded-md"></div>
          )}
        </div>
        <div className="w-full mt-6 flex justify-center items-center space-x-2">
          <button onClick={handlePrint}>Print</button>
        </div>
      </div>
    </main>
  );
}
