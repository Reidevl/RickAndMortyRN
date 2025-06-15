import { render } from "@testing-library/react-native";
import { useFonts } from "expo-font";
import React from "react";
import { useColorScheme } from "react-native";
// Layout
import RootLayout from "@/app/_layout";

// Mocks
jest.mock("@graphql/client", () => ({
  apolloClient: {},
}));

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true]),
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Stack: Object.assign(({ children }: any) => <>{children}</>, {
      Screen: ({ name }: any) => <Text>{name}</Text>,
    }),
  };
});

const mockThemeProvider = jest.fn();

jest.mock("@react-navigation/native", () => {
  const React = require("react");
  return {
    DarkTheme: { dark: true },
    DefaultTheme: { dark: false },
    ThemeProvider: ({ value, children }: any) => {
      mockThemeProvider(value); // <- capturamos el valor
      return <>{children}</>;
    },
  };
});

// Tests
describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with light theme", () => {
    const { getByText } = render(<RootLayout />);

    expect(getByText("(tabs)")).toBeTruthy();
    expect(getByText("+not-found")).toBeTruthy();

    expect(mockThemeProvider).toHaveBeenCalledWith({ dark: false });
  });

  it("renders correctly with dark theme", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    render(<RootLayout />);

    expect(mockThemeProvider).toHaveBeenCalledWith({ dark: true });
  });

  it("renders null when fonts are not loaded", () => {
    (useFonts as jest.Mock).mockReturnValue([false]);

    const { toJSON } = render(<RootLayout />);
    expect(toJSON()).toBeNull();
  });
});
