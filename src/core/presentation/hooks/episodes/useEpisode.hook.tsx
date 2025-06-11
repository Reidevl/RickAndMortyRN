import { useEffect, useState } from "react";
// Data
import { EpisodeRepositoryImpl } from "@data/repositories/EpisodeRepositoryImpl";
// Entities
import { Episode } from "@entities/Episode";
// Use-case
import { GetEpisodeUseCase } from "@domain/use-cases/GetEpisodeUseCase";

const episodeRepository = new EpisodeRepositoryImpl();
const getEpisodeUseCase = new GetEpisodeUseCase(episodeRepository);

export const useEpisode = (id: string | number | undefined) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getEpisodeUseCase
      .execute(String(id))
      .then(setEpisode)
      .catch((err) => setError(err as Error))
      .finally(() => setLoading(false));
  }, [id]);

  return { episode, loading, error };
};
