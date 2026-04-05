import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryStrip() {

  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);  
  };

  return (
    <div className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto scrollbar-hide">

        <div className="flex gap-8 items-center">

          {categories.map((c) => {

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