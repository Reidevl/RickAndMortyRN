export type CharacterStatus = "All" | "Alive" | "Dead" | "unknown";
export type CharacterGender = "All" | "Female" | "Male" | "Genderless" | "unknown";
export type CharacterSpecies = "All" | "Human" | "Alien" | "Robot" | "unknown";

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
  gender?: CharacterGender;
}