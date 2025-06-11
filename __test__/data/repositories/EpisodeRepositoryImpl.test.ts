import { EpisodeRepositoryImpl } from "@/src/core/data/repositories/EpisodeRepositoryImpl";

// Mock data
const episodeMock1 = {
  id: "1",
  name: "Episode 1",
  episode: "S01E01",
  air_date: "2013-12-02",
  characters: [],
  created: "2013-12-02T14:42:00.000Z",
};

const episodeMock2 = {
  id: "2",
  name: "Episode 2",
  episode: "S01E02",
  air_date: "2013-12-09",
  characters: [],
  created: "2013-12-09T14:42:00.000Z",
};

// Mock the apolloClient globally
const mockQuery = jest.fn();
jest.mock("@graphql/client", () => ({
  apolloClient: {
    query: (...args: any[]) => mockQuery(...args),
  },
}));

describe("EpisodeRepositoryImpl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get episodes", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        episodes: {
          results: [episodeMock1, episodeMock2],
          info: { pages: 1, count: 2 },
        },
      },
    });

    const episodeRepository = new EpisodeRepositoryImpl();
    const episodes = await episodeRepository.getEpisodes();
    expect(episodes.episodes).toEqual([episodeMock1, episodeMock2]);
    expect(episodes.totalPages).toEqual(1);
  });
  
  it("should get episodes with filters", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        episodes: {
          results: [episodeMock1, episodeMock2],
          info: { pages: 1, count: 2 },
        },
      },
    });

    const episodeRepository = new EpisodeRepositoryImpl();
    const episodes = await episodeRepository.getEpisodes({ page: 1 });
    expect(episodes.episodes).toEqual([episodeMock1, episodeMock2]);
    expect(episodes.totalPages).toEqual(1);
  });

  it("should get a single episode by id", async () => {
    mockQuery.mockResolvedValueOnce({
      data: {
        episode: episodeMock1,
      },
    });

    const episodeRepository = new EpisodeRepositoryImpl();
    const episode = await episodeRepository.getEpisodeById("1");
    expect(episode).toEqual(episodeMock1);
  });
});
