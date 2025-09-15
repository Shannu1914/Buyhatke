import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import loginBg from "../assets/login-bg.jpg";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    nav("/dashboard");
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={submit}
        className="relative z-10 bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <input
          className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none text-black"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border rounded-lg p-3 w-full mb-4 focus:ring-2 focus:ring-yellow-400 outline-none text-black"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold w-full py-3 rounded-lg transition">
          Login
        </button>
        <div className="text-sm text-center mt-4">
          No account?{" "}
          <Link to="/register" className="text-yellow-300 font-semibold">
            Register
          </Link>
        </div>
      </form>
    </section>
  );
}
