"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeClient from "./HomeClient";
import Header from "../components/Header/page";

export default function HomePage() {
   const router = useRouter();
   const [user, setUser] = useState(null);

   useEffect(() => {
     fetch("/api/auth/me")
       .then((res) => {
         if (!res.ok) throw new Error("something is wrong.");
         return res.json();
       })
       .then((data) => {
         setUser(data.user);
       })
       .catch(() => router.push("/login"));
   }, []);

   if (!user) return null;

  return (
    <>
      <Header user={user} />
      <HomeClient user={user} />
    </>
  );
}
