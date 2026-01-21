import { NextResponse } from "next/server";
import Url from "@/lib/urlModel";
import { verifyToken } from "@/lib/jwt";
import {connectDB} from "@/lib/projectDB";

export async function GET(req) {
  await connectDB();

  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

    if(!token){
      return NextResponse.json({ urls: [] }, { status: 401 });
    }

  const user = verifyToken(token);

  const urls = await Url.find({ userId: user.id }).sort({ createdAt: -1 });

  return NextResponse.json(urls);
}
