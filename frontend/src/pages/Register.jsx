import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import loginBg from "../assets/login-bg.jpg";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
    nav("/dashboard");
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-[calc(100vh-80px)]" 
      // 👆 100vh minus ~80px (header height) so image starts below header
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Register Form */}
      <form
        onSubmit={submit}
        className="relative z-10 bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <input
          className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none text-black"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none text-black"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none text-black"
          type="password"
          placeholder="Password (min 6)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-full py-3 rounded-lg transition">
          Create Account
        </button>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 font-semibold">
            Login
          </Link>
        </div>
      </form>
    </section>
  );
}
