import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import PaymentModal from "./components/payment/PaymentModal/PaymentModal";
import { useAuth } from "../../context/AuthContext.jsx";

import CourseSidebar from "./components/CourseSidebar";
import CourseTopBar from "./components/CourseTopBar";
import useCourseProgress from "./hooks/useCourseProgress";
import useProAccess from "./hooks/useProAccess";

import cl from "./Course.module.css";
import { api } from "@/services/api.js";
import LessonRenderer from "@pages/Course/renderers/LessonRenderer.jsx";

const AVATAR_STORAGE_KEY = "tasty-python-avatar-color";
const AVATAR_MODE_STORAGE_KEY = "tasty-python-avatar-mode";

const Course = () => {
  const { courseSlug, lessonSlug } = useParams();
  const navigate = useNavigate();

  const [dbLessons, setDbLessons] = useState([]);
  const [currentFullLesson, setCurrentFullLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, loading: authLoading, openAuthModal } = useAuth();
  const { hasProAccess, grantProAccess } = useProAccess();
  const courseId = dbLessons[0]?.course_id ?? null;
  const { completedLessonIds, completeLesson } = useCourseProgress(courseId);

  const userInitial =
    user?.displayName?.trim()?.charAt(0)?.toUpperCase() ||
    user?.email?.trim()?.charAt(0)?.toUpperCase() ||
    "U";
  const userPhoto = user?.photoURL || "";
  const avatarMode = localStorage.getItem(AVATAR_MODE_STORAGE_KEY) || (userPhoto ? "photo" : "initial");
  const avatarColor = localStorage.getItem(AVATAR_STORAGE_KEY) || "#f4af25";

  useEffect(() => {
    if (authLoading || !user || !courseSlug) return;

    const fetchLessons = async () => {
      try {
        setIsLoading(true);
        const data = await api.getCourseLessonsBySlug(courseSlug);
        setDbLessons(data);
      } catch (err) {
        console.error("Error fetching course lessons", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [courseSlug, user, authLoading]);

  useEffect(() => {
    if (!lessonSlug || dbLessons.length === 0) return;

    const fetchFullLesson = async () => {
      try {
        const data = await api.getFullLesson(courseSlug, lessonSlug);
        setCurrentFullLesson(data);
      } catch (err) {
        console.error("Error fetching lesson content", err);
      }
    };
    fetchFullLesson();
  }, [courseSlug, lessonSlug, dbLessons]);

  const lessons = useMemo(() => {
    const lastCompletedIndex = dbLessons.reduce(
      (max, l, i) => (completedLessonIds.includes(l.id) ? Math.max(max, i) : max),
      -1
    );

    return dbLessons.map((lesson, index) => {
      const isLockedByAccess = !lesson.is_free && !hasProAccess;
      let status = "locked";

      const isCompleted = completedLessonIds.includes(lesson.id);

      if (isCompleted) {
        status = "passed";
      } else if (!isLockedByAccess && (lesson.is_free || index <= lastCompletedIndex + 2)) {
        status = "available";
      }

      if (lesson.slug === lessonSlug) status = "active";

      return { ...lesson, status, isCompleted };
    });
  }, [dbLessons, completedLessonIds, hasProAccess, lessonSlug]);

  const activeLessonIndex = lessons.findIndex(l => l.slug === lessonSlug);
  const activeLesson = lessons[activeLessonIndex] ?? dbLessons[0];

  const nextLesson = lessons.slice(activeLessonIndex + 1).find(l => l.status !== 'locked');
  const prevLesson = [...lessons].slice(0, activeLessonIndex).reverse().find(l => l.status !== 'locked');

  useEffect(() => {
    if (!isLoading && dbLessons.length > 0 && !lessonSlug) {
      navigate(`/course/${courseSlug}/${dbLessons[0].slug}`, { replace: true });
    }
  }, [isLoading, dbLessons, lessonSlug, courseSlug, navigate]);

  useEffect(() => {
    if (!authLoading && !user) {
      openAuthModal(`/course/${courseSlug}/${lessonSlug || ""}`);
      navigate("/", { replace: true });
    }
  }, [user, authLoading, lessonSlug, courseSlug, navigate, openAuthModal]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [lessonSlug]);

  const handleLessonSelect = (lessonId) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || lesson.status === 'locked') return;
    navigate(`/course/${courseSlug}/${lesson.slug}`);
  };

  if (isLoading || !activeLesson) {
    return <div className={cl.loader}>Loading course...</div>;
  }

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
        onUpgradeClick={() => setIsPaymentModalOpen(true)}
      />

      <div className={cl.content}>
        <CourseTopBar
          setIsSidebarOpen={setIsSidebarOpen}
          moduleLabel={courseSlug?.toUpperCase()}
          lessonTitle={activeLesson.title}
          hasProAccess={hasProAccess}
          onUpgradeClick={() => setIsPaymentModalOpen(true)}
          userInitial={userInitial}
          userPhoto={userPhoto}
          avatarMode={avatarMode}
          avatarColor={avatarColor}
        />

        {currentFullLesson ? (
          <LessonRenderer lesson={currentFullLesson} />
        ) : (
          <div className={cl.loader}>Loading lesson content...</div>
        )}

        <div className={cl.bottomNav}>
          <button
            type="button"
            className={cl.prevBtn}
            onClick={() => prevLesson && navigate(`/course/${courseSlug}/${prevLesson.slug}`)}
            disabled={!prevLesson}
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>

          <button
            type="button"
            className={`${cl.nextBtn} ${completedLessonIds.includes(activeLesson.id) && !nextLesson ? cl.nextBtnDone : ''}`}
            onClick={() => {
              completeLesson(activeLesson.id);
              if (nextLesson) navigate(`/course/${courseSlug}/${nextLesson.slug}`);
            }}
            disabled={completedLessonIds.includes(activeLesson.id) && !nextLesson}
          >
            <span>
              {completedLessonIds.includes(activeLesson.id) && !nextLesson
                ? "Completed!"
                : !nextLesson
                ? "Mark as Completed"
                : "Complete & Next"}
            </span>
            {nextLesson && <FaArrowRight />}
          </button>
        </div>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={grantProAccess}
        />
      </div>
    </section>
  );
};

export default Course;
