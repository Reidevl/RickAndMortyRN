import { Character, CharacterFilters } from '@entities/Character';

export interface CharacterRepository {
  /**
   * Get characters
   * @param filters - Filters to apply to the characters
   * @returns Characters and total pages
   */
  getCharacters(filters?: CharacterFilters): Promise<{
    characters: Character[];
    totalPages: number;
  }>;

  /**
   * Get character by id
   * @param id - Character id
   * @returns Character
   */
  getCharacterById(id: string): Promise<Character>;

  /**
   * Get characters by ids
   * @param ids - Character ids
   * @returns Characters
   */
  getCharactersByIds(ids: string[]): Promise<Character[]>;
} 