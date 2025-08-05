"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-netflix bg-black py-3 px-4">
      <div className="container-fluid">
        <Link
          href="/"
          className="navbar-brand fw-bold fs-2 text-decoration-none"
          style={{ color: "#e50914" }}
        >
          NETFLIX
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/favorites" className="nav-link text-white">
                My List
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/watchlater" className="nav-link text-white">
                Watch Later
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex">
          <i
            className="bi bi-person-circle fs-3 text-white cursor-pointer"
            onClick={() => router.push("/profile")}
            style={{ cursor: "pointer" }}
            title="Profile"
          ></i>
        </div>
      </div>
    </nav>
  );
}
