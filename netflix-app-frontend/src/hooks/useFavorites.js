"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
} from "../lib/FavoriteService";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    enabled: !!token,
  });

  const addMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => queryClient.invalidateQueries(["favorites"]),
  });

  const removeMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => queryClient.invalidateQueries(["favorites"]),
  });

  return {
    favorites,
    isLoading,
    addToFavorites: addMutation.mutate,
    removeFromFavorites: removeMutation.mutate,
  };
};
