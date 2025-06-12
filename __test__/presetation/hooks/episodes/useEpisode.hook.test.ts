import { renderHook, waitFor } from "@testing-library/react-native";
// Use Cases
import { GetEpisodeUseCase } from "@/src/core/domain/use-cases/GetEpisodeUseCase";
// Hooks
import { useEpisode } from "@/src/core/presentation/hooks/episodes/useEpisode.hook";
// Mocks
import { episodeMock1 } from "@/__test__/mocks/Episodes/Episodes.mock";

describe("useEpisode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch episode", async () => {
    jest
      .spyOn(GetEpisodeUseCase.prototype, "execute")
      .mockResolvedValue(episodeMock1);
    const { result } = renderHook(() => useEpisode("1"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.episode).toEqual(episodeMock1);
  });

  it("should set error if fetch fails", async () => {
    jest
      .spyOn(GetEpisodeUseCase.prototype, "execute")
      .mockRejectedValue(new Error("Not found"));
    const { result } = renderHook(() => useEpisode("1"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("should not fetch if id is undefined", async () => {
    const spy = jest.spyOn(GetEpisodeUseCase.prototype, "execute");
    
    renderHook(() => useEpisode(undefined));
    expect(spy).not.toHaveBeenCalled();
  });
});
