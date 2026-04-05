import Link from "next/link";
import useCart from "../lib/cartStore";
import Image from "next/image";

export default function Cart() {
  const { items, removeItem, increase, decrease } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl md:text-2xl">
        Your cart is empty 🛒
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32">

      <h1 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-12">
        Your Cart
      </h1>

      <div className="space-y-8">

        {items.map((item) => (
          <div
            key={item.id}
            className="border-b pb-6 md:pb-8"
          >

            {/* TOP (image + name) */}
            <div className="flex gap-4">

              <Image
                src={item.images?.[0]}
                alt={item.name}
                width={100}
                height={100}
                className="rounded-lg object-contain bg-[#F5F5F7]"
              />

              <div className="flex-1">

                <h2 className="text-base md:text-xl font-medium line-clamp-2">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm md:text-base mt-1">
                  ₹{item.price.toLocaleString()}
                </p>

              </div>

            </div>

            {/* BOTTOM (qty + remove) */}
            <div className="flex justify-between items-center mt-4">

              {/* quantity */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => decrease(item.id)}
                  className="w-8 h-8 border rounded flex items-center justify-center"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increase(item.id)}
                  className="w-8 h-8 border rounded flex items-center justify-center"
                >
                  +
                </button>

              </div>

              {/* remove */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* TOTAL */}
      <div className="mt-12 md:mt-16 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">

        <h2 className="text-xl md:text-2xl font-semibold">
          Total: ₹{total.toLocaleString()}
        </h2>

        <Link
          href="/checkout"
          className="w-full md:w-auto text-center px-8 py-4 bg-black text-white rounded-full"
        >
          Proceed to Checkout
        </Link>

      </div>

    </div>
  );
}