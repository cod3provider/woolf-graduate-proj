import LessonRenderer from "../../renderers/LessonRenderer";
import closureLessonData from "./closureLessonData";

const ClosureLesson = () => {
  return <LessonRenderer sections={closureLessonData.sections} />;
};

export default ClosureLesson;