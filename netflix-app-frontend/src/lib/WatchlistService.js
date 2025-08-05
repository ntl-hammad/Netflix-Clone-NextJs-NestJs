const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchWatchlist = async () => {
  const res = await fetch(`${BASE_URL}/watchlist`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch watchlist");
  return res.json();
};

export const addToWatchlist = async ({ movieId, title }) => {
  const res = await fetch(`${BASE_URL}/watchlist`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ movieId, title }),
  });
  if (!res.ok) throw new Error("Failed to add to watchlist");
  return res.json();
};

export const removeFromWatchlist = async (movieId) => {
  const res = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove from watchlist");
  return res.json();
};
