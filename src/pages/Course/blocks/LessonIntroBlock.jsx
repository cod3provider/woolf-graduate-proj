import { FaBookmark, FaShareAlt } from "react-icons/fa";
import cl from "./LessonIntroBlock.module.css";

const LessonIntroBlock = ({
  imageSrc,
  imageAlt = "Lesson hero illustration",
  description = "Decorators let you add extra behavior to a function without changing the function itself. In real Python, this is useful for logging, timing, access checks, caching, validation, and formatting output.",
}) => {
  return (
    <>
      {imageSrc && (
        <div className={cl.imageBlock}>
          <img src={imageSrc} alt={imageAlt} className={cl.lessonImage} />
        </div>
      )}

      <div className={cl.lessonHeader}>
        <div>
          <p className={cl.lessonText}>{description}</p>
        </div>

        <div className={cl.iconButtons}>
          <button type="button" className={cl.iconBtn} aria-label="Save lesson">
            <FaBookmark />
          </button>
          <button type="button" className={cl.iconBtn} aria-label="Share lesson">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export default LessonIntroBlock;