import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function Register() {
  return (
    <div className="grid grid-cols-2">
      <div className="h-screen bg-slate-100"></div>
      <div className="min-h-screen w-1/2 m-auto flex flex-col justify-center items-center space-y-6">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-black font-bold">Welcome to Libello!</h1>
          <p className="text-sm text-slate-500 text-center">
            Enter a few details about yourself below
          </p>
        </div>
        <RegisterForm />
        <div className="w-full relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>
        <button className="h-10 w-full bg-white hover:bg-slate-100 transition-colors border border-slate-300 rounded-md text-sm text-black font-medium">
          Google
        </button>
        <Link className="text-sm text-slate-500 hover:underline" href="/login">
          Already have an account? Sign in here
        </Link>
      </div>
    </div>
  );
}
