import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-800 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-orange-500">✴</span>
          <span className="text-xl font-bold text-sky-400">URL Shorty</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-1.5 text-sm rounded-md bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Login
          </Link>

          <Link
            href="/signUp"
            className="px-4 py-1.5 text-sm rounded-md border border-slate-500 text-white hover:bg-slate-600 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
}
