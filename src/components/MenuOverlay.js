import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MenuOverlay({ isOpen, onClose }) {
  return (
    <AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex"
        >

          {/* RIGHT SIDE MENU */}
          <div className="w-full flex flex-col justify-center px-8 md:px-24">

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full border flex items-center justify-center hover:scale-110 transition"
            >
              ✕
            </button>

            {/* MENU ITEMS */}
            <div className="space-y-8">

              {[
                { name: "Products", link: "/products" },
                { name: "About", link: "/about" },
                { name: "Contact", link: "/contact" },
                { name: "Help", link: "/help" },
              ].map((item, i) => (

                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.link}
                    onClick={onClose}
                    className="group relative inline-block text-5xl md:text-7xl font-semibold tracking-tight"
                  >

                    {/* TEXT */}
                    <span className="group-hover:opacity-60 transition">
                      {item.name}
                    </span>

                    {/* UNDERLINE ANIMATION */}
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"></span>

                  </Link>
                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}