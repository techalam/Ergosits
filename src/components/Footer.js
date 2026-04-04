import Link from "next/link";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
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

          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="/products">Laptop Stands</Link></li>
            <li><Link href="/products">Mobile Stands</Link></li>
            <li><Link href="/products">Tables</Link></li>
          </ul>
        </div>


        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>


        {/* POLICIES */}
        <div>
          <h3 className="font-semibold mb-4">Policies</h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/refund-policy">Return & Refund</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>


      {/* bottom bar */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ergosits. All rights reserved.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-6 text-gray-400 text-lg">

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}