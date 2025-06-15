import { render } from "@testing-library/react-native";
// Component
import TabLayout from "@/app/(tabs)/_layout";
// Hooks
import { useColorScheme } from "@hooks/useColorScheme";

jest.mock("@hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "tabs.characters": "Characters",
        "tabs.episodes": "Episodes",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@hooks/useThemeColor", () => ({
  useThemeColor: jest.fn(() => "#000"),
}));

jest.mock("@hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

jest.mock("expo-router", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Tabs: Object.assign(
      ({ children, screenOptions }: any) => {
        if (screenOptions) {
          (global as any).capturedScreenOptions = screenOptions;
        }
        return <>{children}</>;
      },
      {
        Screen: ({ options }: any) => {
          return (
            <>
              {options?.title && <Text>{options.title}</Text>}
              {options?.tabBarIcon?.({
                color: "#000",
                focused: true,
                size: 28,
              })}
            </>
          );
        },
      }
    ),
  };
});

describe("TabLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).capturedScreenOptions = null;
  });

  it("should render the tab layout correctly", () => {
    const { getByText } = render(<TabLayout />);

    expect(getByText("Characters")).toBeTruthy();
    expect(getByText("Episodes")).toBeTruthy();
  });

  it("should use light theme colors when colorScheme is light", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    render(<TabLayout />);

    expect((global as any).capturedScreenOptions.tabBarActiveTintColor).toBe(
      "#0a7ea4"
    );
  });

  it("should use dark theme colors when colorScheme is dark", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    render(<TabLayout />);

    expect((global as any).capturedScreenOptions.tabBarActiveTintColor).toBe(
      "#fff"
    );
  });

  it("should default to light theme when colorScheme is undefined", () => {
    (useColorScheme as jest.Mock).mockReturnValue(undefined);

    render(<TabLayout />);

    expect((global as any).capturedScreenOptions.tabBarActiveTintColor).toBe(
      "#0a7ea4"
    );
  });
});
