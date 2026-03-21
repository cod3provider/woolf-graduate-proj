import cl from "./FinishingBlock.module.css";

const FinishingBlock = ({
  badge = "Done",
  title = "Keep going!",
  paragraphs = [
    "You finished the decorator lesson. Now you know how decorators wrap functions, add extra behavior, and make code cleaner.",
    "Nice work — the original function still does its own job, and the decorator simply adds an extra layer around it.",
  ],
  imageSrc,
  imageAlt = "Lesson completed illustration",
}) => {
  return (
    <section className={cl.finishSection}>
      {imageSrc && (
        <div className={cl.finishImageWrap}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={cl.finishImage}
          />
        </div>
      )}

      <div className={cl.finishContent}>
        <span className={cl.finishBadge}>{badge}</span>
        <h2 className={cl.finishTitle}>{title}</h2>

        {paragraphs.map((paragraph, index) => (
          <p key={index} className={cl.finishText}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default FinishingBlock;