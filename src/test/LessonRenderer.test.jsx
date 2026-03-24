import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../pages/Course/blocks/LessonIntroBlock", () => ({
  default: () => <div data-testid="intro-block">Intro block</div>,
}));
vi.mock("../pages/Course/blocks/TheoryBlock", () => ({
  default: () => <div data-testid="theory-block">Theory block</div>,
}));
vi.mock("../pages/Course/blocks/CodeExampleBlock", () => ({
  default: () => <div data-testid="code-block">Code block</div>,
}));
vi.mock("../pages/Course/blocks/HowItWorksBlock", () => ({
  default: () => <div data-testid="how-block">How it works</div>,
}));
vi.mock("../pages/Course/blocks/DiagramBlock", () => ({
  default: () => <div data-testid="diagram-block">Diagram</div>,
}));
vi.mock("../pages/Course/blocks/CallsBlock", () => ({
  default: () => <div data-testid="calls-block">Calls</div>,
}));
vi.mock("../pages/Course/blocks/ExplanationBlock", () => ({
  default: () => <div data-testid="explanation-block">Explanation</div>,
}));
vi.mock("../pages/Course/blocks/PracticeSection", () => ({
  default: () => <div data-testid="practice-block">Practice</div>,
}));
vi.mock("../pages/Course/blocks/RealCodeBlock", () => ({
  default: () => <div data-testid="realcode-block">Real code</div>,
}));
vi.mock("../pages/Course/blocks/FinishingBlock", () => ({
  default: () => <div data-testid="finish-block">Finish</div>,
}));

import LessonRenderer from "../pages/Course/renderers/LessonRenderer"; 

describe("LessonRenderer", () => {
  it("renders blocks according to section types", () => {
    const sections = [
      { type: "intro", props: {} },
      { type: "theory", props: {} },
      { type: "practice", props: {} },
      { type: "unknown", props: {} },
    ];

    render(<LessonRenderer sections={sections} />);

    expect(screen.getByTestId("intro-block")).toBeInTheDocument();
    expect(screen.getByTestId("theory-block")).toBeInTheDocument();
    expect(screen.getByTestId("practice-block")).toBeInTheDocument();
  });
});