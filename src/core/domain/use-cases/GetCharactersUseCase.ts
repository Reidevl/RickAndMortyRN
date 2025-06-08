import { Character, CharacterFilters } from '@entities/Character';
import { CharacterRepository } from '@repositories/CharacterRepository';

export class GetCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(filters?: CharacterFilters): Promise<{
    characters: Character[];
    totalPages: number;
  }> {
    return this.characterRepository.getCharacters(filters);
  }
} 