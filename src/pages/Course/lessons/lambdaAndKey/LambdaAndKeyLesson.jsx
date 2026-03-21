import LessonRenderer from "../../renderers/LessonRenderer";
import lambdaAndKeyLessonData from "./lambdaAndKeyLessonData";

const LambdaAndKeyLesson = () => {
  return <LessonRenderer sections={lambdaAndKeyLessonData.sections} />;
};

export default LambdaAndKeyLesson;