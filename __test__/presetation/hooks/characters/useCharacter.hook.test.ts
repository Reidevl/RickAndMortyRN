import { renderHook, waitFor } from "@testing-library/react-native";
// Use Cases
import { GetCharacterUseCase } from "@/src/core/domain/use-cases/GetCharacterUseCase";
// Hooks
import { useCharacter } from "@/src/core/presentation/hooks/characters/useCharacter.hook";
// Mocks
import { characterMock1, characterMock4 } from "@/__test__/mocks/Characters/Character.mock";

describe("useCharacter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and set character and episodesBySeason", async () => {
    // Mock the use-case's execute method to resolve with characterMock
    jest
      .spyOn(GetCharacterUseCase.prototype, "execute")
      .mockResolvedValueOnce(characterMock1);

    const { result } = renderHook(() => useCharacter("1"));

    // Wait for the async update
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toEqual(characterMock1);
    expect(result.current.error).toBeNull();
    expect(result.current.episodesBySeason["Season 1"].length).toBe(2);
  });

  it("should group episodes under 'Other' if regex does not match", async () => {
    jest
      .spyOn(GetCharacterUseCase.prototype, "execute")
      .mockResolvedValueOnce(characterMock4);
  
    const { result } = renderHook(() => useCharacter("1"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.episodesBySeason["Other"]).toBeDefined();
    expect(result.current.episodesBySeason["Other"][0].name).toBe("Test Ep");
  });

  it("should set error if fetch fails", async () => {
    jest
      .spyOn(GetCharacterUseCase.prototype, "execute")
      .mockRejectedValueOnce(new Error("Not found"));

    const { result } = renderHook(() => useCharacter("1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.character).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.episodesBySeason).toEqual({});
  });

  it("should not fetch if id is undefined", async () => {
    const spy = jest.spyOn(GetCharacterUseCase.prototype, "execute");
    renderHook(() => useCharacter(undefined));
    expect(spy).not.toHaveBeenCalled();
  });
});
