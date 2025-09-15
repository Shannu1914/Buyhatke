import aboutBg from "../assets/contact-bg.jpg";

export default function About() {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center px-6"
      style={{ backgroundImage: `url(${aboutBg})` }} // replace with your image
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-6">
          At <span className="text-yellow-600 font-semibold">Buyhatke Candles</span>,
          we handcraft small-batch, eco-friendly candles designed to bring
          warmth, relaxation, and elegance into your home. Every candle is made
          with care and infused with delightful fragrances to elevate your mood.
        </p>

        <h2 className="text-3xl font-bold mb-4">Mission</h2>
        <p>
          Our mission is to provide sustainable and affordable candles without
          compromising on quality. Whether it’s for self-care, gifting, or
          decor, we’ve got something special for every occasion.
        </p>
      </div>
    </section>
  );
}

