import { render } from "@testing-library/react-native";
// Component
import EpisodesLayout from "@/app/(tabs)/(episodes)/_layout";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "tabs.episodes": "Episodes",
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

describe("EpisodesLayout", () => {
  it("should render the episodes layout correctly", () => {
    const { getByText } = render(<EpisodesLayout />);
    expect(getByText("Episodes")).toBeTruthy();
  });
});
