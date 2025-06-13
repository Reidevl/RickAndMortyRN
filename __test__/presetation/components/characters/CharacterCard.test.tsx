import { render } from "@testing-library/react-native";
import React from "react";
// Components
import { CharacterCard } from "@components/characters/character-card";

describe("CharacterCard", () => {
  const mockProps = {
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    species: "Human",
  };

  it("displays the correct name", () => {
    const { getByText } = render(<CharacterCard {...mockProps} />);
    expect(getByText("Rick Sanchez")).toBeTruthy();
  });
});
