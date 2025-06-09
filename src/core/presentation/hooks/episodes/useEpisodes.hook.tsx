import { useCallback, useEffect, useState } from "react";
// Data
import { EpisodeRepositoryImpl } from "@data/repositories/EpisodeRepositoryImpl";
// Entities
import { Episode } from "@entities/Episode";

const episodeRepository = new EpisodeRepositoryImpl();

export function useEpisodes() {
  const [filters, setFilters] = useState<{
    name?: string;
    page?: number;
  }>({ page: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEpisodes = useCallback(async () => {
    setLoading(true);
    episodeRepository
      .getEpisodes({
        name: filters.name,
        page: filters.page,
      })
      .then((result) => {
        setEpisodes(result.episodes);
        setTotalPages(result.totalPages);
      })
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchEpisodes();
  }, [fetchEpisodes]);

  // MARK: - Filter setters
  const setName = useCallback(
    (name: string) => setFilters((f) => ({ ...f, name, page: 1 })),
    []
  );
  const setPage = useCallback(
    (page: number) => setFilters((f) => ({ ...f, page })),
    []
  );

  return {
    loading,
    error,
    filters,
    episodes,
    fetchEpisodes,
    setName,
    setPage,
    totalPages,
  };
}
