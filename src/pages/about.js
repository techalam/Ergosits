import { motion } from "framer-motion";

export default function About() {
  return (
    <div>

      {/* HERO */}
      <section className="py-32 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-semibold"
        >
          About Ergosits
        </motion.h1>

        <p className="mt-6 text-muted text-lg">
          We believe comfort and productivity should go hand in hand.
          Ergosits creates ergonomic workspace products designed to
          improve posture and reduce strain during long working hours.
        </p>
      </section>


      {/* STORY */}
      <section className="py-24 bg-canvas">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Why We Started
            </h2>

            <p className="text-muted leading-relaxed mb-6">
              Millions of people work for hours on laptops placed directly
              on desks. This forces the neck to bend forward, leading to
              long-term posture problems and chronic pain.
            </p>

            <p className="text-muted leading-relaxed">
              Ergosits was created to solve this everyday problem with
              thoughtfully designed ergonomic products that elevate
              devices to healthier viewing angles.
            </p>
          </div>

          <div className="bg-surface p-10 rounded-3xl shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Our Mission
            </h3>

            <p className="text-muted leading-relaxed">
              To help people build healthier workspaces by combining
              ergonomic science with simple, elegant design.
            </p>
          </div>

        </div>
      </section>


      {/* VALUES */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Ergonomic First
            </h3>
            <p className="text-muted">
              Every product is designed to improve posture and comfort.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Minimal Design
            </h3>
            <p className="text-muted">
              Clean aesthetics that match modern workspaces.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Long Term Comfort
            </h3>
            <p className="text-muted">
              Built for people who work and study for long hours.
            </p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="py-28 bg-black text-white text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Upgrade Your Workspace
        </h2>

        <a
          href="/products"
          className="px-8 py-4 bg-surface text-foreground rounded-full"
        >
          Explore Products
        </a>
      </section>

    </div>
  );
}