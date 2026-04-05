import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*");

    setCategories(data || []);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/products?search=${search}`);
  };

  return (
    <div className="bg-white border-b sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* LOGO */}
        <Link href="/" className="font-bold text-xl">
          Ergosits
        </Link>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="flex-1 hidden md:block"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-full"
          />
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-sm">

          <Link href="/cart">🛒 Cart</Link>

        </div>

      </div>

      {/* MOBILE SEARCH */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 rounded-full"
          />
        </form>
      </div>

      {/* CATEGORY STRIP */}
      <div className="overflow-x-auto border-t">

        <div className="flex gap-6 px-4 py-2 whitespace-nowrap text-sm">

          <Link href="/products" className="font-medium">
            All
          </Link>

          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className="text-gray-600 hover:text-black"
            >
              {c.name}
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}