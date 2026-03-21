import cl from "./TheoryBlock.module.css";

const TheoryBlock = ({
  badge = "Theory",
  title = "First of all, why do we call it a decorator?",
  paragraphs = [
    "Because it decorates a function.",
    "You already have the function itself — that is the main thing. Then you wrap something extra around it.",
    "A decorator is like building a burger.",
    "The patty is the original function: it does the main job.",
    "The top bun and bottom bun are the extra behavior around it: something happens before and after the main part.",
    "So the function stays the function — but now it comes with extra layers.",
    "In other words, the burger is still a burger. It just got promoted.",
    "Now, let's look at a decorator using a tasty metaphor.",
  ],
}) => {
  return (
    <section className={cl.theorySection}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>

      <div className={cl.textBlock}>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default TheoryBlock;