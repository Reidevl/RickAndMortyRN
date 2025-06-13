import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
// Components
import { SearchInput } from "@components/ui/SearchInput";

// Mock the IconSymbol component to avoid state updates
jest.mock("@components/ui/IconSymbol", () => ({
  IconSymbol: () => null,
}));

describe("SearchInput", () => {
  const mockOnChangeText = jest.fn();
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    value: "",
    onChangeText: mockOnChangeText,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with default props", async () => {
    const { getByPlaceholderText } = render(<SearchInput {...defaultProps} />);
    expect(getByPlaceholderText("Search by name")).toBeTruthy();
  });

  it("should render with custom placeholder", async () => {
    const customPlaceholder = "Custom search...";
    const { getByPlaceholderText } = render(
      <SearchInput {...defaultProps} placeholder={customPlaceholder} />
    );
    expect(getByPlaceholderText(customPlaceholder)).toBeTruthy();
  });

  it("should call onChangeText when text is entered", async () => {
    const testText = "test search";
    const { getByPlaceholderText } = render(<SearchInput {...defaultProps} />);
    
    const input = getByPlaceholderText("Search by name");
    fireEvent.changeText(input, testText);
    
    expect(mockOnChangeText).toHaveBeenCalledWith(testText);
  });

  it("should call onSubmit when search is submitted", async () => {
    const testText = "test search";
    const { getByPlaceholderText } = render(
      <SearchInput {...defaultProps} value={testText} />
    );
    
    const input = getByPlaceholderText("Search by name");
    fireEvent(input, "submitEditing", { nativeEvent: { text: testText } });
    
    expect(mockOnSubmit).toHaveBeenCalledWith(testText);
  });

  it("should render with custom colors", async () => {
    const lightColor = "#000000";
    const darkColor = "#FFFFFF";
    const { getByPlaceholderText } = render(
      <SearchInput
        {...defaultProps}
        lightColor={lightColor}
        darkColor={darkColor}
      />
    );
    
    const input = getByPlaceholderText("Search by name");
    expect(input.props.style).toContainEqual(expect.objectContaining({ color: expect.any(String) }));
  });
}); 