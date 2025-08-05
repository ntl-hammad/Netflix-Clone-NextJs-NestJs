"use client";

import React from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieSection.css";

export default function MovieRow({ movies }) {
  if (!Array.isArray(movies)) return null;

  return (
    <div className="movie-row">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
