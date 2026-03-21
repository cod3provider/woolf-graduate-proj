import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

  const baseLessons = lessonsData.map((lesson) => {
    let status = "locked";

    if (completedLessonIds.includes(lesson.id)) {
      status = "passed";
    } else if (lesson.id <= highestUnlockedLessonId) {
      status = "available";
    }

    return {
      ...lesson,
      status,
    };
  });

  const firstOpenLesson =
    baseLessons.find((lesson) => lesson.status === "available") ||
    baseLessons[baseLessons.length - 1];

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

  const previousLesson = lessons[activeLessonIndex - 1];
  const nextLesson = lessons[activeLessonIndex + 1];
  const isLastLesson = activeLessonIndex === lessons.length - 1;

  const ActiveLessonComponent = activeLesson.component;

  useEffect(() => {
    if (!lessonSlug || !requestedLesson || requestedLesson.status === "locked") {
      navigate(`/course/${activeLesson.slug}`, { replace: true });
    }
  }, [lessonSlug, requestedLesson, activeLesson.slug, navigate]);

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
    if (!previousLesson) return;
    navigate(`/course/${previousLesson.slug}`);
  };

  const handleCompleteAndNext = () => {
    completeLesson(activeLesson.id);

    if (!nextLesson) {
      return;
    }

    navigate(`/course/${nextLesson.slug}`);
  };

  const handleResetProgress = () => {
    resetProgress();
    navigate("/course/decorator");
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
            disabled={!previousLesson}
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>

          <button
            type="button"
            className={cl.nextBtn}
            onClick={handleCompleteAndNext}
          >
            <span>{isLastLesson ? "Mark as Completed" : "Complete & Next"}</span>
            {!isLastLesson && <FaArrowRight />}
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