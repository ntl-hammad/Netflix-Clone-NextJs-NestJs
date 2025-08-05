"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../lib/WatchlistService";

export const useWatchlist = () => {
  const queryClient = useQueryClient();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: fetchWatchlist,
    enabled: !!token,
  });

  const addMutation = useMutation({
    mutationFn: addToWatchlist,
    onSuccess: () => queryClient.invalidateQueries(["watchlist"]),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWatchlist,
    onSuccess: () => queryClient.invalidateQueries(["watchlist"]),
  });

  return {
    watchlist,
    isLoading,
    addToWatchlist: addMutation.mutate,
    removeFromWatchlist: removeMutation.mutate,
  };
};
