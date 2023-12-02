import { openai } from "@/services/openai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const generateImageSchema = z.object({
  prompt: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = generateImageSchema.parse(json);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: body.prompt,
    });

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
