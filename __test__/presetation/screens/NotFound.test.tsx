import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
// Components
import NotFoundScreen from "@/app/+not-found";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "notFound.title": "This screen doesn't exist.",
        "notFound.goHome": "Go to home screen!",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Stack: {
      Screen: ({ options }: any) => <Text>{options?.title || "No Title"}</Text>,
    },
    Link: ({ children, href, style }: any) => (
      <Text>
        Link to {href} {children}
      </Text>
    ),
  };
});

jest.doMock("@components/ThemedText", () => ({
  ThemedText: ({ children }: any) => <Text>{children}</Text>,
}));

jest.mock("@components/ThemedView", () => ({
  ThemedView: ({ children }: any) => <>{children}</>,
}));

describe("NotFoundScreen", () => {
  it("renders correctly with translated texts", () => {
    const { getByText } = render(<NotFoundScreen />);

    expect(getByText("Oops!")).toBeTruthy();
    expect(getByText("This screen doesn't exist.")).toBeTruthy();
    expect(getByText("Go to home screen!")).toBeTruthy();
    expect(getByText(/Link to \/\(tabs\)\/\(characters\)/)).toBeTruthy();
  });
});
