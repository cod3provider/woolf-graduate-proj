import cl from "./HowItWorksBlock.module.css";

const HowItWorksBlock = ({
  badge = "In plain words",
  title = "How it works",
  steps = [
    "burger_style(func) runs once and takes the original function.",
    "Inside it, Python creates the inner function wrapper().",
    "wrapper() prints the top bun, then calls the original function, then prints the bottom bun.",
    "burger_style returns the wrapper function, so the original function gets replaced with the wrapped version.",
    "When you call make_burger() later, you are actually calling the wrapped version.",
  ],
}) => {
  return (
    <section className={cl.explainSection}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>

      <div className={cl.explainList}>
        {steps.map((step, index) => (
          <div key={index} className={cl.explainItem}>
            <span className={cl.explainBullet}></span>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksBlock;