import { Character } from '@entities/Character';

export interface CharactersResponse {
  characters: {
    info: {
      pages: number;
      count: number;
    };
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

export interface CharactersVariables {
  page?: number;
  filter?: {
    name?: string;
    status?: Character['status'];
    species?: string;
    gender?: Character['gender'];
  };
}

export interface CharacterVariables {
  id: string;
} 