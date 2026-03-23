import { FaBars } from "react-icons/fa";
import cl from "./CourseTopBar.module.css";

const CourseTopBar = ({
  setIsSidebarOpen,
  moduleLabel = "",
  lessonTitle = "",
  hasProAccess = false,
  onUpgradeClick,
  userInitial = "U",
  userPhoto = "",
  avatarMode = "initial",
  avatarColor = "#f4af25",
}) => {
  const shouldShowPhoto = avatarMode === "photo" && !!userPhoto;

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
        {!hasProAccess && (
          <button
            type="button"
            className={cl.smallBuyBtn}
            onClick={onUpgradeClick}
          >
            Buy Course
          </button>
        )}

        <div
          className={cl.avatar}
          style={!shouldShowPhoto ? { backgroundColor: avatarColor } : undefined}
          aria-label="User avatar"
        >
          {shouldShowPhoto ? (
            <img
              src={userPhoto}
              alt="User avatar"
              className={cl.avatarImage}
            />
          ) : (
            userInitial
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTopBar;