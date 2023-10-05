import { CreatePromptForm } from "@/components/CreatePromptForm";

export default function Create() {
  return (
    <main className="min-h-screen relative flex flex-col items-center">
      <div className="w-1/2 mt-12 flex flex-col items-center spacy-y-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="text-gray-500 font-medium">
            Generate your own coloring books
          </p>
        </div>
        <CreatePromptForm />
      </div>
    </main>
  );
}
