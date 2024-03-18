import Canvas from "@/components/canvas";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CanvasPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("sign-in");
  }

  return <Canvas userId={{ id: userId }} />;
}
