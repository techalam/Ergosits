import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../../lib/api";
import useCart from "../../lib/cartStore";
import Image from "next/image";

export default function ProductPage() {

  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    if (!slug) return;

    const load = async () => {
      const data = await getProductBySlug(slug);
      setProduct(data);
    };

    load();
  }, [slug]);

  if (!product) return <div className="p-40">Loading...</div>;

  const handleAddToCart = () => {
    addItem({ ...product, qty });
  };

  const handleBuyNow = () => {
    addItem({ ...product, qty });
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">

      <div className="grid md:grid-cols-2 gap-20">

        {/* LEFT - IMAGES */}
        <div>

          {/* MAIN IMAGE */}
          <div className="bg-[#F5F5F7] rounded-2xl p-6 flex justify-center">
            <Image
              src={product.images?.[activeImage]}
              width={400}
              height={400}
              alt={product.name}
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-4 mt-6">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  activeImage === i ? "border-black" : "border-transparent"
                }`}
              />
            ))}
          </div>

        </div>

        {/* RIGHT - INFO */}
        <div>

          <h1 className="text-5xl font-semibold">
            {product.name}
          </h1>

          <p className="text-3xl mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-500 mt-8 leading-relaxed">
            {product.description}
          </p>

          {/* QUANTITY */}
          <div className="mt-10 flex items-center gap-4">

            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-4 py-2 border rounded"
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 border rounded"
            >
              +
            </button>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-10">

            <button
              onClick={handleAddToCart}
              className="px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-8 py-4 border rounded-full hover:bg-black hover:text-white transition"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}