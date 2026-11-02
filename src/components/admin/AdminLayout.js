import { useRouter } from "next/router";
import supabase from "../../lib/supabase";
import ThemeToggle from "../ThemeToggle";
import { FiGrid, FiFolder, FiPackage, FiShoppingBag } from "react-icons/fi";

const navigation = [
  { path: "/admin/dashboard", label: "Dashboard", Icon: FiGrid },
  { path: "/admin/categories", label: "Categories", Icon: FiFolder },
  { path: "/admin/products", label: "Products", Icon: FiPackage },
  { path: "/admin/orders", label: "Orders", Icon: FiShoppingBag },
];

export default function AdminLayout({ children }) {

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const isActive = (path) => router.pathname === path;


  return (
    <div className="min-h-screen bg-canvas text-foreground">

      {/* HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur bg-surface/70">

        <div className="flex justify-between items-center px-4 py-3">

          <div>
            <h1 className="text-lg font-semibold">Ergosits</h1>
            <p className="text-xs text-muted">Admin Panel</p>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 rounded-full border hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6 pb-28">
        {children}
      </div>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-[env(safe-area-inset-bottom)]">

        <div className="max-w-xl mx-auto mb-4 bg-surface rounded-2xl shadow-lg border flex justify-between px-2 py-2">

          {navigation.map(({ path, label, Icon }) => (
            <button key={path} onClick={() => router.push(path)}
              aria-current={isActive(path) ? "page" : undefined}
              className={`flex-1 flex flex-col items-center gap-1.5 text-xs py-2.5 rounded-xl transition ${isActive(path) ? "bg-black text-white" : "text-muted hover:bg-canvas"}`}>
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}

        </div>

      </div>

    </div>
  );
}
