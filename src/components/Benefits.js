import { motion } from "framer-motion";
// import { FaSpine } from "react-icons/fa6";
import { FaEye, FaBolt, FaLaptopHouse } from "react-icons/fa";

const benefits = [
  {
    icon: <FaEye size={34} />,
    title: "Spine Alignment",
    desc: "Raises your screen to eye level and keeps your neck and back in a natural position.",
  },
  {
    icon: <FaEye size={34} />,
    title: "Less Eye Strain",
    desc: "Proper viewing angle reduces eye fatigue and headaches during long sessions.",
  },
  {
    icon: <FaBolt size={34} />,
    title: "Boost Productivity",
    desc: "Comfortable posture improves focus, concentration and work performance.",
  },
  {
    icon: <FaLaptopHouse size={34} />,
    title: "Clean Workspace",
    desc: "Elevates your device and frees desk space for keyboard, mouse and notes.",
  },
];

export default function Benefits() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold">
            Why Your Body Will Thank You
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Ergonomic improvements may look small, but they dramatically change
            how you feel after hours of working or studying.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-10">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-[#F5F5F7] rounded-3xl p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6 text-black">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}