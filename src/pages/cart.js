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
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Your cart is empty 🛒
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">

      <h1 className="text-4xl font-semibold mb-12">Your Cart</h1>

      <div className="space-y-10">

        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-8"
          >
            {/* left */}
            <div className="flex items-center gap-6">
              <Image src={item.images?.[0]} alt={item.name} width={120} height={120} />
              <div>
                <h2 className="text-xl font-medium">{item.name}</h2>
                <p className="text-gray-500">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* quantity */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => decrease(item.id)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{item.qty}</span>

              <button
                onClick={() => increase(item.id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* remove */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* total */}
      <div className="mt-16 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Total: ₹{total.toLocaleString()}
        </h2>

        <Link href="/checkout" className="px-8 py-4 bg-black text-white rounded-full">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}