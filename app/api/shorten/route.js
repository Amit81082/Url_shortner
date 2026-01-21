// app/api/shorten/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/projectDB";
import Url from "@/lib/urlModel";
import { verifyToken } from "@/lib/jwt";
import { isValidUrl } from "@/lib/validateUrl";
import urlModel from "@/lib/urlModel";

export async function POST(req) {
  const { url } = await req.json();
  if (!url || !isValidUrl(url)) {
    return NextResponse.json(
      { error: "Invalid URL or missing URL" },
      { status: 400 },
    );
  }

  await connectDB();
// checking token
   const cookie = req.headers.get("cookie") || "";
   const token = cookie
     .split("; ")
     .find((c) => c.startsWith("token="))
     ?.split("=")[1];

const CurUser = verifyToken(token);


  const existing = await Url.findOne({ userId: CurUser.id, longUrl: url }); // 👈 CHECK LONG URL EXIST?

  if (existing) {
    return NextResponse.json(
      { error: "Already Short Url Exist !" },
      { status: 409 },
    );
  }

  const code = Math.random().toString(36).slice(2, 8);



  if (token) {
    const user = verifyToken(token);
   let UrlRecord = await Url.create({
      code,
      longUrl: url,
      clicks: 0,
      userId: user.id,
    });
    return NextResponse.json({
UrlRecord });
  }
}
