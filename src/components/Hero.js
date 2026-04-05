import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex justify-center overflow-hidden pt-0 sm:pb-20">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#7CFFB2] blur-[160px] opacity-20 rounded-full top-[-150px] right-[-150px]" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-1 items-center">

        {/* LEFT CONTENT */}
        <div className="hidden sm:block z-10">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-semibold leading-tight"
          >
            Sit Better.
            <br />
            <span className="text-gray-400">Work Smarter.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg text-gray-500 max-w-md"
          >
            Premium ergonomic stands & workspace essentials designed
            to improve posture, comfort and productivity.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10"
          >
            <a
              href="/products"
              className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-wide hover:scale-105 transition"
            >
              Explore Products
            </a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.2 }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Image
              src="/images/stand.png"
              alt="Laptop Stand"
              width={500}
              height={500}
              priority
            />
          </motion.div>
        </motion.div>

        {/* LEFT CONTENT */}
        <div className="sm:hidden z-10">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight"
          >
            Sit Better.
            <br />
            <span className="text-gray-400">Work Smarter.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="sm:mt-6 sm:text-lg text-gray-500 max-w-md"
          >
            Premium ergonomic stands & workspace essentials designed
            to improve posture, comfort and productivity.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10"
          >
            <a
              href="/products"
              className="px-8 py-4 bg-black text-white rounded-full text-sm tracking-wide hover:scale-105 transition"
            >
              Explore Products
            </a>
          </motion.div>
        </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative sm:absolute bottom-4 sm:bottom-10 flex justify-center text-center mt-12 sm:left-1/2 sm:-translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-black rounded-full mt-2"
          />
        </div>
      </motion.div>
      </div>

      {/* Scroll Indicator */}

    </section>
  );
}