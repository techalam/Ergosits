import Link from "next/link";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">
            Ergosits
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed">
            Premium ergonomic workspace products designed to improve
            posture, comfort and productivity for long working hours.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/products" className="hover:text-white transition">
                All Products
              </Link>
            </li>

            <li>
              <Link href="/products?category=laptop" className="hover:text-white transition">
                Laptop Stands
              </Link>
            </li>

            <li>
              <Link href="/products?category=mobile" className="hover:text-white transition">
                Mobile Stands
              </Link>
            </li>

            <li>
              <Link href="/products?category=table" className="hover:text-white transition">
                Tables
              </Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/help" className="hover:text-white transition">
                Help Center
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="font-semibold mb-4">Policies</h3>

          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/shipping" className="hover:text-white transition">
                Shipping Policy
              </Link>
            </li>

            <li>
              <Link href="/refund-policy" className="hover:text-white transition">
                Return & Refund
              </Link>
            </li>

            <li>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Ergosits. All rights reserved.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-5 text-gray-400 text-lg">

            <a href="#" className="hover:text-white transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaTwitter />
            </a>

            <a href="#" className="hover:text-white transition">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}