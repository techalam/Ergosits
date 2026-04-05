import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product, height = 'h-30' }) {
  return (
    <Link href={`/products/${product.slug}`}>

      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 180 }}
        className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      >

        {/* IMAGE */}
        <div className={`relative w-full ${height} md:h-56 flex items-center justify-center overflow-hidden rounded-2xl bg-[#F5F5F7]`}>

          {/* subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent opacity-40"></div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            <Image
              src={product.images?.[0] || "/placeholder.png"}
              width={220}
              height={220}
              className="object-contain"
              alt={product.name}
            />
          </motion.div>

        </div>

        {/* CONTENT */}
        <div className="mt-5">

          <h3 className="text-base font-semibold leading-snug line-clamp-2 group-hover:text-black transition">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            ₹{product.price}
          </p>

        </div>

        {/* CTA */}
        <div className="mt-4 overflow-hidden">

          <span className="text-sm font-medium text-black inline-flex items-center gap-1 relative">

            View Product

            {/* arrow animation */}
            <span className="transform group-hover:translate-x-1 transition">
              →
            </span>

            {/* underline animation */}
            <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>

          </span>

        </div>

      </motion.div>

    </Link>
  );
}