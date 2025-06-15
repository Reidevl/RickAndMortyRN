import { render } from "@testing-library/react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { Text } from "react-native";
// Component
import CharacterPage from "@/app/(tabs)/(characters)/character/[id]";
// Hooks
import { useCharacter } from "@hooks/characters/useCharacter.hook";

// Mock components with more detailed implementations
jest.doMock("@components/index", () => ({
  Loading: () => jest.fn(() => <Text>Loading...</Text>),
  NotFoundSearchResult: ({ message, icon }: any) => (
    <>
      <Text>{message}</Text>
      {icon}
    </>
  ),
  IconSymbol: ({ name }: any) => <Text>{name}</Text>,
  ParallaxScrollView: ({ children }: any) => <>{children}</>,
  CharacterInfo: ({ character }: any) => <Text>{character.name}</Text>,
  CollapsibleListContainer: () => <Text>Episodes List</Text>,
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
        "characters.characterError": "Character not found",
      };
      return translations[key] || key;
    },
  }),
}));


jest.mock("@hooks/characters/useCharacter.hook", () => ({
  useCharacter: jest.fn(),
}));

describe("CharacterPage", () => {
  const mockSetOptions = jest.fn();
  const mockCharacter = {
    id: "1",
    name: "Rick Sanchez",
    image: "https://example.com/rick.jpg",
    status: "Alive",
    species: "Human",
    gender: "Male",
    origin: { name: "Earth" },
    location: { name: "Earth" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue({ id: "1" });
    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
    });
  });

  it("renders loading state", () => {
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      episodesBySeason: {},
      loading: true,
      error: false,
    });

    const { getByTestId } = render(<CharacterPage />);
    expect(getByTestId("loading")).toBeTruthy();
  });

  it("renders error state with not found message and icon", () => {
    (useCharacter as jest.Mock).mockReturnValue({
      character: null,
      episodesBySeason: {},
      loading: false,
      error: true,
    });

    const { getByText } = render(<CharacterPage />);
    expect(getByText("Character not found")).toBeTruthy();
  });

  it("renders character with all details and episodes", () => {
    (useCharacter as jest.Mock).mockReturnValue({
      character: mockCharacter,
      episodesBySeason: { "Season 1": [], "Season 2": [] },
      loading: false,
      error: false,
    });

    const { getByTestId } = render(<CharacterPage />);
    expect(getByTestId("character-info")).toBeTruthy();
  });
});
