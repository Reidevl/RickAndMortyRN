import { fireEvent, render } from "@testing-library/react-native";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
// Components
import { ExternalLink } from "@components/ExternalLink";

// Mock expo-web-browser
jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
}));

// Mock Platform
jest.mock("react-native", () => ({
  Platform: {
    OS: "ios",
  },
}));

jest.mock("expo-router", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("ExternalLink", () => {
  const mockHref = "https://example.com";
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with href", () => {
    const { getByText } = render(
      <ExternalLink href={mockHref}>Test Link</ExternalLink>
    );
    const link = getByText("Test Link");
    expect(link).toBeTruthy();
    expect(link.props.href).toBe(mockHref);
  });

  it("opens browser on native platforms", async () => {
    const { getByText } = render(
      <ExternalLink href={mockHref}>Test Link</ExternalLink>
    );
    const link = getByText("Test Link");

    await fireEvent.press(link);

    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(mockHref);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it("uses default browser behavior on web platform", async () => {
    Platform.OS = "web";
    const { getByText } = render(
      <ExternalLink href={mockHref} onPress={mockOnPress}>
        Test Link
      </ExternalLink>
    );
    const link = getByText("Test Link");

    await fireEvent.press(link);

    expect(WebBrowser.openBrowserAsync).not.toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalled();
  });

  it("passes through additional props", () => {
    const { getByTestId } = render(
      <ExternalLink
        href={mockHref}
        testID="test-link"
        accessibilityLabel="Test Link"
      >
        Test Link
      </ExternalLink>
    );
    const link = getByTestId("test-link");
    expect(link.props.accessibilityLabel).toBe("Test Link");
  });
});
