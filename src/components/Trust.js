import { motion } from "framer-motion";
import { FaTruck, FaUndo, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const items = [
  {
    icon: <FaShieldAlt size={28} />,
    title: "Quality Tested",
    desc: "Every Ergosits product is carefully checked before shipping to ensure durability and stability.",
  },
  {
    icon: <FaUndo size={28} />,
    title: "Easy Replacement",
    desc: "Received a damaged item? We’ll replace it quickly — no complicated process.",
  },
  {
    icon: <FaTruck size={28} />,
    title: "Fast Shipping",
    desc: "We dispatch orders within 24–48 hours across India with tracking support.",
  },
  {
    icon: <FaCheckCircle size={28} />,
    title: "Ergonomic Design",
    desc: "Designed to improve posture, comfort and long working hours productivity.",
  },
];

export default function Trust() {
  return (
    <section className="py-32 bg-[#0F0F10] text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold">
            Shop With Confidence
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We focus on long-term comfort and customer satisfaction — not quick sales.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid md:grid-cols-4 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="border border-white/10 rounded-3xl p-8 hover:bg-white/5 transition"
            >
              <div className="mb-6 text-[#7CFFB2]">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}