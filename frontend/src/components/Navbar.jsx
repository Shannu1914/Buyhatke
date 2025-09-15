import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png" // <-- replace with your logo path
            alt="Candle Store Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-gray-800">
            Buyhatke
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-yellow-600 font-semibold" : "hover:text-yellow-600"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Side (Login/Register or Dashboard) */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-lg hover:bg-yellow-500 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
