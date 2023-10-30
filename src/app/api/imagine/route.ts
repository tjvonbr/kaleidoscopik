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
        Authorization: `Bearer ${midjourneyKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msg: body.prompt,
        webhookOverride:
          "https://a043-4-36-20-96.ngrok-free.app/api/webhooks/midjourney",
      }),
    });

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
