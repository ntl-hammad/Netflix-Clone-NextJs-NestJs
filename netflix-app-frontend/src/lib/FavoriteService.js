const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const addToFavorites = async ({ movieId, title }) => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ movieId, title }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to add to favorites");
  }
  return res.json();
};

export const removeFromFavorites = async (movieId) => {
  const res = await fetch(`${BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to remove from favorites");
  }
  return res.json();
};

export const fetchFavorites = async () => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch favorites");
  }
  return res.json();
};
