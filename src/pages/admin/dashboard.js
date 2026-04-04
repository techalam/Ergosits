import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import AdminLayout from "../../components/admin/AdminLayout";
import Loader from "../../components/admin/Loader";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // fetch orders
    const { data: orders } = await supabase
      .from("orders")
      .select("*");

    // fetch products
    const { data: products } = await supabase
      .from("products")
      .select("*");

    // calculate revenue
    const revenue = orders?.reduce((sum, o) => sum + o.total, 0) || 0;

    setStats({
      revenue,
      orders: orders?.length || 0,
      products: products?.length || 0,
    });

    setRecentOrders(orders?.slice(0, 5) || []);

    setLoading(false);
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-xl font-semibold">
            ₹{stats.revenue}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Orders</p>
          <h2 className="text-xl font-semibold">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="text-xl font-semibold">
            {stats.products}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Avg Order</p>
          <h2 className="text-xl font-semibold">
            ₹{stats.orders ? Math.round(stats.revenue / stats.orders) : 0}
          </h2>
        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white rounded-2xl shadow p-4">

        <h2 className="text-lg font-semibold mb-4">
          Recent Orders
        </h2>

        <div className="space-y-4">

          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{order.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="font-semibold">
                ₹{order.total}
              </p>
            </div>
          ))}

        </div>

      </div>

    </AdminLayout>
  );
}