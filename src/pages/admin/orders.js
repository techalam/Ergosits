import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Orders() {

  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🔐 Protect route
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user || data.user.email !== "support.ergosits@gmail.com") {
        router.push("/admin/login");
      }
    };

    checkUser();
  }, []);

  // 📦 Fetch orders
  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminLayout>
    <div className="max-w-full sm:max-w-7xl mx-auto px-2 py-2 sm:px-6 sm:py-20">

      <h1 className="text-xl sm:text-4xl font-semibold mb-10">
        Orders
      </h1>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-auto">

        <table className="w-full text-sm sm:text-base">

          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">

                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">₹{order.total}</td>
                <td className="p-4">
                  {new Date(order.created_at).toLocaleString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-500"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">

          <div className="bg-white p-8 rounded-2xl w-full max-w-2xl">

            <h2 className="text-2xl font-semibold mb-6">
              Order Details
            </h2>

            {/* CUSTOMER */}
            <div className="mb-6">
              <p><strong>Name:</strong> {selectedOrder.name}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>City:</strong> {selectedOrder.city}</p>
              <p><strong>Pincode:</strong> {selectedOrder.pincode}</p>
            </div>

            {/* ITEMS */}
            <div className="mb-6">

              <h3 className="font-semibold mb-3">Items</h3>

              <div className="space-y-4">

                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between">

                    <div className="flex gap-4 items-center">

                      <img
                        src={item.images?.[0]}
                        className="w-12 h-12 object-cover rounded"
                      />

                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                    </div>

                    <p>₹{item.price * item.qty}</p>

                  </div>
                ))}

              </div>

            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>₹{selectedOrder.total}</span>
            </div>

            {/* ACTION */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-3 bg-black text-white rounded-xl"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
    </AdminLayout>
  );
}