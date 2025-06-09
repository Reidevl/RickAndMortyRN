import { apolloClient } from "@graphql/client";
import { GET_EPISODE, GET_EPISODES } from "@graphql/queries/episodes";
import {
  EpisodeResponse,
  EpisodesResponse,
  EpisodesVariables,
  EpisodeVariables,
} from "@graphql/types/episodes";
// Domain
import { Episode, EpisodeFilters } from "@domain/entities/Episode";
import { EpisodeRepository } from "@repositories/EpisodeRepository";

export class EpisodeRepositoryImpl implements EpisodeRepository {
  async getEpisodes(
    filters?: EpisodeFilters
  ): Promise<{ episodes: Episode[]; totalPages: number }> {
    const { data } = await apolloClient.query<
      EpisodesResponse,
      EpisodesVariables
    >({
      query: GET_EPISODES,
      variables: {
        page: filters?.page || 1,
        filter: {
          name: filters?.name,
          episode: filters?.episode,
        },
      },
    });

    return {
      episodes: data.episodes.results,
      totalPages: data.episodes.info.pages,
    };
  }

  async getEpisodeById(id: string): Promise<Episode> {
    const { data } = await apolloClient.query<
      EpisodeResponse,
      EpisodeVariables
    >({
      query: GET_EPISODE,
      variables: { id },
    });

    return data.episode;
  }

  async getEpisodesByIds(ids: string[]): Promise<Episode[]> {
    const episodes = await Promise.all(
      ids.map((id) => this.getEpisodeById(id))
    );
    return episodes;
  }
}
