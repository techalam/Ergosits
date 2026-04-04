import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ParallaxSection() {

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["-80px", "80px"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section ref={ref} className="relative py-40 bg-black text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* TEXT */}
        <motion.div style={{ y: yText }}>

          <h2 className="text-5xl font-semibold mb-6">
            Elevate Your Workspace
          </h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            Small ergonomic changes can dramatically improve
            comfort and productivity during long working hours.
            Ergosits products are designed to keep your posture
            aligned and your workspace clean.
          </p>

        </motion.div>


        {/* IMAGE */}
        <motion.div style={{ y: yImage }} className="flex justify-center">

          <Image
            src="/images/workspace.webp"
            alt="workspace"
            width={500}
            height={500}
          />

        </motion.div>

      </div>

    </section>
  );
}