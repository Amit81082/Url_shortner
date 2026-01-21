import { connectDB } from "@/lib/projectDB";
import Url from "@/lib/urlModel";

export async function GET(_, { params }) {
  await connectDB();

  const { code } = await params;

  const record = await Url.findOne({ code });

  if (!record) {
    return Response.json({ clicks: 0 }, { status: 404 });
  }

  return Response.json({ clicks: record.clicks, createdAt: record.createdAt });
}
