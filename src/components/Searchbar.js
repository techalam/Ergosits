import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import { useRouter } from "next/router";

export default function SearchBar() {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const router = useRouter();

  useEffect(() => {

    if (query.length < 2) {
      setProducts([]);
      setCategories([]);
      return;
    }

    const fetch = async () => {

      // PRODUCTS
      const { data: prod } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`)
        .limit(4);

      // CATEGORIES
      const { data: cat } = await supabase
        .from("categories")
        .select("*")
        .ilike("name", `%${query}%`)
        .limit(3);

      setProducts(prod || []);
      setCategories(cat || []);
      setShow(true);
    };

    const delay = setTimeout(fetch, 250);
    return () => clearTimeout(delay);

  }, [query]);

  const goToProduct = (slug) => {
    setShow(false);
    setQuery("");
    router.push(`/products/${slug}`);
  };

  const goToCategory = (id) => {
    setShow(false);
    setQuery("");
    router.push(`/products?category=${id}`);
  };

  const handleSearch = () => {
    router.push(`/products?search=${query}`);
    setShow(false);
  };

  return (
    <div className="relative w-full">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search for products, categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.length > 1 && setShow(true)}
        className="w-full px-5 py-3 rounded-full bg-[#F5F5F7] outline-none"
      />

      {/* DROPDOWN */}
      {show && (products.length > 0 || categories.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border z-50 overflow-hidden">

          {/* PRODUCTS */}
          {products.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs text-gray-500">Products</p>

              {products.map((item) => (
                <div
                  key={item.id}
                  onClick={() => goToProduct(item.slug)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.images?.[0]}
                    className="w-10 h-10 rounded object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORIES */}
          {categories.length > 0 && (
            <div className="border-t">
              <p className="px-4 py-2 text-xs text-gray-500">Categories</p>

              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => goToCategory(c.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={c.image}
                    className="w-8 h-8 rounded-full"
                  />

                  <p className="text-sm">{c.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* SEARCH ALL */}
          <div
            onClick={handleSearch}
            className="px-4 py-3 border-t text-sm hover:bg-gray-100 cursor-pointer"
          >
            🔍 Search for "{query}"
          </div>

        </div>
      )}

    </div>
  );
}