import { Episode, EpisodeFilters } from "@entities/Episode";
import { EpisodeRepository } from "@repositories/EpisodeRepository";

export class GetEpisodesUseCase {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  async execute(filters?: EpisodeFilters): Promise<{
    episodes: Episode[];
    totalPages: number;
  }> {
    return this.episodeRepository.getEpisodes(filters);
  }
}
