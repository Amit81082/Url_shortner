// app/[code]/page.jsx
import { connectDB } from "@/lib/projectDB";
import  Url  from "@/lib/urlModel";
import { redirect, notFound } from "next/navigation";

export default async function RedirectPage({ params }) {
  await connectDB();

  const { code } = await params; // 👈 FIX

  const record = await Url.findOneAndUpdate(
    { code },
    { $inc: { clicks: 1 } }, // 👈 COUNT
    { new: true },
  );

  if (!record) notFound();

  redirect(record.longUrl);
}
