import { Character } from "@entities/Character";
import { CharacterRepository } from "@repositories/CharacterRepository";

export class GetCharacterUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {
    this.characterRepository = characterRepository;
  }

  async execute(id: string): Promise<Character> {
    return this.characterRepository.getCharacterById(id);
  }
}
