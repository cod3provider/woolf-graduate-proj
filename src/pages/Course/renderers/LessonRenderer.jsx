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
  realCode: RealCodeBlock,
  finishing: FinishingBlock,
};

const buildPracticeProps = (tasks = []) => ({
  codingTasksProps:    { tasks: tasks.filter(t => t.task_type === 'code_check') },
  predictOutputProps:  { tasks: tasks.filter(t => t.task_type === 'multiple_choice') },
  reorderLinesProps:   { tasks: tasks.filter(t => t.task_type === 'reorder_lines') },
  fillMissingLineProps: { tasks: [] },
  findMistakeProps:    { tasks: [] },
});

const LessonRenderer = ({ lesson }) => {
  const sections = lesson?.sections || [];

  if (sections.length === 0) {
    return <div style={{padding: '20px'}}>This lesson has no content yet.</div>;
  }

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === 'practice') {
          return (
            <PracticeSection
              key={`practice-${index}`}
              {...buildPracticeProps(section.content?.tasks)}
            />
          );
        }

        const BlockComponent = blockMap[section.type];
        if (!BlockComponent) return null;

        return (
          <BlockComponent
            key={`${section.type}-${index}`}
            {...(section.content || {})}
          />
        );
      })}
    </>
  );
};

export default LessonRenderer;