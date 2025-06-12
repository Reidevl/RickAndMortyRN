import { Colors } from "@constants/Colors";
import { useColorScheme } from "@hooks/useColorScheme";
import { useThemeColor } from "@hooks/useThemeColor";
import { renderHook } from "@testing-library/react-native";

// Mock useColorScheme
jest.mock("@hooks/useColorScheme", () => ({
  useColorScheme: jest.fn(),
}));

describe("useThemeColor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return light theme color when theme is light", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");

    const { result } = renderHook(() => useThemeColor({}, "background"));

    expect(result.current).toBe(Colors.light.background);
  });

  it("should return dark theme color when theme is dark", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");

    const { result } = renderHook(() => useThemeColor({}, "background"));

    expect(result.current).toBe(Colors.dark.background);
  });

  it("should return custom light color when provided in props", () => {
    (useColorScheme as jest.Mock).mockReturnValue("light");
    const customColor = "#FF0000";

    const { result } = renderHook(() =>
      useThemeColor({ light: customColor }, "background")
    );

    expect(result.current).toBe(customColor);
  });

  it("should return custom dark color when provided in props", () => {
    (useColorScheme as jest.Mock).mockReturnValue("dark");
    const customColor = "#000000";

    const { result } = renderHook(() =>
      useThemeColor({ dark: customColor }, "background")
    );

    expect(result.current).toBe(customColor);
  });

  it("should default to light theme when color scheme is null", () => {
    (useColorScheme as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useThemeColor({}, "background"));

    expect(result.current).toBe(Colors.light.background);
  });
});
