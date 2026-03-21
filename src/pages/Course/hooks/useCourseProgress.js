import { useEffect, useState } from "react";

const COURSE_PROGRESS_KEY = "python-course-progress";

const createDefaultProgress = () => ({
  completedLessonIds: [1],
  highestUnlockedLessonId: 3,
});

const getInitialProgress = () => {
  try {
    const savedProgress = localStorage.getItem(COURSE_PROGRESS_KEY);

    if (!savedProgress) {
      return createDefaultProgress();
    }

    const parsedProgress = JSON.parse(savedProgress);

    return {
      completedLessonIds: Array.isArray(parsedProgress.completedLessonIds)
        ? parsedProgress.completedLessonIds
        : [1],
      highestUnlockedLessonId:
        typeof parsedProgress.highestUnlockedLessonId === "number"
          ? parsedProgress.highestUnlockedLessonId
          : 3,
    };
  } catch (error) {
    return createDefaultProgress();
  }
};

const useCourseProgress = (lessonsCount) => {
  const [progress, setProgress] = useState(getInitialProgress);

  useEffect(() => {
    localStorage.setItem(COURSE_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId) => {
    setProgress((prev) => {
      const updatedCompletedLessonIds = prev.completedLessonIds.includes(
        lessonId
      )
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];

      const updatedHighestUnlockedLessonId = Math.max(
        prev.highestUnlockedLessonId,
        Math.min(lessonsCount, lessonId + 2)
      );

      return {
        completedLessonIds: updatedCompletedLessonIds,
        highestUnlockedLessonId: updatedHighestUnlockedLessonId,
      };
    });
  };

  const resetProgress = () => {
    setProgress(createDefaultProgress());
  };

  return {
    progress,
    completeLesson,
    resetProgress,
  };
};

export default useCourseProgress;