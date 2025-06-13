import { render } from "@testing-library/react-native";
import React from "react";
// Components
import { CharacterList } from "@components/characters/character-list";
// Entities
import { Character } from "@entities/Character";
// Mocks
import {
  characterMock1,
  characterMock2,
} from "@/__test__/mocks/Characters/Character.mock";

describe("CharacterList", () => {
  const mockCharacters: Character[] = [characterMock1, characterMock2];

  const mockProps = {
    characters: mockCharacters,
    page: 1,
    totalPages: 3,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders list of characters correctly", () => {
    const { getByText } = render(<CharacterList {...mockProps} />);

    expect(getByText("Rick Sanchez")).toBeTruthy();
    expect(getByText("Morty Smith")).toBeTruthy();
  });
});
