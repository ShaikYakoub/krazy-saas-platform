import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Welcome to Krazy SaaS Platform
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Your ultimate solution for amazing SaaS features. Get started by
            signing in.
          </p>
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
