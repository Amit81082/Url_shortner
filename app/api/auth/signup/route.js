import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/projectDB";
import User from "@/lib/userModel";

export async function POST(req) {
  await connectDB();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Hey man! You have missed some fields 🤨" },
      { status: 400 },
    );
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashed,
  });

  return NextResponse.json({ success: true });
}
