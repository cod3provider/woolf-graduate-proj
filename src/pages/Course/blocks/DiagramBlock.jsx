import cl from "./DiagramBlock.module.css";

const DiagramBlock = ({ burgerCard }) => {
  return (
    <div className={cl.diagramBlock}>
      <img
        src={burgerCard}
        alt="Decorator explanation illustration"
        className={cl.diagramImage}
      />
    </div>
  );
};

export default DiagramBlock;