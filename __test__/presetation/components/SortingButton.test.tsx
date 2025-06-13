import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
// Component
import { SortingButton } from "@components/sorting-button";

// Mock useThemeColor
jest.mock("@hooks/useThemeColor", () => ({
  useThemeColor: (_: any, type: string) => {
    if (type === "text") return "#000";
    if (type === "background") return "#fff";
    return "#ccc";
  },
}));

// Mock useTranslation
jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "characters.sortedNormal": "Default",
        "characters.sortedAZ": "A - Z",
        "characters.sortedZA": "Z - A",
      };
      return translations[key] || key;
    },
  }),
}));

describe("SortingButton", () => {
  it("renders with 'normal' sort", () => {
    const { getByTestId, getByText } = render(
      <SortingButton sort="normal" setSort={jest.fn()} />
    );

    expect(getByTestId("sorting-button")).toBeTruthy();
    expect(getByText("Default")).toBeTruthy();
  });

  it("cycles sort from 'normal' to 'az'", () => {
    const setSort = jest.fn();
    const { getByTestId } = render(
      <SortingButton sort="normal" setSort={setSort} />
    );

    fireEvent.press(getByTestId("sorting-button"));
    expect(setSort).toHaveBeenCalledWith("az");
  });

  it("cycles sort from 'az' to 'za'", () => {
    const setSort = jest.fn();
    const { getByTestId } = render(
      <SortingButton sort="az" setSort={setSort} />
    );

    fireEvent.press(getByTestId("sorting-button"));
    expect(setSort).toHaveBeenCalledWith("za");
  });

  it("cycles sort from 'za' to 'normal'", () => {
    const setSort = jest.fn();
    const { getByTestId } = render(
      <SortingButton sort="za" setSort={setSort} />
    );

    fireEvent.press(getByTestId("sorting-button"));
    expect(setSort).toHaveBeenCalledWith("normal");
  });
});
