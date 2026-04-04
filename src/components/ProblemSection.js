import { motion } from "framer-motion";
import Image from "next/image";

export default function ProblemSection() {
  return (
    <section className="relative py-40 bg-[#0F0F10] text-white overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-500 blur-[180px] opacity-20 -left-40 top-20 rounded-full" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-semibold text-center leading-tight"
        >
          8+ Hours Sitting
          <br />
          <span className="text-gray-400">Is Quietly Destroying Your Spine</span>
        </motion.h2>

        {/* Problem */}
        <div className="grid md:grid-cols-2 gap-20 items-center mt-28">

          {/* Bad posture image */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <Image
              src="/images/bad-posture.png"
              alt="Bad posture"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-semibold mb-6">
              The Hidden Work-From-Home Problem
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Laptops are designed for portability — not for long working hours.
              When you place a laptop on a desk, your screen stays too low,
              forcing your neck to bend forward.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              Over time this leads to neck pain, shoulder stiffness,
              headaches, eye strain and reduced productivity.
            </p>
          </motion.div>
        </div>

        {/* Solution reveal */}
        <div className="grid md:grid-cols-2 gap-20 items-center mt-40">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-semibold mb-6">
              A Small Change. A Massive Difference.
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Raising your screen to eye level instantly improves posture and
              reduces stress on your spine. You sit straighter, breathe better
              and stay focused longer.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              That’s exactly why Ergosits products are engineered — to
              transform your workspace into a healthy ergonomic setup.
            </p>
          </motion.div>

          {/* Good posture image */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <Image
              src="/images/good-posture.png"
              alt="Good posture"
              width={500}
              height={500}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}