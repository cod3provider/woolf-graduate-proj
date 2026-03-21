import { FaCheck, FaLock } from "react-icons/fa";
import cl from "./CourseSidebar.module.css";

const CourseSidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  lessons,
  onLessonSelect,
}) => {
  const completedOrCurrentCount = lessons.filter(
    (lesson) => lesson.status === "passed" || lesson.status === "active"
  ).length;

  const progressPercent = Math.round(
    (completedOrCurrentCount / lessons.length) * 100
  );

  const handleLessonKeyDown = (e, lesson) => {
    if (lesson.status === "locked") return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onLessonSelect(lesson.id);
    }
  };

  return (
    <aside className={`${cl.sidebar} ${isSidebarOpen ? cl.sidebarOpen : ""}`}>
      <div className={cl.sidebarHeader}>
        <div>
          <h2 className={cl.sidebarTitle}>Tasty Python</h2>
          <p className={cl.sidebarSubtitle}>Course Progress</p>
        </div>

        <button
          type="button"
          className={cl.closeBtn}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className={cl.progressInfo}>
        <span>
          {completedOrCurrentCount} of {lessons.length} Lessons
        </span>
        <span>{progressPercent}%</span>
      </div>

      <div className={cl.progressBar}>
        <div
          className={cl.progressFill}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <ul className={cl.lessonList}>
        {lessons.map((lesson) => {
          const isLocked = lesson.status === "locked";

          return (
            <li
              key={lesson.id}
              className={`${cl.lessonItem} ${cl[lesson.status]}`}
              onClick={() => !isLocked && onLessonSelect(lesson.id)}
              onKeyDown={(e) => handleLessonKeyDown(e, lesson)}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              aria-disabled={isLocked}
              style={{ cursor: isLocked ? "not-allowed" : "pointer" }}
            >
              <div className={cl.lessonLeft}>
                <span className={cl.lessonIcon}>
                  {lesson.status === "passed" ? (
                    <FaCheck />
                  ) : lesson.status === "locked" ? (
                    <FaLock />
                  ) : (
                    <span className={cl.lessonDot}></span>
                  )}
                </span>

                <span>
                  {lesson.number || String(lesson.id).padStart(2, "0")}.{" "}
                  {lesson.title}
                </span>
              </div>

              {lesson.status === "active" && (
                <span className={cl.currentBadge}>Current</span>
              )}

              {lesson.status === "locked" && (
                <span className={cl.lockText}>Pro</span>
              )}
            </li>
          );
        })}
      </ul>

      <button type="button" className={cl.buyBtn}>
        Buy Full Course
      </button>

      <button type="button" className={cl.signOutBtn}>
        Sign Out
      </button>
    </aside>
  );
};

export default CourseSidebar;