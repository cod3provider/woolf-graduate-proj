import LessonRenderer from "../../renderers/LessonRenderer";
import decoratorLessonData from "./decoratorLessonData";

const DecoratorLesson = () => {
  return <LessonRenderer sections={decoratorLessonData.sections} />;
};

export default DecoratorLesson;