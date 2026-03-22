import { FaShareAlt } from "react-icons/fa";
import cl from "./LessonIntroBlock.module.css";

const LessonIntroBlock = ({
                            imageSrc,
                            imageAlt = "Lesson hero illustration",
                            description = "Decorators let you add extra behavior to a function without changing the function itself. In real Python, this is useful for logging, timing, access checks, caching, validation, and formatting output.",
                          }) => {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Tasty Python Lesson",
          text: "Check out this Python lesson",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Lesson link copied to clipboard");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

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
          <button
            type="button"
            className={cl.iconBtn}
            aria-label="Share lesson"
            onClick={handleShare}
          >
            <FaShareAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export default LessonIntroBlock;