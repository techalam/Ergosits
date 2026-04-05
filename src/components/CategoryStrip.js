import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryStrip() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
    setLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 items-center">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center animate-pulse min-w-[90px]">
                  {/* circle */}
                  <div className="w-16 h-16 rounded-full bg-gray-200"></div>

                  {/* text */}
                  <div className="mt-3 h-3 w-12 bg-gray-200 rounded"></div>
                </div>
              ))
            : categories.map((c) => {
                const active = router.query.category == c.id;

                return (
                  <Link
                    key={c.id}
                    href={`/products?category=${c.id}`}
                    className="flex flex-col items-center min-w-[80px] group"
                  >
                    {/* ICON */}
                    <div
                      className={`w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center transition
                  ${active ? "ring-2 ring-black scale-110" : ""}`}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition"
                      />
                    </div>

                    {/* NAME */}
                    <p className="text-xs mt-2 font-medium text-center">
                      {c.name}
                    </p>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
}
