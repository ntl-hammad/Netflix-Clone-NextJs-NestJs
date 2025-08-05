"use client";

import React from "react";
import MovieRow from "./MovieRow";
import "../styles/MovieSection.css";

export default function MovieSection({ title, movies }) {
  return (
    <div className="movie-section my-4">
      <h3 className="text-white mb-3">{title}</h3>
      <MovieRow movies={movies} />
    </div>
  );
}
