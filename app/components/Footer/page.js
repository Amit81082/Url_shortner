export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900 mt-4 sticky bottom-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row gap-1 items-center justify-between text-xs font-bold text-gray-400 ">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <span className="text-orange-500 font-bold">✴</span>
          <span className="text-sky-500 font-semibold">URL Shorty</span>
        </div>

        {/* CENTER */}
        <div>
          © 2026 URL Shorty • <span className="text-sky-500">amit2005</span>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-blue-400">
            𝕏
          </a>
          <a href="#" className="hover:text-blue-400">
            f
          </a>
        </div>
      </div>
    </footer>
  );
}
