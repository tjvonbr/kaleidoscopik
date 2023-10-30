import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getResultsSchema = z.object({
  createdAt: z.string(),
  buttons: z.array(z.string()),
  type: z.string(),
  imageUrl: z.string(),
  imageUrls: z.array(z.string()),
  buttonMessageId: z.string(),
  originatingMessageId: z.string(),
  content: z.string(),
  ref: z.string(),
  responseAt: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    return new NextResponse("Hello, world!");
  } catch (error) {
    console.log(error);
  }
}
