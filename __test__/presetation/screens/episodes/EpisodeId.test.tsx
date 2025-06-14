import { render } from "@testing-library/react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { Text } from "react-native";
// Component
import EpisodePage from "@/app/(tabs)/(episodes)/episode/[id]";
// Hooks
import { useEpisode } from "@hooks/episodes/useEpisode.hook";
// Mocks
import { episodeMock2 } from "@/__test__/mocks/Episodes/Episodes.mock";

// Mock components with more detailed implementations
jest.doMock("@components/index", () => ({
  Loading: () => <Text testID="loading">Loading...</Text>,
  NotFoundSearchResult: ({ message, icon }: any) => (
    <>
      <Text>{message}</Text>
      {icon}
    </>
  ),
  IconSymbol: ({ name }: any) => <Text>{name}</Text>,
  CharacterCard: ({ name }: any) => <Text testID="character-card">{name}</Text>,
  EpisodeInfo: ({ episode }: any) => (
    <Text testID="episode-info">{episode.name}</Text>
  ),
}));

// Mocks
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
}));

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "episodes.error": "Episode not found",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@hooks/useThemeColor", () => ({
  useThemeColor: jest.fn(() => "#000"),
}));

jest.mock("@hooks/episodes/useEpisode.hook", () => ({
  useEpisode: jest.fn(),
}));

describe("EpisodePage", () => {
  const mockSetOptions = jest.fn();
  const mockEpisode = episodeMock2;

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "1" });
    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
    });
  });

  it("renders loading state", () => {
    (useEpisode as jest.Mock).mockReturnValue({
      episode: null,
      loading: true,
      error: false,
    });

    const { getByTestId } = render(<EpisodePage />);
    expect(getByTestId("loading")).toBeTruthy();
  });

  it("renders error state with not found message and icon", () => {
    (useEpisode as jest.Mock).mockReturnValue({
      episode: null,
      loading: false,
      error: true,
    });

    const { getByText } = render(<EpisodePage />);
    expect(getByText("Episode not found")).toBeTruthy();
  });

  it("renders episode with all details and episodes", () => {
    (useEpisode as jest.Mock).mockReturnValue({
      episode: mockEpisode,
      loading: false,
      error: false,
    });

    const { getByTestId } = render(<EpisodePage />);
    expect(getByTestId("episode-info")).toBeTruthy();
  });
});
