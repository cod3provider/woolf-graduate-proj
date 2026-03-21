import PredictOutputSection from "./PredictOutputSection";
import FillMissingLineSection from "./FillMissingLineSection";
import FindMistakeSection from "./FindMistakeSection";
import ReorderLinesSection from "./ReorderLinesSection";
import CodingTasksSection from "./CodingTasksSection";

import cl from "./PracticeSection.module.css";

const PracticeSection = ({
  predictOutputProps = {},
  fillMissingLineProps = {},
  findMistakeProps = {},
  reorderLinesProps = {},
  codingTasksProps = {},
}) => {
  console.log("Practice props:", {
    predictOutputProps,
    fillMissingLineProps,
    findMistakeProps,
    reorderLinesProps,
    codingTasksProps,
  });

  return (
    <section className={cl.practiceSection}>
      <div className={cl.practiceInner}>
        <PredictOutputSection {...predictOutputProps} />
        <FillMissingLineSection {...fillMissingLineProps} />
        <FindMistakeSection {...findMistakeProps} />
        <ReorderLinesSection {...reorderLinesProps} />
        <CodingTasksSection {...codingTasksProps} />
      </div>
    </section>
  );
};

export default PracticeSection;