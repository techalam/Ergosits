import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 200 }}
        className=" bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl cursor-pointer group"
      >
        <div className="relative w-full h-56 flex items-center justify-center">
          <motion.div
            whileHover={{ rotate: 6, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              width={240}
              height={240}
            />
          </motion.div>
        </div>

        <h3 className="mt-6 text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 mt-1">₹{product.price}</p>

        <div className="mt-5">
          <span className="text-sm font-medium text-black border-b border-black opacity-70 group-hover:opacity-100">
            View Product →
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
