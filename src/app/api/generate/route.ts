import prisma from "@/services/prisma";
import { openai } from "@/services/openai";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const generateImageSchema = z.object({
  prompt: z.string(),
  imageUrl: z.string(),
});

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json("User is not authenticated.", { status: 401 });
  }

  try {
    const json = await req.json();
    const body = generateImageSchema.parse(json);

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: body.prompt,
    });

    if (!image) {
      console.log("Something bad happened!");
      return;
    }

    await prisma.illustration.create({
      data: {
        imageUrl: body.imageUrl,
        prompt: body.prompt,
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify(image), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
