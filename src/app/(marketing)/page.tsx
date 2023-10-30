import { ExploreSearch } from "@/components/ExploreSearch";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-1/2 mt-24 flex flex-col items-center spacy-y-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Explore</h1>
          <p className="text-gray-500 font-medium">
            Discover and create AI-generated coloring books
          </p>
        </div>
        <ExploreSearch />
      </div>
    </main>
  );
}
