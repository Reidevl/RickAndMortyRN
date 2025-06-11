import { Episode } from "@entities/Episode";
import { EpisodeRepository } from "@repositories/EpisodeRepository";

export class GetEpisodeUseCase {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  async execute(id: string): Promise<Episode> {
    return this.episodeRepository.getEpisodeById(id);
  }
}   