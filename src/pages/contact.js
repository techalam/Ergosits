import { motion } from "framer-motion";

export default function Contact() {
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
          Contact Us
        </motion.h1>

        <p className="mt-6 text-gray-500 text-lg">
          Have questions about our products or your order?  
          We're here to help.
        </p>

      </section>


      {/* CONTACT FORM */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid md:grid-cols-2 gap-20">

        {/* FORM */}
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Send a Message
          </h2>

          <form className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none"
            />

            <button
              type="submit"
              className="px-8 py-3 bg-black text-white rounded-full hover:scale-105 transition"
            >
              Send Message
            </button>

          </form>

        </div>


        {/* CONTACT INFO */}
        <div>

          <h2 className="text-2xl font-semibold mb-6">
            Support
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Our team usually responds within 24 hours.
            Feel free to reach out for product questions,
            bulk orders or support.
          </p>

          <div className="space-y-6">

            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-500">support@ergosits.com</p>
            </div>

            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-500">+91 00000 00000</p>
            </div>

            <div>
              <h3 className="font-semibold">Working Hours</h3>
              <p className="text-gray-500">
                Monday – Saturday  
                10:00 AM – 6:00 PM
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}