import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen w-1/4 m-auto flex flex-col justify-center items-center space-y-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-black font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500">
          Enter your email below to sign in
        </p>
      </div>
      <LoginForm />
      <div className="w-full relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with</span>
        </div>
      </div>
      <button className="h-10 w-full bg-white hover:bg-slate-100 transition-colors border border-slate-300 rounded-md text-sm text-black font-medium">
        Google
      </button>
      <Link className="text-sm text-slate-500 hover:underline" href="/register">
        Don&apos;t have an account yet? Sign up here
      </Link>
    </div>
  );
}
