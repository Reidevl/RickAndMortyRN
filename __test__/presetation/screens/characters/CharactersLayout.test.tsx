import { render } from "@testing-library/react-native";
// Component
import CharactersLayout from "@/app/(tabs)/(characters)/_layout";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "tabs.characters": "Characters",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Stack: Object.assign(({ children }: any) => <>{children}</>, {
      Screen: ({ options }: any) => (
        <>{options?.title && <Text>{options.title}</Text>}</>
      ),
    }),
  };
});

describe("CharactersLayout", () => {
  it("should render the characters layout correctly", () => {
    const { getByText } = render(<CharactersLayout />);
    expect(getByText("Characters")).toBeTruthy();
  });
});
