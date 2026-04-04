import { useState } from "react";
import useCart from "../lib/cartStore";

export default function Checkout() {

  const items = useCart((state) => state.items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ---------------- TOTAL ----------------

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ---------------- HANDLE ----------------

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    console.log("ORDER:", {
      items,
      total,
      form,
    });

    alert("Order placed (demo)");

    // reset (optional)
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-32">

      <h1 className="text-4xl font-semibold mb-12">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT - FORM */}
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-4">

            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            <textarea
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="City"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
                className="border px-4 py-3 rounded-xl"
              />

              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={(e) =>
                  setForm({ ...form, pincode: e.target.value })
                }
                className="border px-4 py-3 rounded-xl"
              />

            </div>

          </div>

        </div>

        {/* RIGHT - SUMMARY */}
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="bg-[#F5F5F7] p-6 rounded-2xl">

            {/* ITEMS */}
            <div className="space-y-4">

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.images?.[0]}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty}
                      </p>
                    </div>

                  </div>

                  <p>₹{item.price * item.qty}</p>

                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="border-t mt-6 pt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-4 bg-black text-white rounded-full hover:scale-105 transition"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}