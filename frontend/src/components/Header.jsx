import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full shadow-md bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">Buyhatke</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/shop" className="text-yellow-600">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Search Bar (separate row) */}
      <div className="w-full bg-gray-50 border-t">
        <div className="max-w-3xl mx-auto py-3 px-6">
          <input
            type="text"
            placeholder="Search scents..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
    </header>
  );
}
