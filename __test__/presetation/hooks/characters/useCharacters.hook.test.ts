import { act, renderHook, waitFor } from "@testing-library/react-native";
// Use Cases
import { GetCharactersUseCase } from "@/src/core/domain/use-cases/GetCharactersUseCase";
// Hooks
import { useCharacters } from "@/src/core/presentation/hooks/characters/useCharacters.hook";
// Mocks
import {
  characterMock1,
  characterMock2,
  characterMock3,
} from "@/__test__/mocks/Characters/Character.mock";

describe("useCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have initial state", async () => {
    
    const { result } = renderHook(() => useCharacters());

    expect(result.current.characters).toEqual([]);
    expect(result.current.loading).toEqual(true);
    expect(result.current.error).toEqual(null);
    expect(result.current.totalPages).toEqual(1);
    expect(result.current.sort).toEqual("normal");
    expect(result.current.filters).toEqual({ page: 1 });
  });

  it("should fetch and set characters", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        characters: [characterMock1, characterMock2],
        totalPages: 2,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.characters).toEqual([characterMock1, characterMock2]);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.error).toBeNull();
  });

  it("should filter by gender", async () => {
    jest.spyOn(GetCharactersUseCase.prototype, "execute").mockResolvedValue({
      characters: [characterMock1, characterMock2, characterMock3],
      totalPages: 1,
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setGender("Male");
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.characters).toEqual([
      characterMock1,
      characterMock2,
      characterMock3,
    ]);
  });

  it("should handle error on fetch", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.characters).toEqual([]);
  });

  it("should sort characters A-Z", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        characters: [characterMock2, characterMock1, characterMock3],
        totalPages: 1,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSort("az");
    });

    expect(result.current.characters.map((c) => c.name)).toEqual([
      "Charlie",
      "Morty Smith",
      "Rick Sanchez",
    ]);
  });

  it("should sort characters Z-A", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        characters: [characterMock2, characterMock1, characterMock3],
        totalPages: 1,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSort("za");
    });

    expect(result.current.characters.map((c) => c.name)).toEqual([
      "Rick Sanchez",
      "Morty Smith",
      "Charlie",
    ]);
  });

  it("should sort characters by normal", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        characters: [characterMock2, characterMock1, characterMock3],
        totalPages: 1,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSort("normal");
    });

    expect(result.current.characters.map((c) => c.name)).toEqual([
      "Morty Smith",
      "Rick Sanchez",
      "Charlie",
    ]);
  });

  it("should sort characters by undefined", async () => {
    jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        characters: [characterMock2, characterMock1, characterMock3],
        totalPages: 1,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.setSort(undefined as any);
    });

    expect(result.current.characters.map((c) => c.name)).toEqual([
      "Morty Smith",
      "Rick Sanchez",
      "Charlie",
    ]);
  });

  it("should set filters with setName, setStatus, setSpecies, setGender, setPage", async () => {
    jest.spyOn(GetCharactersUseCase.prototype, "execute").mockResolvedValue({
      characters: [characterMock2, characterMock1, characterMock3],
      totalPages: 1,
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      result.current.setName("Rick");
      result.current.setStatus("Alive");
      result.current.setSpecies("Human");
      result.current.setGender("Male");
      result.current.setPage(2);
    });

    expect(result.current.filters).toEqual({
      name: "Rick",
      status: "Alive",
      species: "Human",
      gender: "Male",
      page: 2,
    });
  });

  it("should reset filters with setStatus, setSpecies, setGender", async () => {
    jest.spyOn(GetCharactersUseCase.prototype, "execute").mockResolvedValue({
      characters: [characterMock2, characterMock1, characterMock3],
      totalPages: 1,
    });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      result.current.setStatus("All");
      result.current.setSpecies("All");
      result.current.setGender("All");
    });

    expect(result.current.filters.status).toBeUndefined();
    expect(result.current.filters.species).toBeUndefined();
    expect(result.current.filters.gender).toBeUndefined();
    expect(result.current.filters.page).toBe(1);
  }); 

  it("should refetch characters", async () => {
    const spy = jest
      .spyOn(GetCharactersUseCase.prototype, "execute")
      .mockResolvedValue({
        characters: [characterMock1],
        totalPages: 1,
      });

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(spy).toHaveBeenCalledTimes(2); // 1 inicial + 1 refetch
  });
});
