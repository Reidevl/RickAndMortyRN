export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export interface Episode {
  id: string;
  name: string;
  airDate: string;
  episode: string;
}

export interface Character {
  id: string;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  created: string;
}

export interface CharacterFilters {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  page?: number;
} 