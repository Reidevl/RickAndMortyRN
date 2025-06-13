import { render } from "@testing-library/react-native";
import React from "react";
// Entities
import { Episode } from "@entities/Episode";
// Mocks
import {
    episodeMock1,
    episodeMock2,
} from "@/__test__/mocks/Episodes/Episodes.mock";
// Components
import { EpisodeList } from "@components/episodes/episode-list";

describe("EpisodeList", () => {
  const mockEpisodes: Episode[] = [episodeMock1, episodeMock2];

  const mockProps = {
    episodes: mockEpisodes,
    page: 1,
    totalPages: 1,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the episode list correctly", () => {
    const { getByText } = render(<EpisodeList {...mockProps} />);

    expect(getByText(episodeMock1.name)).toBeTruthy();
    expect(getByText(episodeMock2.name)).toBeTruthy();
  });
});
