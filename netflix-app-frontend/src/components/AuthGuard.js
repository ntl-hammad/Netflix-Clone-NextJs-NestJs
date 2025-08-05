"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setChecked(true);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, []);

  if (!checked) return null;

  return <>{children}</>;
}
