import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import CategoryStrip from "./CategoryStrip";
import SearchBar from "./Searchbar";

export default function Navbar() {

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
  };

  return (
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
        <div className="flex items-center gap-6 text-lg">
          <Link href="/cart">🛒</Link>
        </div>

      </div>

    </div>
  );
}