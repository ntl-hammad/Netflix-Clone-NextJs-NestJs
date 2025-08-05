"use client";

import React from "react";
import "../styles/MovieSection.css";
import { useFavorites } from "../hooks/useFavorites";
import { useWatchlist } from "../hooks/useWatchlist";

// export default function MovieCard({ movie }) {
//   const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
//   const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

//   const isFavorited = favorites?.some((fav) => fav.movieId === movie.id);
//   const isWatchlisted = watchlist?.some((item) => item.movieId === movie.id);

//   const handleClick = () => {
//     if (isFavorited) {
//       removeFromFavorites(movie.id);
//     } else {
//       console.log(movie.id, movie.name);
//       // console.log(typeof movie.url, movie.url);
//       addToFavorites({
//         movieId: movie.id,
//         title: movie.name,
//       });
//     }
//   };

//   return (
//     <div className="movie-card card">
//       <img
//         src={movie.image?.medium}
//         className="card-img-top"
//         alt={movie.name}
//       />
//       <div className="card-body p-2">
//         <h6 className="card-title text-truncate">{movie.name}</h6>
//         <button className="btn btn-sm btn-primary w-100" onClick={handleClick}>
//           {isFavorited ? "Remove Favorite" : "Add to Favorite"}
//         </button>
//       </div>
//     </div>
//   );
// }

export default function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isFavorited = favorites?.some((fav) => fav.movieId === movie.id);
  const isWatchlisted = watchlist?.some((item) => item.movieId === movie.id);

  const handleFavorite = () => {
    isFavorited
      ? removeFromFavorites(movie.id)
      : addToFavorites({ movieId: movie.id, title: movie.name });
  };

  const handleWatchlist = () => {
    isWatchlisted
      ? removeFromWatchlist(movie.id)
      : addToWatchlist({ movieId: movie.id, title: movie.name });
  };

  return (
    <div className="movie-card card position-relative">
      <img
        src={movie.image?.medium}
        className="card-img-top"
        alt={movie.name}
      />

      <div className="position-absolute top-0 end-0 p-2 d-flex flex-column">
        <button
          className="btn btn-sm btn-outline-light mb-1"
          onClick={handleFavorite}
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
        <button
          className="btn btn-sm btn-outline-light"
          onClick={handleWatchlist}
          title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isWatchlisted ? "➖" : "➕"}
        </button>
      </div>

      <div className="card-body p-2 text-center">
        <h6 className="card-title text-truncate mb-0">{movie.name}</h6>
      </div>
    </div>
  );
}
