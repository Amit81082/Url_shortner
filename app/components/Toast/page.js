function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-20 right-6 px-4 py-2 rounded-lg text-white
        ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {toast.msg}
    </div>
  );
}

export default Toast;
