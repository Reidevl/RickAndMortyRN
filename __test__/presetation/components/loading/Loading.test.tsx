import { render } from "@testing-library/react-native";
import React from "react";
// Components
import { Loading } from "@components/loading";

describe("Loading", () => {
  it("should render the loading component correctly", () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId("loading")).toBeTruthy();
  });
});
