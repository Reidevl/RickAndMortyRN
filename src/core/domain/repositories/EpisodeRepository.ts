import { Episode, EpisodeFilters } from '@entities/Episode';

export interface EpisodeRepository {
  /**
   * Get episodes
   * @param filters - Filters to apply to the episodes
   * @returns Episodes and total pages
   */
  getEpisodes(filters?: EpisodeFilters): Promise<{
    episodes: Episode[];
    totalPages: number;
  }>;

  /**
   * Get episode by di
   * @param id - Episode id
   * @returns Episode
   */
  getEpisodeById(id: string): Promise<Episode>;
} 