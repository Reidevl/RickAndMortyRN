import { fireEvent, render } from "@testing-library/react-native";
import React, { act } from "react";
// Components
import { Selector } from "@components/Selector";

const OPTIONS = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

describe("Selector", () => {
  it("should render the selector component correctly", async () => {
    const { getByTestId } = render(
      <Selector
        label="Select"
        value="option1"
        options={OPTIONS}
        onSelect={jest.fn()}
      />
    );

    await act(async () => {
      fireEvent.press(getByTestId("selector"));
    });

    expect(getByTestId("selector")).toBeTruthy();
  });

  it("should open the modal and show options when pressed", async () => {
    const { getByTestId, getAllByTestId } = render(
      <Selector
        label="Select"
        value="option1"
        options={OPTIONS}
        onSelect={jest.fn()}
      />
    );

    await act(async () => {
      fireEvent.press(getByTestId("selector"));
    });

    const options = getAllByTestId("selector-option");
    expect(options.length).toBe(2);
  });

  it("should call onSelect and close the modal when an option is pressed", () => {
    const onSelect = jest.fn();
    const { getByTestId, getAllByTestId } = render(
      <Selector
        label="Select"
        value="option1"
        options={OPTIONS}
        onSelect={onSelect}
      />
    );

    act(() => {
      fireEvent.press(getByTestId("selector"));
    });

    const options = getAllByTestId("selector-option");
    act(() => {
      fireEvent.press(options[1]);
    });

    expect(onSelect).toHaveBeenCalledWith("option2");
  });
});
