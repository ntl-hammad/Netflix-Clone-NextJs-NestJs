"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.message || "Login failed");

    localStorage.setItem("token", data.accessToken);
    router.push("/");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url("/image.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-5 text-white"
        style={{
          width: "400px",
          backgroundColor: "black",
          borderRadius: "2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.8)",
        }}
      >
        <h2 className="mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border-secondary"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control border-secondary"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          <p className="text-end mb-3">
            <a
              href="/forgot-password"
              className="text-danger text-decoration-none"
              style={{ fontSize: "0.9rem" }}
            >
              Forgot Password?
            </a>
          </p>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-danger w-100 rounded-pill">
            Sign In
          </button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-info text-decoration-none">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
