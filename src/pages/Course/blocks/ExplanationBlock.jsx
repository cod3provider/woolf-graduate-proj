import cl from "./ExplanationBlock.module.css";

const ExplanationBlock = ({
  badge = "Explanation",
  title = "What is happening here?",
  items = [
    "@burger_style means that make_burger is passed into the decorator and replaced with the wrapped version.",
    'make_burger("white", "chicken") → the wrapper runs first, prints "Top white bun", then calls the original function, which prints "chicken patty" inside, then prints "Bottom white bun".',
    'make_burger("brown", "beef") → works the same way, but now with "brown" and "beef".',
    'make_burger("white", "pork") → again, the decorator adds the top and bottom bun, while the original function provides the patty inside.',
    "So the decorator adds extra behavior around the original function, like wrapping the filling inside the bun.",
  ],
}) => {
  return (
    <section className={cl.explanationSection}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>

      <div className={cl.explanationList}>
        {items.map((item, index) => (
          <div key={index} className={cl.explanationItem}>
            <span className={cl.explanationDot}></span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExplanationBlock;