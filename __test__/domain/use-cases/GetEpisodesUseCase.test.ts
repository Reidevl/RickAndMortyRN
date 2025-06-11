import { EpisodeRepositoryImpl } from "@data/repositories/EpisodeRepositoryImpl";
import { GetEpisodesUseCase } from "@domain/use-cases/GetEpisodesUseCase";

describe("GetEpisodesUseCase", () => {
  it("should get a episode", async () => {
    const episodeRepository = new EpisodeRepositoryImpl();
    const getEpisodesUseCase = new GetEpisodesUseCase(episodeRepository);
    const episodes = await getEpisodesUseCase.execute({ page: 1 });
    expect(episodes).toBeDefined();
  });
});
