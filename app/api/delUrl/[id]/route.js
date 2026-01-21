import  Url  from "@/lib/urlModel";
import { verifyToken } from "@/lib/jwt";
export async function DELETE(req, { params }) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
    if(!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = verifyToken(token);

  const { id } = await params;

  await Url.deleteOne({ _id: id, userId: user.id });
  return Response.json({ success: "document deleted" });
}
