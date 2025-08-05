"use client";

import AuthGuard from "@/components/AuthGuard";
import MovieSection from "@/components/MovieSection";
import { useFavorites } from "@/hooks/useFavorites";
import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";

export default function FavoritesPage() {
  const { favorites, isLoading: favLoading } = useFavorites();
  const { data: allMovies, loading: movieLoading } = useFetch(
    "http://localhost:5000/movies/trending"
  );

  const favoriteMovies = useMemo(() => {
    if (!favorites || !allMovies) return [];
    return favorites
      .map((fav) => allMovies.find((movie) => movie.id === fav.movieId))
      .filter(Boolean);
  }, [favorites, allMovies]);

  const isLoading = favLoading || movieLoading;

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border text-light" role="status"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="container mt-4">
        <MovieSection title="Favorites" movies={favoriteMovies} />
      </div>
    </AuthGuard>
  );
}
