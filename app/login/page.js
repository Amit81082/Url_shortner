"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthHeader from "../AuthHeader/page";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
   const [error, setError] = useState("");
   const[loading, setLoading] = useState(false);

   useEffect(() => {
          fetch("/api/auth/me")
            .then((res) => {
               if (res.ok) router.replace("/home");
            })
        }, []);

 const handleLogin = async (e) => {
   e.preventDefault();
   setLoading(true);
   const res = await fetch("/api/auth/login", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ email, password }),
   });

   const data = await res.json();

   if (!res.ok) {
     setLoading(false);
     setError(data.error);
     setTimeout(() => setError(""), 2000);
     return;
   }

   router.push("/home");
 };

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen flex flex-col mt-20 items-center bg-slate-900">

        <div className="bg-slate-900 p-6 rounded-xl w-90 space-y-4 border border-slate-800 shadow-md">
          <h2 className="text-xl font-bold text-center">
            Get <span className="text-orange-500">Started</span> Today
          </h2>
          <p className="text-gray-500 text-xs font-bold text-center">Hey Bro 🖐 ! login to your acount so you can manage your short urls more securely</p>

          <input
           name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-slate-800"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
           name="password"
           type="password" className="w-full p-2 rounded bg-slate-800"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="text-red-400 text-sm font-bold text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-sky-500 py-2 rounded font-semibold cursor-pointer hover:bg-sky-600 transition"
          >
            Log In
          </button>
          <p className="text-gray-500 text-xs font-bold text-center">Don't have an account? <span className="text-sky-400 cursor-pointer" onClick={() => router.push("/signUp")}>Sign Up</span></p>

          {loading && <p className="text-green-500 text-xs font-bold text-center">Wait a moment..</p>}

        </div>
      </div>
    </>
  );
}

