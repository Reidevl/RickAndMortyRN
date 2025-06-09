import { useEffect, useState } from "react";
// Data
import { EpisodeRepositoryImpl } from "@data/repositories/EpisodeRepositoryImpl";
// Entities
import { Episode } from "@entities/Episode";

const episodeRepository = new EpisodeRepositoryImpl();

export const useEpisode = (id: string | number | undefined) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    episodeRepository
      .getEpisodeById(String(id))
      .then(setEpisode)
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [id]);

  return { episode, loading, error };
};
