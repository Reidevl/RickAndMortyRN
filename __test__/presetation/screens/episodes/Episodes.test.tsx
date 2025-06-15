import { act, render } from "@testing-library/react-native";
import React from "react";
import { Text, TextInput } from "react-native";
// Component
import EpisodesScreen from "@/app/(tabs)/(episodes)";
// Hooks
import { useEpisodes } from "@/src/core/presentation/hooks/episodes";
// Mocks
import { episodeMock3, episodeMock4 } from "@/__test__/mocks/Episodes/Episodes.mock";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "episodes.search": "Search",
        "episodes.noEpisodesFound": "No episodes found",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@hooks/episodes/useEpisodes.hook", () => ({
  useEpisodes: jest.fn(),
}));

jest.doMock("@components/index", () => ({
  __esModule: true,
  ThemedView: ({ children }: any) => <>{children}</>,
  SearchInput: ({ value, onChangeText, onSubmit, placeholder }: any) => (
    <TextInput
      testID="search-input"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={() => onSubmit(value)}
      placeholder={placeholder}
    />
  ),
  Loading: () => <Text testID="loading">Loading...</Text>,
  NotFoundSearchResult: ({ message }: any) => <Text>{message}</Text>,
  EpisodeList: ({ episodes }: any) => (
    <Text testID="episode-list">{episodes.length} episodes</Text>
  ),
  IconSymbol: () => <Text>Icon</Text>,
}));

describe("Episodes", () => {
  const baseHookReturn = {
    episodes: [],
    filters: { name: "", page: 1 },
    loading: false,
    setName: jest.fn(),
    setPage: jest.fn(),
    totalPages: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading", async () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      loading: true,
    });

    const { getByTestId } = render(<EpisodesScreen />);

    await act(async () => {
      expect(getByTestId("loading")).toBeTruthy();
    });
  });

  it("should render not found search result", async () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      episodes: [],
    });

    const { getByText } = render(<EpisodesScreen />);

    await act(async () => {
      expect(getByText("No episodes found")).toBeTruthy();
    });
  });

  it("should render episodes", async () => {
      (useEpisodes as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      episodes: [episodeMock3, episodeMock4],
    });

    const { getByText } = render(<EpisodesScreen />);

    await act(async () => {
      expect(getByText("Pilot")).toBeTruthy();
    });
  });

  it("should use page 1 by default", async () => {
    (useEpisodes as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      episodes: [episodeMock3, episodeMock4],
      filters: { ...baseHookReturn.filters, page: undefined },
    });

    const { getByTestId } = render(<EpisodesScreen />);
    await act(async () => {
      expect(getByTestId("paginator")).toBeTruthy();
    });
  });
});
