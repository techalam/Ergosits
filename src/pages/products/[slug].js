import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import useCart from "../../lib/cartStore";

export default function ProductPage() {

  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const { addItem } = useCart();

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    setProduct(data);
  };

  if (!product) {
    return (
      <div className="p-20 text-center">
        Loading...
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      qty: 1,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid md:grid-cols-2 gap-12">

        {/* LEFT - IMAGES */}
        <div>

          <div className="bg-[#F5F5F7] rounded-2xl p-6 flex justify-center">
            <img
              src={product.images?.[activeImage]}
              className="h-80 object-contain"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">

            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border 
                ${activeImage === i ? "border-black" : "border-gray-200"}`}
              />
            ))}

          </div>

        </div>

        {/* RIGHT - INFO */}
        <div>

          <h1 className="text-2xl font-semibold">
            {product.name}
          </h1>

          <p className="text-3xl font-bold mt-4">
            ₹{product.price}
          </p>

          <p className="text-gray-500 mt-4">
            {product.description}
          </p>

          {/* DETAILS */}
          <div className="mt-6 border-t pt-6 space-y-2 text-sm">

            {product.material && (
              <p><strong>Material:</strong> {product.material}</p>
            )}

            {product.color && (
              <p><strong>Color:</strong> {product.color}</p>
            )}

            {product.dimensions && (
              <p><strong>Dimensions:</strong> {product.dimensions}</p>
            )}

          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-4">

            <button
              onClick={handleAddToCart}
              className="flex-1 py-4 border rounded-full"
            >
              Add to Cart
            </button>

            <button
              onClick={() => router.push("/checkout")}
              className="flex-1 py-4 bg-black text-white rounded-full"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}