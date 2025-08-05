"use client";

import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        const json = await res.json();
        const movieList = Array.isArray(json) ? json : json.data ?? [];
        setData(movieList);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetch;
