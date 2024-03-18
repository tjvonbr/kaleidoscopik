"use client";

import Image from "next/image";
import { PrintableImage } from "./PrintableImage";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { User } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { Textarea } from "./ui/textarea";
import { spawn } from "child_process";

// Keep this here for development purposes to avoid making calls to OpenAI
// const testImgUrl =
// "https://oaidalleapiprodscus.blob.core.windows.net/private/org-nlKxgKwNROEfS68Tr5qWFg99/user-5TOtUFOGV7FOActUOQWvYrAp/img-3URoqdAiboVtyh7lccDsLqgl.png?st=2023-12-02T21%3A52%3A37Z&se=2023-12-02T23%3A52%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-12-02T22%3A45%3A05Z&ske=2023-12-03T22%3A45%3A05Z&sks=b&skv=2021-08-06&sig=aJKeoITqg2tjUAS%2B1fA21p8RXQ%2BIB4kYD6%2BL2Il8Kc4%3D";

interface CanvasProps {
  userId: Pick<User, "id">;
}

export default function Canvas({ userId }: CanvasProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const printableImgRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printableImgRef.current,
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
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
    <form onSubmit={handleSubmit}>
      <div className="grid w-full gap-10">
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: "ghost" }), "self-start")}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
          <p className="text-sm text-muted-foreground">3 credits remaining</p>
        </div>
        <div className="grid flex-1 gap-12 md:grid-cols-[400px_1fr]">
          <aside className="hidden w-[400px] flex-col md:flex gap-4">
            <Textarea
              placeholder="Description of your desired coloring sheet..."
              onChange={handleChange}
              value={prompt}
            ></Textarea>
            <button type="submit" className={cn(buttonVariants())}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin duration-500" />
              ) : (
                <span>Create</span>
              )}
            </button>
          </aside>
          <main className="flex w-full flex-1 flex-col justify-center items-center border overflow-hidden h-full p-10 rounded-md">
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
            ) : null}
          </main>
        </div>
      </div>
    </form>
  );
}
