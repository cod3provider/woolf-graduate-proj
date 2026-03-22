import {NavLink} from "react-router-dom";
import {FaCheck, FaHome, FaLock, FaRegUserCircle} from "react-icons/fa";

import {useAuth} from "@context/AuthContext.jsx";

import cl from "./CourseSidebar.module.css";
import {PiStudentBold} from "react-icons/pi";

const CourseSidebar = ({
                         isSidebarOpen,
                         setIsSidebarOpen,
                         lessons,
                         onLessonSelect,
                         hasProAccess = false,
                       }) => {
  const {logOut} = useAuth();

  const completedOrCurrentCount = lessons.filter(
    (lesson) => lesson.status === "passed" || lesson.status === "active"
  ).length;

  const progressPercent = Math.round(
    (completedOrCurrentCount / lessons.length) * 100
  );

  const handleLessonKeyDown = (e, lesson, isLocked) => {
    if (isLocked) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onLessonSelect(lesson.id);
    }
  };

  return (
    <aside className={`${cl.sidebar} ${isSidebarOpen ? cl.sidebarOpen : ""}`}>
      <nav className={cl.sideNav}>
        <ul className={cl.sideNavList}>
          <li>
            <NavLink
              className={({isActive}) =>
                `${cl.link} ${isActive ? cl.active : ""}`
              }
              to="/"
            >
              <FaHome />
              <p className={cl.sideNavText}>
                Home
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({isActive}) =>
                `${cl.link} ${isActive ? cl.active : ""}`
              }
              to="/"
            >
              <PiStudentBold />
              <p className={cl.sideNavText}>
                Courses
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({isActive}) =>
                `${cl.link} ${isActive ? cl.active : ""}`
              }
              to="/"
            >
              <FaRegUserCircle />
              <p className={cl.sideNavText}>
                Account
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>

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
          style={{width: `${progressPercent}%`}}
        ></div>
      </div>

      <ul className={cl.lessonList}>
        {lessons.map((lesson) => {
          const isLocked = !lesson.isFree && !hasProAccess;

          return (
            <li
              key={lesson.id}
              className={`${cl.lessonItem} ${cl[lesson.status] || ""} ${
                isLocked ? cl.locked : ""
              }`}
              onClick={() => !isLocked && onLessonSelect(lesson.id)}
              onKeyDown={(e) => handleLessonKeyDown(e, lesson, isLocked)}
              role="button"
              tabIndex={isLocked ? -1 : 0}
              aria-disabled={isLocked}
              style={{cursor: isLocked ? "not-allowed" : "pointer"}}
            >
              <div className={cl.lessonLeft}>
                <span className={cl.lessonIcon}>
                  {lesson.status === "passed" ? (
                    <FaCheck/>
                  ) : isLocked ? (
                    <FaLock/>
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

              {isLocked && <span className={cl.lockText}>Pro</span>}
            </li>
          );
        })}
      </ul>

      {!hasProAccess && (
        <button type="button" className={cl.buyBtn}>
          Buy Full Course
        </button>
      )}


    </aside>
  );
};

export default CourseSidebar;