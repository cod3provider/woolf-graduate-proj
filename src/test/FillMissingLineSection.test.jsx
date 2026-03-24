import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("react-syntax-highlighter", () => ({
  Prism: ({ children }) => <pre>{children}</pre>,
}));

vi.mock("react-syntax-highlighter/dist/esm/styles/prism", () => ({
  oneLight: {},
}));

import FillMissingLineSection from "../pages/Course/blocks/FillMissingLineSection";

const tasks = [
  {
    id: 1,
    code: `def make_sauce(kind):
    def pour(dish):
        return f"{dish} with {kind}"
    ______`,
    question: "Choose the missing line:",
    options: {
      A: "return pour",
      B: "return pour()",
      C: "return sauce",
    },
    correct: "A",
  },
];

describe("FillMissingLineSection", () => {
  it("enables check button after selecting an option and shows correct feedback", async () => {
    const user = userEvent.setup();

    render(<FillMissingLineSection tasks={tasks} />);

    const checkButton = screen.getByRole("button", { name: /check answer/i });
    expect(checkButton).toBeDisabled();

    const correctOptionText = screen.getByText("return pour");
    const correctOptionButton = correctOptionText.closest("button");
    await user.click(correctOptionButton);

    expect(checkButton).toBeEnabled();

    await user.click(checkButton);

    expect(screen.getByText(/correct!/i)).toBeInTheDocument();
  });

  it("shows wrong feedback when user selects the wrong answer", async () => {
    const user = userEvent.setup();

    render(<FillMissingLineSection tasks={tasks} />);

    const wrongOptionText = screen.getByText("return pour()");
    const wrongOptionButton = wrongOptionText.closest("button");
    await user.click(wrongOptionButton);

    await user.click(screen.getByRole("button", { name: /check answer/i }));

    expect(screen.getByText(/not quite/i)).toBeInTheDocument();
    expect(screen.getByText(/correct answer: A/i)).toBeInTheDocument();
  });
});