import { CharacterRepositoryImpl } from "@data/repositories/CharacterRepositoryImpl";
import { GetCharacterUseCase } from "@domain/use-cases/GetCharacterUseCase";

describe("GetCharacterUseCase", () => {
  it("should get a character", async () => {
    const characterRepository = new CharacterRepositoryImpl();
    const getCharacterUseCase = new GetCharacterUseCase(characterRepository);
    const character = await getCharacterUseCase.execute("1");
    expect(character).toBeDefined();
  });
});
