"use client";

import { useProfile } from "@/hooks/useProfile";
import AuthGuard from "@/components/AuthGuard";
import { logoutUser } from "@/lib/auth";

export default function ProfilePage() {
  const { data: user, isLoading } = useProfile();

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );

  if (!user) {
    if (typeof window !== "undefined") {
      logoutUser();
    }
    return null;
  }

  return (
    <AuthGuard>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          minHeight: "100vh",
          backgroundImage: `url("/image.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="card shadow-sm p-5 bg-dark text-white"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h3 className="mb-4 text-center bg-dark ">👤 User Profile</h3>
          <ul className="list-group list-group-flush text-white mb-3">
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Name:</strong> {user.name}
            </li>
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Phone:</strong> {user.phone}
            </li>
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Address:</strong> {user.address}
            </li>
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Role:</strong> {user.role}
            </li>
            <li className="list-group-item border-0 bg-dark text-white">
              <strong>Status:</strong> {user.status}
            </li>
            <li className="list-group-item  border-0 bg-dark text-white">
              <strong>Registered On:</strong>{" "}
              {new Date(user.datetime).toLocaleString()}
            </li>
          </ul>
          <button
            onClick={logoutUser}
            className="btn btn-sm btn-outline-danger w-100"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
