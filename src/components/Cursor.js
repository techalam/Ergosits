import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {

    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    const links = document.querySelectorAll("a, button");

    links.forEach((el) => {
      el.addEventListener("mouseenter", () => setHover(true));
      el.addEventListener("mouseleave", () => setHover(false));
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };

  }, []);

  return (
    <motion.div
      animate={{
        x: mouse.x - 10,
        y: mouse.y - 10,
        scale: hover ? 2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 pointer-events-none z-[9999]"
    />
  );
}