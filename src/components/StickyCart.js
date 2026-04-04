import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../lib/cartStore";
import { motion } from "framer-motion";

export default function StickyCart() {

  const items = useCart((state) => state.items);

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  if (count === 0) return null;

  return (
    <Link href="/cart">

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 bg-black text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3 cursor-pointer hover:scale-105 transition"
      >

        <FaShoppingCart />

        <span className="text-sm font-medium">
          Cart ({count})
        </span>

      </motion.div>

    </Link>
  );
}