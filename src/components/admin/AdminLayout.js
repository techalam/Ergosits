import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

export default function AdminLayout({ children }) {

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const isActive = (path) => router.pathname === path;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black">

      {/* HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">

        <div className="flex justify-between items-center px-4 py-3">

          <div>
            <h1 className="text-lg font-semibold">Ergosits</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded-full border hover:bg-black hover:text-white transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* CONTENT */}
      <div className="px-4 py-6 pb-28">
        {children}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-50">

        <div className="mx-4 mb-4 bg-white rounded-2xl shadow-lg border flex justify-between px-2 py-2">

          <button
            onClick={() => router.push("/admin/dashboard")}
            className={`flex-1 flex flex-col items-center text-xs py-2 rounded-xl ${
              isActive("/admin/dashboard")
                ? "bg-black text-white"
                : "text-gray-500"
            }`}
          >
            📊
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => router.push("/admin/categories")}
            className={`flex-1 flex flex-col items-center text-xs py-2 rounded-xl ${
              isActive("/admin/categories")
                ? "bg-black text-white"
                : "text-gray-500"
            }`}
          >
            🗂
            <span>Categories</span>
          </button>

          <button
            onClick={() => router.push("/admin/products")}
            className={`flex-1 flex flex-col items-center text-xs py-2 rounded-xl ${
              isActive("/admin/products")
                ? "bg-black text-white"
                : "text-gray-500"
            }`}
          >
            📦
            <span>Products</span>
          </button>

          <button
            onClick={() => router.push("/admin/orders")}
            className={`flex-1 flex flex-col items-center text-xs py-2 rounded-xl ${
              isActive("/admin/orders")
                ? "bg-black text-white"
                : "text-gray-500"
            }`}
          >
            🧾
            <span>Orders</span>
          </button>

        </div>

      </div>

    </div>
  );
}