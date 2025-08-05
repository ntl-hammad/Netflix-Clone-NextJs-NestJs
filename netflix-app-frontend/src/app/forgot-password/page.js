"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "http://localhost:5000/auth/request-reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    setMessage(data.message || "Check console for reset link.");
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
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control border-secondary"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill">
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="mt-3 text-center" style={{ fontSize: "0.9rem" }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
