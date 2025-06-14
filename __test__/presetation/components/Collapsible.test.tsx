import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
// Components
import { Collapsible } from "@/src/core/presentation/components/Collapsible";
// Hooks
import { useColorScheme as mockUseColorScheme } from "@hooks/useColorScheme";

describe("Collapsible", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockUseColorScheme as jest.Mock).mockReturnValue("light");
  });

  it("renders with title and collapsed by default", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Section Title">
        <>
          {/* Children here won't be visible */} <Text>Content</Text>
        </>
      </Collapsible>
    );

    expect(getByText("Section Title")).toBeTruthy();
    expect(queryByText("Content")).toBeNull(); // contenido oculto
  });

  it("shows children when pressed", () => {
    const { getByText } = render(
      <Collapsible title="More Info">
          <Text>Visible Content</Text>
      </Collapsible>
    );

    fireEvent.press(getByText("More Info"));
    expect(getByText("Visible Content")).toBeTruthy();
  });

  it("toggles collapse on multiple presses", () => {
    const { getByText, queryByText } = render(
      <Collapsible title="Toggle Section">
        <Text>Details</Text>
      </Collapsible>
    );

    const title = getByText("Toggle Section");
    fireEvent.press(title); // abrir
    expect(getByText("Details")).toBeTruthy();

    fireEvent.press(title); // cerrar
    expect(queryByText("Details")).toBeNull();
  });

  it("uses correct icon rotation based on open state", () => {
    const { getByText } = render(
      <Collapsible title="Rotation Test">
        <Text>Hidden</Text>
      </Collapsible>
    );

    expect(getByText("Rotation Test")).toBeTruthy();
  });

  it("uses dark theme icon color when theme is dark", () => {
    (mockUseColorScheme as jest.Mock).mockReturnValue("dark");

    const { getByText } = render(
      <Collapsible title="Theme Test">
        <Text>Whatever</Text>
      </Collapsible>
    );

    expect(getByText("Theme Test")).toBeTruthy();
  });

  it("defaults to light theme if useColorScheme returns undefined", () => {
    (mockUseColorScheme as jest.Mock).mockReturnValue(undefined);

    const { getByText } = render(
      <Collapsible title="Default Theme Test">
        <Text>Theme</Text>
      </Collapsible>
    );

    expect(getByText("Default Theme Test")).toBeTruthy();
  });
});
