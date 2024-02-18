import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/services/prisma";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const json = await req.json();
  const body = JSON.stringify(json);

  const svix = new Webhook(webhookSecret);

  let payload: WebhookEvent;

  try {
    payload = svix.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error occured", {
      status: 400,
    });
  }

  if (
    payload?.type !== "user.created" ||
    !payload.data?.email_addresses[0]?.email_address
  ) {
    return NextResponse.json("Invalid payload provided", { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      id: payload.data.id,
      firstName: payload.data.first_name,
      lastName: payload.data.last_name,
      email: payload.data.email_addresses[0].email_address,
    },
  });

  if (!newUser) {
    return NextResponse.json("There was an error creating this user", {
      status: 400,
    });
  }

  return NextResponse.json("", { status: 200 });
}
