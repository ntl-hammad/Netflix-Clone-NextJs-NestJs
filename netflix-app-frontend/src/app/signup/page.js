"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.message || "Signup failed");
    router.push("/login");
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
        <h2 className="mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {["email", "password", "name", "address", "phone"].map((field) => (
            <div key={field} className="mb-3">
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                className="form-control border-secondary"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "0.5rem",
                }}
              />
            </div>
          ))}

          {error && <div className="text-danger mb-3">{error}</div>}

          <button type="submit" className="btn btn-danger w-100 rounded-pill">
            Create Account
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-info text-decoration-none">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
