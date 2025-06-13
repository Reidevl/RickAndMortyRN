import React from "react";

import { render } from "@testing-library/react-native";
// Components
import { CharacterInfo } from "@components/characters/character-info";
// Types
import { Character, Location } from "@entities/Character";

// Mock the translation hook
jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "characters.status": "Status",
        "characters.species": "Species",
        "characters.gender": "Gender",
        "characters.location": "Location",
      };
      return translations[key] || key;
    },
  }),
}));

describe("CharacterInfo", () => {
  const mockLocation: Location = {
    id: "1",
    name: "Earth (C-137)",
    type: "Planet",
    dimension: "Dimension C-137",
  };

  const mockCharacter: Character = {
    id: "1",
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: mockLocation,
    location: {
      ...mockLocation,
      name: "Citadel of Ricks",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [],
    created: "2017-11-04T18:48:46.250Z",
  };

  it("must render the character info correctly", () => {
    const { getByTestId } = render(
      <CharacterInfo character={{ ...mockCharacter }} />
    );

    const characterInfo = getByTestId("character-info");
    expect(characterInfo).toBeTruthy();
  });
});
