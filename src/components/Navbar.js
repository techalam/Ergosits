import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import CategoryStrip from "./CategoryStrip";
import SearchBar from "./Searchbar";
import MenuOverlay from "./MenuOverlay";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur">
        {/* TOP */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Ergosits
          </Link>

          {/* SEARCH */}
          <SearchBar />

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* CART */}
            <button
              onClick={() => router.push("/cart")}
              className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center 
    hover:scale-110 active:scale-95 transition"
            >
              <FaCartShopping size={25} />
            </button>

            {/* MENU */}
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center 
    hover:scale-110 active:scale-95 transition"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
