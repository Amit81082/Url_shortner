// app/page.jsx
"use client";
import { useState, useEffect } from "react";
import { Eye, Copy, Trash2, ExternalLink } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";
import Toast from "@/app/components/Toast/page";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [error, setError] = useState("");
  const [urls, setUrls] = useState([]);
  const [meta, setMeta] = useState({});
  const [toast, setToast] = useState(null);
  const[loading, setLoading] = useState(false);

  useEffect(() => {

    urls.forEach(async (item) => {
      const code = item.code;
      const res = await fetch(`/api/stats/${code}`);
      const data = await res.json();

      setMeta((prev) => ({
        ...prev,
        [code]: {
          clicks: data.clicks,
          time: timeAgo(data.createdAt),
        },
      }));
    });
  }, [urls]);

  // extract urls per user

  useEffect(() => {
    setLoading(true);
    fetch("/api/shorten/user")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      });
  }, []);


  // handle toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const shorten = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 FIX
      },
      body: JSON.stringify({ url:longUrl }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setTimeout(() => setError(""), 2000);
      setLoading(false);
      return;
    }

  setUrls((prev) => [data.UrlRecord ?? data, ...prev]);
    setLongUrl("");
    setLoading(false);
  };

  // handle Delete
  const handleDelete = async (id) => {
    setLoading(true);
    const ok = confirm("Delete this short url?");
    if (!ok) {
      setLoading(false);
      return;
    }
    await fetch(`/api/delUrl/${id}`, { method: "DELETE" });

    setUrls((prev) => prev.filter((u) => u._id !== id));
    setLoading(false);
  };

  return (
    <>
      <main className="min-h-screen bg-slate-900 flex  justify-center mt-10 p-5">
        <div className="w-full max-w-xl space-y-4 text-center">
          <h1 className="text-center text-2xl md:text-3xl font-extrabold leading-tight">
            <span className="text-orange-500">Shorten</span> your loooooong{" "}
            <span className="text-sky-400">URLs</span> <br />
            <span className="text-orange-500">like never before!</span>
          </h1>

          <p className="mt-4 text-center font-bold text-xs text-gray-400">
            Paste any long URL below. One click. 🔥 Short & clean.
          </p>
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="w-full p-4 bg-slate-800 text-white rounded"
            placeholder="Paste Any URL"
          />

          <button
            disabled={loading}
            onClick={shorten}
            className="px-4 py-2 bg-orange-500 rounded font-bold cursor-pointer hover:bg-orange-600 transition-colors"
          >
            {loading ? "shortening..." : "Shorten"}
          </button>

          {error && (
            <p className="text-white w-1/2 mx-auto px-4 py-2 rounded-lg  bg-red-500">
              {error}
            </p>
          )}

          <h1 className="text-sky-500 font-bold text-3xl mt-5">Hey Bro!</h1>
          <p className="text-xs  text-gray-400 font-bold">
            Here are your short URLs ! Now you can share them easily 😎
          </p>

          {loading && (
            <div className="w-7 h-7 border-t-2 border-r-2 border-b-2 border-l-2 border-b-sky-500 border-t-white rounded-full animate-spin mx-auto"></div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mx-auto shadow">
            {urls.map((item, i) => {
              const code = item.code;

              return (
                <div
                  key={i}
                  className="bg-slate-800 p-4 rounded-xl space-y-2 shadow-md flex flex-col justify-between"
                >
                  <p className="text-gray-400 text-sm truncate">
                    {item.longUrl}
                  </p>

                  <div className="flex items-center gap-2 justify-center">
                    <a
                      href={location.origin + "/" + item.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 text-sm font-medium hover:underline break-all"
                    >
                      {location.origin}/{item.code}
                    </a>

                    {/* 👉 EXTERNAL LINK ICON */}
                    <a
                      href={location.origin + "/" + item.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-400 break-all"
                    >
                      <ExternalLink size={16} className="text-orange-500 " />
                    </a>
                  </div>

                  <div className="flex items-center justify-around text-xs gap-2 my-2 text-slate-300">
                    <div className="flex items-center space-x-2 text-gray-500 italic">
                      <Eye size={16} className="text-xs " />
                      <span>{meta[code]?.clicks ?? 0}</span>
                    </div>

                    <span className="text-slate-500 italic">
                      • {meta[code]?.time ?? ""}
                    </span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          location.origin + "/" + item.code,
                        );
                        setToast({
                          type: "success",
                          msg: "Copied to clipboard!",
                        });
                      }}
                      className="hover:text-sky-600 text-sky-400 cursor-pointer transition-all"
                    >
                      <Copy size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Toast toast={toast} />
      </main>
    </>
  );
}
