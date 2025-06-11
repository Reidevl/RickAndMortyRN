import { CharacterRepositoryImpl } from "@data/repositories/CharacterRepositoryImpl";
import { GetCharactersUseCase } from "@domain/use-cases/GetCharactersUseCase";

describe("GetCharactersUseCase", () => {
  it("should get a character", async () => {
    const characterRepository = new CharacterRepositoryImpl();
    const getCharactersUseCase = new GetCharactersUseCase(characterRepository);
    const characters = await getCharactersUseCase.execute({
      page: 1,
    });
    expect(characters).toBeDefined();
  });
});
