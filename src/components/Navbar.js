import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useScroll from "./useScroll";

export default function Navbar() {
  const router = useRouter();
  const { scrollY, scrollDirection } = useScroll();

  const isHidden = scrollDirection === "down" && scrollY > 80;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: isHidden ? -120 : 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${scrollY > 40
          ? "backdrop-blur-xl bg-white/60 shadow-sm border-b border-white/30"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <span className="text-2xl font-semibold tracking-tight cursor-pointer">
            Ergosits
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex gap-8 text-sm font-medium items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <span
                className={`relative cursor-pointer transition
                ${router.pathname === link.path
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                  }`}
              >
                {link.name}

                {/* active underline */}
                {router.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-black"
                  />
                )}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <Link href="/products">
          <button className="hidden md:block px-5 py-2 bg-black text-white rounded-full text-sm hover:scale-105 transition">
            Shop Now
          </button>
        </Link>

      </div>
    </motion.nav>
  );
}