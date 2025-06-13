import { act, renderHook, waitFor } from "@testing-library/react-native";
// Use Cases
import { GetEpisodesUseCase } from "@/src/core/domain/use-cases/GetEpisodesUseCase";
// Hooks
import { useEpisodes } from "@/src/core/presentation/hooks/episodes/useEpisodes.hook";
// Mocks
import { episodeMock1 } from "@/__test__/mocks/Episodes/Episodes.mock";

describe("useEpisodes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch episodes", async () => {
    jest
      .spyOn(GetEpisodesUseCase.prototype, "execute")
      .mockResolvedValue({ episodes: [episodeMock1], totalPages: 1 });
    const { result } = renderHook(() => useEpisodes());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.episodes).toEqual([episodeMock1]);
  });

  it("should set error if fetch fails", async () => {
    jest
      .spyOn(GetEpisodesUseCase.prototype, "execute")
      .mockRejectedValue(new Error("Not found"));
    const { result } = renderHook(() => useEpisodes());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("should set name", async () => {
    const { result } = renderHook(() => useEpisodes());
    await act(async () => {
      result.current.setName("Rick");
    });
    expect(result.current.filters.name).toBe("Rick");
  });

  it("should set page", async () => {
    const { result } = renderHook(() => useEpisodes());
    await act(async () => {
      result.current.setPage(2);
    });
    expect(result.current.filters.page).toBe(2);
  });
});
