import { FaBars } from "react-icons/fa";
import cl from "./CourseTopBar.module.css";

const CourseTopBar = ({
  setIsSidebarOpen,
  moduleLabel = "",
  lessonTitle = "",
}) => {
  return (
    <div className={cl.topBar}>
      <div className={cl.topBarLeft}>
        <button
          type="button"
          className={cl.menuBtn}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        <div>
          <p className={cl.moduleLabel}>{moduleLabel}</p>
          <h1 className={cl.moduleTitle}>{lessonTitle}</h1>
        </div>
      </div>

      <div className={cl.topActions}>
        <button type="button" className={cl.smallBuyBtn}>
          Buy Course
        </button>
        <div className={cl.avatar}>E</div>
      </div>
    </div>
  );
};

export default CourseTopBar;