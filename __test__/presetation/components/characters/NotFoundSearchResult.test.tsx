import React from "react";
// Testing
import { render } from "@testing-library/react-native";
// Components
import { NotFoundSearchResult } from "@components/characters/not-found";
// Icons
import { IconSymbol } from "@components/ui/IconSymbol";

describe("NotFoundSearchResult", () => {
  const defaultProps = {
    icon: <IconSymbol name="magnifyingglass" size={48} color="#888" />,
  };

  it("renders with default message", () => {
    const { getByText } = render(<NotFoundSearchResult {...defaultProps} />);
    expect(getByText("No characters found.")).toBeTruthy();
  });

  it("renders with custom message", () => {
    const customMessage = "Custom not found message";
    const { getByText } = render(
      <NotFoundSearchResult {...defaultProps} message={customMessage} />
    );
    expect(getByText(customMessage)).toBeTruthy();
  });
});
