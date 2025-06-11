import { EpisodeRepositoryImpl } from "@data/repositories/EpisodeRepositoryImpl";
import { GetEpisodeUseCase } from "@domain/use-cases/GetEpisodeUseCase";

describe("GetEpisodeUseCase", () => {
  it("should get a episode", async () => {
    const episodeRepository = new EpisodeRepositoryImpl();
    const getEpisodeUseCase = new GetEpisodeUseCase(episodeRepository);
    const episode = await getEpisodeUseCase.execute("1");
    expect(episode).toBeDefined();
  });
});
