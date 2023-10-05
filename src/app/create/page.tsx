import { CreatePromptForm } from "@/components/CreatePromptForm";
import Image from "next/image";

export default function Create() {
  const buttons: string[] = [
    "U1",
    "U2",
    "U3",
    "U4",
    "🔄",
    "V1",
    "V2",
    "V3",
    "V4",
  ];

  return (
    <main className="min-h-screen relative flex flex-col items-center">
      <div className="w-1/2 mt-12 flex flex-col items-center spacy-y-4">
        <div className="flex flex-col items-center leading-none">
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="text-gray-500 font-medium">
            Generate your own coloring books
          </p>
        </div>
        <CreatePromptForm />
        <div className="mt-6">
          <Image
            src="https://cdn.discordapp.com/attachments/1159285063826018334/1159398215213391922/tjvonbr_Mad_Max_movie_poster_6c8d7cc1-89d5-472c-8df5-abd90d323dd6.png?ex=6530e0bb&is=651e6bbb&hm=48bd1cfc01c0d377cbf2017dbb26d9545e85888f4b49f6d630dab84d5a4c12d3&"
            width={500}
            height={500}
            alt="Your prompt result"
          />
        </div>
        <div className="w-full mt-6 flex justify-center items-center space-x-2">
          {buttons.map((button: string, idx: number) => {
            return (
              <button
                className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 rounded-md text-sm text-black font-medium"
                key={idx}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
