import { render } from "@testing-library/react-native";
import React from "react";
// Components
import { EpisodeInfo } from "@components/episodes/episode-info";
// Mocks
import { episodeMock1 } from "@/__test__/mocks/Episodes/Episodes.mock";

// Mock the translation hook
jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "episodes.airDate": "Air Date",
        "episodes.episodeCode": "Episode Code",
        "episodes.episodeCharacters": "Characters in Episode",
      };
      return translations[key] || key;
    },
  }),
}));

describe("EpisodeInfo", () => {
  it("must render the episode info correctly", () => {
    const { getByTestId } = render(
      <EpisodeInfo episode={{ ...episodeMock1 }} />
    );

    const episodeInfo = getByTestId("episode-info");
    expect(episodeInfo).toBeTruthy();
  });
});
