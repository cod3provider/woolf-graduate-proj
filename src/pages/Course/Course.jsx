import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";

import CourseSidebar from "./components/CourseSidebar";
import CourseTopBar from "./components/CourseTopBar";
import lessonsData from "./data/lessonData";
import useCourseProgress from "./hooks/useCourseProgress";

import cl from "./Course.module.css";

const Course = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { progress, completeLesson, resetProgress } = useCourseProgress(
    lessonsData.length
  );

  const { lessonSlug } = useParams();
  const navigate = useNavigate();

  const { completedLessonIds, highestUnlockedLessonId } = progress;

  // TEMPORARY DEMO FLAG
  // Later replace with real user plan from backend / Firestore
  const hasProAccess = false;

  const { user, loading, openAuthModal } = useAuth();

  const baseLessons = useMemo(() => {
    return lessonsData.map((lesson) => {
      const isLockedByAccess = !lesson.isFree && !hasProAccess;

      let status = "locked";

      if (completedLessonIds.includes(lesson.id)) {
        status = "passed";
      } else if (!isLockedByAccess && lesson.id <= highestUnlockedLessonId) {
        status = "available";
      }

      return {
        ...lesson,
        status,
      };
    });
  }, [completedLessonIds, highestUnlockedLessonId, hasProAccess]);

  const accessibleLessons = baseLessons.filter(
    (lesson) => lesson.status !== "locked"
  );

  const firstOpenLesson =
    accessibleLessons.find((lesson) => lesson.status === "available") ||
    accessibleLessons[accessibleLessons.length - 1] ||
    baseLessons[0];

  const requestedLesson = baseLessons.find(
    (lesson) => lesson.slug === lessonSlug
  );

  const activeLesson =
    requestedLesson && requestedLesson.status !== "locked"
      ? requestedLesson
      : firstOpenLesson;

  const lessons = baseLessons.map((lesson) => ({
    ...lesson,
    status: lesson.id === activeLesson.id ? "active" : lesson.status,
  }));

  const activeLessonIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLesson.id
  );

  const nextAccessibleLesson = lessons
    .slice(activeLessonIndex + 1)
    .find((lesson) => lesson.status !== "locked");

  const previousAccessibleLesson = [...lessons]
    .slice(0, activeLessonIndex)
    .reverse()
    .find((lesson) => lesson.status !== "locked");

  const isLastAccessibleLesson = !nextAccessibleLesson;

  const ActiveLessonComponent = activeLesson.component;

  useEffect(() => {
    if (!lessonSlug || !requestedLesson || requestedLesson.status === "locked") {
      navigate(`/course/${activeLesson.slug}`, { replace: true });
    }
  }, [lessonSlug, requestedLesson, activeLesson.slug, navigate]);

  useEffect(() => {
  if (!loading && !user) {
    openAuthModal(lessonSlug ? `/course/${lessonSlug}` : "/course/closure");
    navigate("/", { replace: true });
  }
}, [user, loading, lessonSlug, navigate, openAuthModal]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [lessonSlug]);

  const handleLessonSelect = (lessonId) => {
    const targetLesson = lessons.find((lesson) => lesson.id === lessonId);

    if (!targetLesson || targetLesson.status === "locked") {
      return;
    }

    navigate(`/course/${targetLesson.slug}`);
  };

  const handlePreviousLesson = () => {
    if (!previousAccessibleLesson) return;
    navigate(`/course/${previousAccessibleLesson.slug}`);
  };

  const handleCompleteAndNext = () => {
    completeLesson(activeLesson.id);

    if (!nextAccessibleLesson) {
      return;
    }

    navigate(`/course/${nextAccessibleLesson.slug}`);
  };

  const handleResetProgress = () => {
    resetProgress();
    navigate("/course/closure");
  };

  return (
    <section className={cl.coursePage}>
      <div
        className={`${cl.overlay} ${isSidebarOpen ? cl.overlayVisible : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <CourseSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        lessons={lessons}
        onLessonSelect={handleLessonSelect}
        hasProAccess={hasProAccess}
      />

      <div className={cl.content}>
        <CourseTopBar
          setIsSidebarOpen={setIsSidebarOpen}
          moduleLabel={activeLesson.moduleLabel}
          lessonTitle={activeLesson.title}
        />

        <ActiveLessonComponent />

        <div className={cl.bottomNav}>
          <button
            type="button"
            className={cl.prevBtn}
            onClick={handlePreviousLesson}
            disabled={!previousAccessibleLesson}
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>

          <button
            type="button"
            className={cl.nextBtn}
            onClick={handleCompleteAndNext}
          >
            <span>
              {isLastAccessibleLesson ? "Mark as Completed" : "Complete & Next"}
            </span>
            {!isLastAccessibleLesson && <FaArrowRight />}
          </button>
        </div>

        <button
          type="button"
          className={cl.resetBtn}
          onClick={handleResetProgress}
        >
          Reset Progress
        </button>
      </div>
    </section>
  );
};

export default Course;