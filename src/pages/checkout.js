import { useState } from "react";
import useCart from "../lib/cartStore";
import Swal from "sweetalert2";

export default function Checkout() {

  const items = useCart((state) => state.items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [fieldsError, setFieldsError] = useState({
    name: false,
    phone: false,
    email: false,
    address: false,
    city: false,
    pincode: false,
  });

  // ---------------- TOTAL ----------------

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ---------------- HANDLE ----------------

const handleSubmit = async () => {

  if (!form.name || !form.phone || !form.email || !form.address || !form.city || !form.pincode) {
    setFieldsError({
      name: !form.name,
      phone: !form.phone,
      email: !form.email,
      address: !form.address,
      city: !form.city,
      pincode: !form.pincode,
    });
    return;
  }

  // 1. Create order (Razorpay)
  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total }),
  });

  const order = await res.json();

  // 2. Load Razorpay
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,

      name: "Ergosits",

      handler: async function (response) {

        // 3. VERIFY + SAVE ORDER
        const verify = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            orderData: {
              ...form,
              items,
              total,
            },
          }),
        });

        const result = await verify.json();

        if (result.success) {
          Swal.fire({
            title: "Order placed successfully 🎉",
            text: "Your order has been placed and is being processed.",
            icon: "success",
            confirmButtonText: "OK",
          });

          // clear cart
          useCart.getState().clearCart();

          window.location.href = "/success";
        } else {
          Swal.fire({
            title: "Payment Verification Failed",
            text: "There was an issue with payment verification.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      },

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
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
            <p className={`text-sm text-red-500 ${fieldsError.name ? "block" : "hidden"}`}>Name Is Required</p>

            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl"
            />
            <p className={`text-sm text-red-500 ${fieldsError.phone ? "block" : "hidden"}`}>Please Enter A Valid Phone Number</p>

              <input
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full border px-4 py-3 rounded-xl"
            />
            <p className={`text-sm text-red-500 ${fieldsError.email ? "block" : "hidden"}`}>Please Enter A Valid Email Address</p>

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