import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { DashboardHeader } from "@/components/dashboard-header";

import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/DashboardShell";
import prisma from "@/services/prisma";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { Icons } from "@/components/Icons";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const illustrations = await prisma.illustration.findMany();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Illustrations"
        text="Create and manage illustrations"
      >
        <Link className={buttonVariants({ variant: "default" })} href="/canvas">
          <Icons.add className="mr-2 h-4 w-4" />
          New illustration
        </Link>
      </DashboardHeader>
      <div>
        {illustrations?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {illustrations.map((illustration) => (
              <PostItem key={illustration.id} illustration={illustration} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="illustration" />
            <EmptyPlaceholder.Title>
              No illustrations created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any illustrations yet. Start creating content.
            </EmptyPlaceholder.Description>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/canvas"
            >
              <Icons.add className="mr-2 h-4 w-4" />
              New illustration
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
