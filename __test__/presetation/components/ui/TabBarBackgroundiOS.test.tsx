// BlurTabBarBackground.test.tsx
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { render } from "@testing-library/react-native";
import React from "react";
// Components
import BlurTabBarBackground, {
  useBottomTabOverflow,
} from "@components/ui/TabBarBackground.ios";

// Mock de expo-blur
jest.mock("expo-blur", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    BlurView: (props: any) => <View {...props} />,
  };
});

// Mock de useBottomTabBarHeight
jest.mock("@react-navigation/bottom-tabs", () => ({
  useBottomTabBarHeight: jest.fn(),
}));

describe("BlurTabBarBackground", () => {
  it("renders BlurView with correct props", () => {
    const { getByTestId } = render(<BlurTabBarBackground />);
    const blurView = getByTestId("blur-view");

    expect(blurView).toBeTruthy();
    expect(blurView.props.tint).toBe("systemChromeMaterial");
    expect(blurView.props.intensity).toBe(100);
    // Verifica que use StyleSheet.absoluteFill (un objeto)
    expect(blurView.props.style).toMatchObject({
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });
});

describe("useBottomTabOverflow", () => {
  it("returns the value from useBottomTabBarHeight", () => {
    (useBottomTabBarHeight as jest.Mock).mockReturnValue(42);
    const result = useBottomTabOverflow();
    expect(useBottomTabBarHeight).toHaveBeenCalled();
    expect(result).toBe(42);
  });
});
