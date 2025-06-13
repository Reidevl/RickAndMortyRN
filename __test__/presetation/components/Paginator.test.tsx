import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
// Components
import { Paginator } from "@components/paginator";

describe("Paginator", () => {
  it("should render the paginator component correctly", () => {
    const { getByTestId } = render(
      <Paginator page={1} totalPages={1} onPageChange={jest.fn()} />
    );

    expect(getByTestId("paginator")).toBeTruthy();
  });

  it("should call onPageChange with page - 1 when pressing left", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={2} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-left"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should call onPageChange with totalPages when pressing forward", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={2} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-forward"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should call onPageChange with 1 when pressing backward", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={3} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-backward"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should call onPageChange with page + 1 when pressing right", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={2} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-right"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("should not call onPageChange if left button is disabled", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={1} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-left"));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("should not call onPageChange if right button is disabled", () => {
    const onPageChange = jest.fn();
    const { getByTestId } = render(
      <Paginator page={3} totalPages={3} onPageChange={onPageChange} />
    );

    fireEvent.press(getByTestId("paginator-right"));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
