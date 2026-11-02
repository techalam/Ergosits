import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { FiMenu } from "react-icons/fi";
import SearchBar from "./Searchbar";
import MenuOverlay from "./MenuOverlay";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-line">
        {/* TOP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Ergosits
          </Link>

          {/* SEARCH */}
          <div className="order-3 w-full sm:order-none sm:flex-1 sm:min-w-0"><SearchBar /></div>

          {/* RIGHT */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <ThemeToggle />
            {/* CART */}
            <button
              aria-label="Open cart"
              onClick={() => router.push("/cart")}
              className="w-10 h-10 rounded-full bg-canvas flex items-center justify-center
    hover:scale-110 active:scale-95 transition"
            >
              <FaCartShopping size={25} />
            </button>

            {/* MENU */}
            <button
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center
    hover:scale-110 active:scale-95 transition"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
