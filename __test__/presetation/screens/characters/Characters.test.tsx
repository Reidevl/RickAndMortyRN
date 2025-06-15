import { act, render } from "@testing-library/react-native";
import React from "react";
import { Text, TextInput } from "react-native";
// Component
import CharactersScreen from "@/app/(tabs)/(characters)";
// Hooks
import { useCharacters } from "@hooks/characters/useCharacters.hook";
// Mocks
import {
    characterMock1,
    characterMock2,
} from "@/__test__/mocks/Characters/Character.mock";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "characters.search": "Search",
        "characters.status": "Status",
        "characters.species": "Species",
        "characters.gender": "Gender",
        "characters.noCharactersFound": "No characters found",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@hooks/characters/useCharacters.hook", () => ({
  useCharacters: jest.fn(),
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
  SortingButton: ({ sort, setSort }: any) => (
    <Text onPress={() => setSort("az")}>Sort: {sort}</Text>
  ),
  Selector: ({ label, value, onSelect }: any) => (
    <Text onPress={() => onSelect("test-value")}>
      {label}: {value}
    </Text>
  ),
  Loading: () => <Text testID="loading">Loading...</Text>,
  NotFoundSearchResult: ({ message }: any) => <Text>{message}</Text>,
  CharacterList: ({ characters }: any) => (
    <Text testID="character-list">{characters.length} characters</Text>
  ),
  IconSymbol: () => <Text>Icon</Text>,
}));

describe("Characters", () => {
  const baseHookReturn = {
    characters: [],
    filters: { name: "", status: "", species: "", gender: "", page: 1 },
    loading: false,
    sort: "normal",
    setName: jest.fn(),
    setStatus: jest.fn(),
    setSpecies: jest.fn(),
    setGender: jest.fn(),
    setPage: jest.fn(),
    setSort: jest.fn(),
    totalPages: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading", async () => {
    (useCharacters as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      loading: true,
    });

    const { getByTestId } = render(<CharactersScreen />);

    await act(async () => {
      expect(getByTestId("loading")).toBeTruthy();
    });
  });

  it("should render not found search result", async () => {
    (useCharacters as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      characters: [],
    });

    const { getByText } = render(<CharactersScreen />);

    await act(async () => {
      expect(getByText("No characters found")).toBeTruthy();
    });
  });

  it("should render characters", async () => {
    (useCharacters as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      characters: [characterMock1, characterMock2],
    });

    const { getByText } = render(<CharactersScreen />);

    await act(async () => {
      expect(getByText("Rick Sanchez")).toBeTruthy();
    });
  });

  it("should use page 1 by default", async () => {
    (useCharacters as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      characters: [characterMock1, characterMock2],
      filters: { ...baseHookReturn.filters, page: undefined },
    });

    const { getByTestId } = render(<CharactersScreen />);
    await act(async () => {
      expect(getByTestId("paginator")).toBeTruthy();
    });
  });
});
