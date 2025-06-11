import { CharacterRepositoryImpl } from "@/src/core/data/repositories/CharacterRepositoryImpl";
import { Character } from "@/src/core/domain/entities/Character";

// Mock data
const characterMock1: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    {
      id: "1",
      name: "Episode 1",
      episode: "S01E01",
      airDate: "2013-12-02",
    },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

const characterMock2: Character = {
  id: "2",
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "Human",
  gender: "Male",
  origin: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  location: {
    id: "1",
    name: "Earth",
    type: "Planet",
    dimension: "Dimension C-137",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [
    {
      id: "2",
      name: "Episode 2",
      episode: "S01E02",
      airDate: "2013-12-02",
    },
  ],
  created: "2013-12-02T14:42:00.000Z",
};

const mockQuery = jest.fn();
jest.mock("@graphql/client", () => ({
  apolloClient: {
    query: (...args: any[]) => mockQuery(...args),
  },
}));

describe("CharacterRepositoryImpl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get characters", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        characters: {
          results: [characterMock1, characterMock2],
          info: {
            pages: 1,
            count: 2,
          },
        },
      },
    });

    const characterRepository = new CharacterRepositoryImpl();
    const characters = await characterRepository.getCharacters();
    expect(characters.characters).toEqual([characterMock1, characterMock2]);
    expect(characters.totalPages).toEqual(1);
  });

  it("should get characters with filters", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        characters: {
          results: [characterMock1, characterMock2],
          info: {
            pages: 1,
            count: 2,
          },
        },
      },
    });

    const characterRepository = new CharacterRepositoryImpl();
    const characters = await characterRepository.getCharacters({ page: 1 });
    expect(characters.characters).toEqual([characterMock1, characterMock2]);
    expect(characters.totalPages).toEqual(1);
  });

  it("should get a single character by id", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        character: characterMock1,
      },
    });

    const characterRepository = new CharacterRepositoryImpl();
    const character = await characterRepository.getCharacterById("1");
    expect(character).toEqual(characterMock1);
  });
});
