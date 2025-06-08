import { Episode } from "@entities/Episode";

export interface EpisodesResponse {
  episodes: {
    info: {
      pages: number;
      count: number;
    };
    results: Episode[];
  };
}

export interface EpisodeResponse {
  episode: Episode;
}

export interface EpisodesVariables {
  page?: number;
  filter?: {
    name?: string;
    episode?: string;
  };
}

export interface EpisodeVariables {
  id: string;
}
