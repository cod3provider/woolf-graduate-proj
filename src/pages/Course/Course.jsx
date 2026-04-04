import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import PaymentModal from "./components/payment/PaymentModal/PaymentModal";
import { useAuth } from "../../context/AuthContext.jsx";

import CourseSidebar from "./components/CourseSidebar";
import CourseTopBar from "./components/CourseTopBar";
import lessonsData from "./data/lessonData";
import useCourseProgress from "./hooks/useCourseProgress";
import useProAccess from "./hooks/useProAccess";

import cl from "./Course.module.css";

const AVATAR_STORAGE_KEY = "tasty-python-avatar-color";
const AVATAR_MODE_STORAGE_KEY = "tasty-python-avatar-mode";

const Course = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { progress, completeLesson, resetProgress } = useCourseProgress(
    lessonsData.length
  );

  const { hasProAccess, grantProAccess } = useProAccess();
  const { user, loading, openAuthModal } = useAuth();

  const { lessonSlug } = useParams();
  const navigate = useNavigate();

  const { completedLessonIds, highestUnlockedLessonId } = progress;

  const userInitial =
    user?.displayName?.trim()?.charAt(0)?.toUpperCase() ||
    user?.email?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  const userPhoto = user?.photoURL || "";

  const avatarMode =
    localStorage.getItem(AVATAR_MODE_STORAGE_KEY) ||
    (userPhoto ? "photo" : "initial");

  const avatarColor =
    localStorage.getItem(AVATAR_STORAGE_KEY) || "#f4af25";

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
        onUpgradeClick={() => setIsPaymentModalOpen(true)}
      />

      <div className={cl.content}>
        <CourseTopBar
          setIsSidebarOpen={setIsSidebarOpen}
          moduleLabel={activeLesson.moduleLabel}
          lessonTitle={activeLesson.title}
          hasProAccess={hasProAccess}
          onUpgradeClick={() => setIsPaymentModalOpen(true)}
          userInitial={userInitial}
          userPhoto={userPhoto}
          avatarMode={avatarMode}
          avatarColor={avatarColor}
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

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={grantProAccess}
        />

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




// import { useMemo, useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
//
// import PaymentModal from "./components/payment/PaymentModal/PaymentModal";
// import { useAuth } from "../../context/AuthContext.jsx";
//
//
// import CourseSidebar from "./components/CourseSidebar";
// import CourseTopBar from "./components/CourseTopBar";
//
// import useCourseProgress from "./hooks/useCourseProgress";
// import useProAccess from "./hooks/useProAccess";
//
// import cl from "./Course.module.css";
// import {api} from "@/services/api.js";
// import LessonRenderer from "@pages/Course/renderers/LessonRenderer.jsx";
//
// const Course = () => {
//   const { courseSlug, lessonSlug } = useParams();
//   const navigate = useNavigate();
//
//   const [dbLessons, setDbLessons] = useState([]); // Уроки из базы
//   const [currentFullLesson, setCurrentFullLesson] = useState(null); // Полный контент урока
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//
//   const { user, loading: authLoading, openAuthModal } = useAuth();
//   const { hasProAccess, grantProAccess } = useProAccess();
//
//   // Прогресс теперь зависит от длины списка из БД
//   const { progress, completeLesson, resetProgress } = useCourseProgress(dbLessons.length);
//   const { completedLessonIds, highestUnlockedLessonId } = progress;
//
//
//   useEffect(() => {
//     if (authLoading) return;
//
//     if (!user) return;
//
//     if (!courseSlug || courseSlug === "undefined") return;
//
//     const fetchLessons = async () => {
//       try {
//         setIsLoading(true);
//         const data = await api.getCourseLessonsBySlug(courseSlug);
//         setDbLessons(data);
//       } catch (err) {
//         console.error("Error fetching course lessons", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLessons();
//   }, [courseSlug, user, authLoading]);
//
//
//   useEffect(() => {
//     if (!lessonSlug || dbLessons.length === 0) return;
//
//     const fetchFullLesson = async () => {
//       try {
//         const data = await api.getFullLesson(courseSlug, lessonSlug);
//         setCurrentFullLesson(data);
//       } catch (err) {
//         console.error("Error fetching lesson content", err);
//       }
//     };
//     fetchFullLesson();
//   }, [courseSlug, lessonSlug, dbLessons]);
//
//
//   const lessons = useMemo(() => {
//     return dbLessons.map((lesson) => {
//       const isLockedByAccess = !lesson.is_free && !hasProAccess;
//       let status = "locked";
//
//       if (completedLessonIds.includes(lesson.id)) {
//         status = "passed";
//       } else if (!isLockedByAccess && (lesson.id <= highestUnlockedLessonId || lesson.is_free)) {
//         status = "available";
//       }
//
//       if (lesson.slug === lessonSlug) status = "active";
//
//       return { ...lesson, status };
//     });
//   }, [dbLessons, completedLessonIds, highestUnlockedLessonId, hasProAccess, lessonSlug]);
//
//   const activeLessonIndex = lessons.findIndex(l => l.slug === lessonSlug);
//   const activeLesson = lessons[activeLessonIndex] || dbLessons[0];
//
//   const nextLesson = lessons[activeLessonIndex + 1];
//   const prevLesson = lessons[activeLessonIndex - 1];
//
//   useEffect(() => {
//     if (!isLoading && dbLessons.length > 0 && !lessonSlug) {
//       navigate(`/course/${courseSlug}/${dbLessons[0].slug}`, { replace: true });
//     }
//   }, [isLoading, dbLessons, lessonSlug, courseSlug, navigate]);
//
//
//   useEffect(() => {
//     if (!authLoading && !user) {
//       openAuthModal(`/course/${courseSlug}/${lessonSlug || ""}`);
//       navigate("/", { replace: true });
//     }
//   }, [user, authLoading, lessonSlug, courseSlug, navigate, openAuthModal]);
//
//   const handleLessonSelect = (slug) => {
//     navigate(`/course/${courseSlug}/${slug}`);
//     setIsSidebarOpen(false);
//   };
//
//   if (isLoading || !activeLesson) return <div className={cl.loader}>Loading course...</div>;
//
//   return (
//     <section className={cl.coursePage}>
//       <div className={`${cl.overlay} ${isSidebarOpen ? cl.overlayVisible : ""}`} onClick={() => setIsSidebarOpen(false)} />
//
//       <CourseSidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//         lessons={lessons}
//         onLessonSelect={(id) => {
//           const l = lessons.find(all => all.id === id);
//           if (l && l.status !== 'locked') handleLessonSelect(l.slug);
//         }}
//         hasProAccess={hasProAccess}
//         onUpgradeClick={() => setIsPaymentModalOpen(true)}
//       />
//
//       <div className={cl.content}>
//         <CourseTopBar
//           setIsSidebarOpen={setIsSidebarOpen}
//           moduleLabel={courseSlug.toUpperCase()}
//           lessonTitle={activeLesson.title}
//           hasProAccess={hasProAccess}
//           onUpgradeClick={() => setIsPaymentModalOpen(true)}
//           userInitial={user?.email?.charAt(0).toUpperCase()}
//           avatarColor="#f4af25"
//         />
//
//         {currentFullLesson ? (
//           <LessonRenderer lesson={currentFullLesson} />
//         ) : (
//           <div className={cl.loader}>Loading lesson content...</div>
//         )}
//
//         <div className={cl.bottomNav}>
//           <button
//             className={cl.prevBtn}
//             onClick={() => navigate(`/course/${courseSlug}/${prevLesson.slug}`)}
//             disabled={!prevLesson || prevLesson.status === 'locked'}
//           >
//             <FaArrowLeft /> <span>Previous</span>
//           </button>
//
//           <button
//             className={cl.nextBtn}
//             onClick={() => {
//               completeLesson(activeLesson.id);
//               if (nextLesson && nextLesson.status !== 'locked') {
//                 navigate(`/course/${courseSlug}/${nextLesson.slug}`);
//               }
//             }}
//           >
//             <span>{!nextLesson ? "Finish Course" : "Complete & Next"}</span>
//             {nextLesson && <FaArrowRight />}
//           </button>
//         </div>
//       </div>
//
//       <PaymentModal
//         isOpen={isPaymentModalOpen}
//         onClose={() => setIsPaymentModalOpen(false)}
//         onPaymentSuccess={grantProAccess}
//       />
//     </section>
//   );
// };
//
// export default Course;