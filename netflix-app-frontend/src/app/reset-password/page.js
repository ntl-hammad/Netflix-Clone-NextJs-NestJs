"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // 2s
    } else {
      setMessage(data.message || "Something went wrong.");
    }
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
        <h2 className="mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control border-secondary"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 rounded-pill">
            Reset Password
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
