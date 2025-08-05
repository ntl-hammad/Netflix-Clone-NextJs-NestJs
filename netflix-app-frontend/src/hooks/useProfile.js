"use client";

import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
};
