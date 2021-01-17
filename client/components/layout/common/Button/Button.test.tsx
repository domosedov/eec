import { render } from "@testing-library/react";
import Button from "./index";

test("Render button component", () => {
  const { getByText } = render(<Button>Hello</Button>);
  const buttonText = getByText(/Hello/);
  expect(buttonText).toBeInTheDocument();
});
