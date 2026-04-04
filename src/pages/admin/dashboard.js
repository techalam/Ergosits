import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

export default function Dashboard() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {

      const { data } = await supabase.auth.getUser();

      if (!data.user || data.user.email !== "support.ergosits@gmail.com") {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();

  }, []);

  if (loading) return <div className="p-20">Checking auth...</div>;

  return (
    <div className="p-10">

      <h1 className="text-4xl font-semibold mb-10">
        Admin Dashboard
      </h1>

      <div className="flex gap-6">

        <button
          onClick={() => router.push("/admin/categories")}
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          Manage Categories
        </button>

        <button
          onClick={() => router.push("/admin/products")}
          className="px-6 py-3 bg-black text-white rounded-xl"
        >
          Manage Products
        </button>

      </div>

    </div>
  );
}