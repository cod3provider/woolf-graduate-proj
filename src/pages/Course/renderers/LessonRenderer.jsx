import LessonIntroBlock from "../blocks/LessonIntroBlock";
import TheoryBlock from "../blocks/TheoryBlock";
import CodeExampleBlock from "../blocks/CodeExampleBlock";
import HowItWorksBlock from "../blocks/HowItWorksBlock";
import DiagramBlock from "../blocks/DiagramBlock";
import CallsBlock from "../blocks/CallsBlock";
import ExplanationBlock from "../blocks/ExplanationBlock";
import PracticeSection from "../blocks/PracticeSection";
import RealCodeBlock from "../blocks/RealCodeBlock";
import FinishingBlock from "../blocks/FinishingBlock";

const blockMap = {
  intro: LessonIntroBlock,
  theory: TheoryBlock,
  codeExample: CodeExampleBlock,
  howItWorks: HowItWorksBlock,
  diagram: DiagramBlock,
  calls: CallsBlock,
  explanation: ExplanationBlock,
  practice: PracticeSection,
  realCode: RealCodeBlock,
  finishing: FinishingBlock,
};

const LessonRenderer = ({ sections }) => {
  return (
    <>
      {sections.map((section, index) => {
        const BlockComponent = blockMap[section.type];

        if (!BlockComponent) return null;

        return (
          <BlockComponent
            key={`${section.type}-${index}`}
            {...(section.props || {})}
          />
        );
      })}
    </>
  );
};

export default LessonRenderer;