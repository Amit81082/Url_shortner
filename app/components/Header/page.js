"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({user}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
     setLoading(true)
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    setLoading(false)
  };
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 sticky top-0">
      {/* LEFT */}
      <div className="flex items-center gap-2 text-sky-400 font-bold">
        <span className="text-orange-500">✴</span>
        URL Shorty
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-300 gap-3 font-bold">
          Hi,{" "}
          <span className="text-sky-500 font-bold text-sm">
            {user?.name || ""}
          </span>
        </span>

        <button
          disabled={loading}
          onClick={handleLogout}
          className="px-3 py-1 rounded-md bg-slate-800 text-gray-300 hover:bg-red-600 hover:text-white transition cursor-pointer"
        >
          {loading ? (
            <p className="text-green-500 text-xs font-bold text-center">
              Wait a moment..
            </p>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </header>
  );
}
