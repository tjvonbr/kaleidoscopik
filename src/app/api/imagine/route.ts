import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const midjourneyKey = process.env.NEXT_LEG_API_KEY;

const generateImageSchema = z.object({
  prompt: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = generateImageSchema.parse(json);

    const response = await fetch("https://api.thenextleg.io/v2/imagine", {
      method: "POST",
      headers: {
        Authorization: `Bearer b827b8f9-270f-469d-9d38-cf061d419406`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: body.prompt,
      }),
    });

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
  }
}
