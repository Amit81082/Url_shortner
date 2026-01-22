import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/projectDB";
import User from "@/lib/userModel";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Hey Bro! you haved missed email or password😮 " },
      { status: 400 },
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { error: " oops! 😪 invalid email or email doesn't exist." },
      { status: 401 },
    );
  }

  const PasswordIsMatch = await bcrypt.compare(password, user.password);

  if (!PasswordIsMatch) {
    return NextResponse.json(
      { error: " oops! 😪 Your password doesn't match." },
      { status: 401 },
    );
  }
  const token = signToken({
    name: user.name,
    id: user._id,
    email: user.email,
  });
  const res = NextResponse.json({
    success: true,
    message: "Login successful",
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return res;
}
