"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import useFetch from "@/hooks/useFetch";
import MovieSection from "@/components/MovieSection";
import AuthGuard from "@/components/AuthGuard";
import { useMemo } from "react";

export default function WatchlaterPage() {
  const { watchlist, isLoading } = useWatchlist();
  const { data: movies, loading } = useFetch(
    "http://localhost:5000/movies/trending"
  );

  const watchlistMovies = useMemo(() => {
    if (!watchlist || !movies) return [];
    return watchlist
      .map((entry) => movies.find((m) => m.id === entry.movieId))
      .filter(Boolean);
  }, [watchlist, movies]);

  const loader = isLoading || loading;

  if (loader) {
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
        <MovieSection title="Watchlist" movies={watchlistMovies} />
      </div>
    </AuthGuard>
  );
}
