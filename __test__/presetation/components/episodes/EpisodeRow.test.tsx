import { render } from "@testing-library/react-native";
import React from "react";
// Components
import { EpisodeRow } from "@components/episodes/episodes-row";
// Mocks
import { episodeMock1 } from "@/__test__/mocks/Episodes/Episodes.mock";

describe("EpisodeRow", () => {
  it("should render the episode row correctly", () => {
    const { getByTestId } = render(<EpisodeRow episode={episodeMock1} />);

    expect(getByTestId("episode-row")).toBeTruthy();
  });

  it("should render an Unknown airdate", () => {
    const { getByText } = render(
      <EpisodeRow episode={{ ...episodeMock1, air_date: "" }} />
    );

    expect(getByText("Aired on Unknown")).toBeTruthy();
  });
});
