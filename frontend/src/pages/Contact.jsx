import { useState } from "react";
import contactBg from "../assets/contact-bg.jpg";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name}, we’ll get back to you soon!`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      className="relative min-h-[calc(100vh-80px)] w-full flex flex-col p-6"
      style={{
        backgroundImage: `url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-8">
          Have questions about our candles? Fill out the form or reach us directly.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info Box */}
          <div className="bg-white/80 shadow-md rounded-xl p-6 text-left text-black">
            <h3 className="text-xl font-semibold mb-4">Our Office</h3>
            <p>📍 H. no 1-71, Satamrai Village, Shamshabad Mandal, Telangana, 501218.</p>
            <p className="mt-3">📧 <a href="mailto:hello@candles.com" className="text-yellow-600 underline">hello@candles.com</a></p>
            <p>📞 <a href="tel:+918247047291" className="text-yellow-600 underline">+91 8247047291</a></p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white/80 shadow-md rounded-xl p-6 space-y-4 text-black">
            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
            <input className="w-full border rounded-lg px-3 py-2" placeholder="Your Name" required />
            <input className="w-full border rounded-lg px-3 py-2" type="email" placeholder="Your Email" required />
            <textarea className="w-full border rounded-lg px-3 py-2" rows="4" placeholder="Your Message" required></textarea>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition">Send Message</button>
          </form>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white/80 shadow-md rounded-xl p-6 text-black">
            <h3 className="text-2xl font-bold mb-4">Location Map</h3>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.461751783939!2d78.4037!3d17.2457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbb1c6b44c3e5%3A0x9b3bbf69a3c5bfc3!2sSatamrai%2C%20Telangana%20501218!5e0!3m2!1sen!2sin!4v1693738000000!5m2!1sen!2sin"
              width="100%"
              height="350"
              allowFullScreen=""
              loading="lazy"
              className="rounded-xl shadow-md border"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
