"use client";

import MovieSection from "@/components/MovieSection";
import useFetch from "@/hooks/useFetch";
import { useFavorites } from "@/hooks/useFavorites";
import AuthGuard from "@/components/AuthGuard";
import { useMemo } from "react";

export default function Home() {
  const { data: trendingMovies, loading } = useFetch(
    "http://localhost:5000/movies/trending"
  );
  const { favorites, isLoading: favLoading } = useFavorites();

  const favoriteMovies = useMemo(() => {
    if (!favorites || !trendingMovies) return [];
    return favorites
      .map((fav) => trendingMovies.find((movie) => movie.id === fav.movieId))
      .filter(Boolean);
  }, [favorites, trendingMovies]);

  if (loading || favLoading) {
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
        <MovieSection title="Trending Movies" movies={trendingMovies} />
        <MovieSection
          title="New Movies"
          movies={[...trendingMovies].reverse()}
        />
        <MovieSection title="Favourites" movies={favoriteMovies} />
      </div>
    </AuthGuard>
  );
}
