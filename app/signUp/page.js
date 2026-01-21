"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthHeader from "../AuthHeader/page";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     fetch("/api/auth/me").then((res) => {
       if (res.ok) router.replace("/home");
     });
   }, []);

   const handleSignup = async (e) => {
     e.preventDefault();
     setLoading(true);
     if (password !== confirmPassword) {
       setError("Passwords do not match");
       setTimeout(() => setError(""), 2000);
       setLoading(false);
       return;
     }

     const res = await fetch("/api/auth/signup", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, email, password }),
     });

     const data = await res.json();

     if (!res.ok) {
       setError(data.error);
       setTimeout(() => setError(""), 2000);
       setLoading(false);
       return;
     }


     router.push("/login");
   };

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen flex flex-col items-center mt-20 bg-slate-900">
        <div className="bg-slate-900 p-6 rounded-xl w-90 space-y-4 border border-slate-800 shadow-md">
          <h2 className="text-xl font-bold text-center">
            Join <span className="text-sky-400">Shorty</span>
          </h2>
          <p className="text-xs font-bold text-center text-gray-500">And Convert your long Urls to short Urls</p>

          <input
            placeholder="Name"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800 px-4 py-2 rounded"
            />

            <input
              type="password"
              placeholder="Password Confirmation"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-800 px-4 py-2 rounded"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm font-bold text-center">
              {error}
            </p>
          )}
          <div className="flex items-center gap-4">
            <button
              disabled={loading}
              onClick={handleSignup}
              className="w-full bg-sky-500 py-2 rounded font-semibold cursor-pointer hover:bg-sky-600 transition"
            >
              Create Account
            </button>
            <p className="text-gray-500 text-xs font-bold text-center">
              Already have an account?{" "}
              <span
                className="text-sky-400 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                login
              </span>
            </p>
          </div>
          {loading && (
            <p className="text-green-500 text-xs font-bold text-center">
              Wait a moment..
            </p>
          )}
        </div>
      </div>
    </>
  );
}
