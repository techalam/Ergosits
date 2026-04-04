import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import ProductCard from "../components/ProductCard";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    category: "",
    sort: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // ---------------- FETCH ----------------

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // ---------------- FILTER + SORT ----------------

  const filteredProducts = products
    .filter((p) =>
      filters.category ? p.category_id === filters.category : true
    )
    .sort((a, b) => {
      if (filters.sort === "low") return a.price - b.price;
      if (filters.sort === "high") return b.price - a.price;
      return 0;
    });

  // ---------------- UI ----------------

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">

      <h1 className="text-4xl font-semibold mb-12">
        All Products
      </h1>

      {/* MOBILE TOP BAR */}
      <div className="flex gap-4 mb-6 md:hidden">

        <button
          onClick={() => setShowFilters(true)}
          className="flex-1 border py-2 rounded-xl"
        >
          Filters
        </button>

        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="flex-1 border px-3 py-2 rounded-xl"
        >
          <option value="">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

      </div>

      <div className="grid md:grid-cols-4 gap-10">

        {/* DESKTOP SIDEBAR */}
        <div className="space-y-8 hidden md:block">

          <h2 className="text-xl font-semibold">Filters</h2>

          {/* CATEGORY */}
          <div>
            <p className="font-medium mb-3">Category</p>

            {categories.map((c) => (
              <label key={c.id} className="flex items-center gap-2 mb-2">

                <input
                  type="radio"
                  name="category"
                  checked={filters.category === c.id}
                  onChange={() =>
                    setFilters({ ...filters, category: c.id })
                  }
                />

                {c.name}

              </label>
            ))}
          </div>

          {/* SORT */}
          <div>
            <p className="font-medium mb-3">Sort by</p>

            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Default</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>
          </div>

          {/* CLEAR */}
          <button
            onClick={() =>
              setFilters({ category: "", sort: "" })
            }
            className="text-sm text-red-500"
          >
            Clear Filters
          </button>

        </div>

        {/* PRODUCTS */}
        <div className="md:col-span-3">

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER MODAL */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

          <div className="bg-white w-80 h-full p-6 overflow-y-auto">

            <h2 className="text-xl font-semibold mb-6">
              Filters
            </h2>

            {/* CATEGORY */}
            <div className="mb-6">
              <p className="font-medium mb-3">Category</p>

              {categories.map((c) => (
                <label key={c.id} className="flex gap-2 mb-2">

                  <input
                    type="radio"
                    checked={filters.category === c.id}
                    onChange={() =>
                      setFilters({ ...filters, category: c.id })
                    }
                  />

                  {c.name}
                </label>
              ))}
            </div>

            {/* CLEAR */}
            <button
              onClick={() =>
                setFilters({ category: "", sort: "" })
              }
              className="text-red-500 mb-6"
            >
              Clear Filters
            </button>

            {/* ACTIONS */}
            <div className="flex gap-4">

              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 border py-2 rounded"
              >
                Close
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Apply
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}