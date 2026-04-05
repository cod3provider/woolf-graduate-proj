import { useEffect, useState } from "react";
import { api } from "@/services/api.js";

const useCourseProgress = (courseId) => {
  const [completedLessonIds, setCompletedLessonIds] = useState([]);

  useEffect(() => {
    if (!courseId) return;
    api.getCourseProgress(courseId)
      .then(data => setCompletedLessonIds(data.completed_lesson_ids))
      .catch(() => {});
  }, [courseId]);

  const completeLesson = async (lessonId) => {
    try {
      await api.completeLesson(lessonId);
      setCompletedLessonIds(prev =>
        prev.includes(lessonId) ? prev : [...prev, lessonId]
      );
    } catch (err) {
      console.error("Failed to complete lesson", err);
    }
  };

  return { completedLessonIds, completeLesson };
};

export default useCourseProgress;
