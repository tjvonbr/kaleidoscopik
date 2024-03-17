import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { DashboardHeader } from "@/components/dashboard-header";
import { PostCreateButton } from "@/components/PostCreateButton";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/DashboardShell";
import prisma from "@/services/prisma";

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
        <PostCreateButton />
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
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No illustrations created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any illustrations yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
