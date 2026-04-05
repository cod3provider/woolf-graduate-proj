import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "@components/common/Container/Container.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "@/services/api.js";
import useCourseProgress from "../Course/hooks/useCourseProgress";
import useProAccess from "../Course/hooks/useProAccess";
import PaymentModal from "../Course/components/payment/PaymentModal/PaymentModal.jsx";

import cl from "./MyLearning.module.css";

const NAME_STORAGE_KEY = "tasty-python-display-name";
const AVATAR_STORAGE_KEY = "tasty-python-avatar-color";
const AVATAR_MODE_STORAGE_KEY = "tasty-python-avatar-mode";

const avatarColors = [
  "#f4af25",
  "#60a5fa",
  "#4ade80",
  "#c084fc",
  "#fb7185",
  "#f97316",
];

const MyLearning = () => {
  const navigate = useNavigate();
  const { user, loading, openAuthModal } = useAuth();
  const { hasProAccess, grantProAccess } = useProAccess();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [avatarColor, setAvatarColor] = useState(avatarColors[0]);
  const [avatarMode, setAvatarMode] = useState("initial");

  const { completedLessonIds } = useCourseProgress(course?.id ?? null);

  useEffect(() => {
    if (!loading && !user) {
      openAuthModal("/my-learning");
      navigate("/", { replace: true });
    }
  }, [loading, user, openAuthModal, navigate]);

  useEffect(() => {
    if (!user) return;
    api.getCourses().then(data => {
      if (data?.length) setCourse(data[0]);
    }).catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!course) return;
    api.getCourseLessonsBySlug(course.slug).then(setLessons).catch(() => {});
  }, [course]);

  useEffect(() => {
    const savedName = localStorage.getItem(NAME_STORAGE_KEY) || "";
    const savedColor = localStorage.getItem(AVATAR_STORAGE_KEY) || avatarColors[0];
    const savedMode = localStorage.getItem(AVATAR_MODE_STORAGE_KEY) || (user?.photoURL ? "photo" : "initial");
    setCustomName(savedName);
    setDraftName(savedName);
    setAvatarColor(savedColor);
    setAvatarMode(savedMode);
  }, [user]);

  const defaultName = user?.displayName?.trim() || user?.email?.split("@")[0] || "Learner";
  const displayName = customName.trim() || defaultName;
  const userEmail = user?.email || "No email available";

  const completedCount = completedLessonIds.length;
  const totalCount = lessons.length;
  const remainingCount = Math.max(totalCount - completedCount, 0);
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const accessibleLessons = useMemo(() => {
    return lessons.filter(l => l.is_free || hasProAccess);
  }, [lessons, hasProAccess]);

  const allCompleted = accessibleLessons.length > 0 && accessibleLessons.every(l => completedLessonIds.includes(l.id));

  const currentLesson = useMemo(() => {
    return accessibleLessons.find(l => !completedLessonIds.includes(l.id)) || null;
  }, [accessibleLessons, completedLessonIds]);

  const lastCompletedLesson = useMemo(() => {
    if (!completedLessonIds.length) return null;
    const completedInOrder = lessons.filter(l => completedLessonIds.includes(l.id));
    return completedInOrder[completedInOrder.length - 1] || null;
  }, [lessons, completedLessonIds]);

  const nextLesson = useMemo(() => {
    if (!currentLesson) return null;
    const idx = accessibleLessons.findIndex(l => l.id === currentLesson.id);
    return accessibleLessons[idx + 1] || null;
  }, [accessibleLessons, currentLesson]);

  const handleSaveName = () => {
    const cleanName = draftName.trim();
    if (!cleanName) {
      localStorage.removeItem(NAME_STORAGE_KEY);
      setCustomName("");
      setDraftName("");
    } else {
      localStorage.setItem(NAME_STORAGE_KEY, cleanName);
      setCustomName(cleanName);
      setDraftName(cleanName);
    }
    setIsEditingName(false);
  };

  const handleAvatarSelect = (color) => {
    setAvatarColor(color);
    localStorage.setItem(AVATAR_STORAGE_KEY, color);
  };

  const handleAvatarModeChange = (mode) => {
    setAvatarMode(mode);
    localStorage.setItem(AVATAR_MODE_STORAGE_KEY, mode);
  };

  const avatarInitial = displayName.charAt(0).toUpperCase();
  const shouldShowPhoto = avatarMode === "photo" && !!user?.photoURL;

  if (loading || !user) return null;

  return (
    <Container>
      <section className={cl.page}>
        <div className={cl.pageHeader}>
          <div>
            <p className={cl.badge}>My Learning</p>
            <h1 className={cl.pageTitle}>Your learning dashboard</h1>
            <p className={cl.pageText}>
              Pick up where you left off, track your progress, and personalize
              your space.
            </p>
          </div>
        </div>

        <div className={cl.grid}>
          <article className={`${cl.card} ${cl.profileCard}`}>
            <div className={cl.profileTop}>
              <div
                className={cl.avatar}
                style={!shouldShowPhoto ? { backgroundColor: avatarColor } : undefined}
                aria-label="User avatar"
              >
                {shouldShowPhoto ? (
                  <img src={user.photoURL} alt="User avatar" className={cl.avatarImage} />
                ) : (
                  avatarInitial
                )}
              </div>

              <div className={cl.profileInfo}>
                {!isEditingName ? (
                  <>
                    <h2 className={cl.profileName}>{displayName}</h2>
                    <p className={cl.profileEmail}>{userEmail}</p>
                  </>
                ) : (
                  <div className={cl.nameEditor}>
                    <input
                      type="text"
                      className={cl.nameInput}
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <div className={cl.inlineActions}>
                      <button type="button" className={cl.smallBtn} onClick={handleSaveName}>
                        Save
                      </button>
                      <button
                        type="button"
                        className={cl.ghostBtn}
                        onClick={() => {
                          setDraftName(customName || defaultName);
                          setIsEditingName(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <span className={`${cl.planBadge} ${hasProAccess ? cl.pro : cl.free}`}>
                {hasProAccess ? "Pro Plan" : "Free Plan"}
              </span>
            </div>

            <div className={cl.profileActions}>
              {!isEditingName && (
                <button
                  type="button"
                  className={cl.smallBtn}
                  onClick={() => {
                    setDraftName(customName || defaultName);
                    setIsEditingName(true);
                  }}
                >
                  Edit Name
                </button>
              )}
            </div>

            <div className={cl.avatarModeSection}>
              <p className={cl.sectionMiniTitle}>Avatar style</p>
              <div className={cl.inlineActions}>
                <button
                  type="button"
                  className={`${cl.ghostBtn} ${avatarMode === "photo" ? cl.modeBtnActive : ""}`}
                  onClick={() => handleAvatarModeChange("photo")}
                  disabled={!user?.photoURL}
                >
                  Use Google Photo
                </button>
                <button
                  type="button"
                  className={`${cl.ghostBtn} ${avatarMode === "initial" ? cl.modeBtnActive : ""}`}
                  onClick={() => handleAvatarModeChange("initial")}
                >
                  Use Letter Avatar
                </button>
              </div>
            </div>

            <div>
              <p className={cl.sectionMiniTitle}>Choose avatar color</p>
              <div className={cl.colorRow}>
                {avatarColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`${cl.colorDot} ${avatarColor === color ? cl.colorDotActive : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleAvatarSelect(color)}
                    aria-label={`Choose avatar color ${color}`}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className={`${cl.card} ${cl.continueCard}`}>
            <p className={cl.cardLabel}>Continue Learning</p>
            {allCompleted ? (
              <>
                <h2 className={cl.cardTitle}>Great progress!</h2>
                <p className={cl.cardText}>
                  You have completed all available lessons. Keep up the great work!
                </p>
              </>
            ) : (
              <>
                <h2 className={cl.cardTitle}>{currentLesson?.title || "No lesson yet"}</h2>
                <p className={cl.cardText}>{course?.title || ""}</p>
                <p className={cl.cardText}>
                  Continue from your current lesson and keep your momentum going.
                </p>
                {currentLesson && course && (
                  <Link to={`/course/${course.slug}/${currentLesson.slug}`} className={cl.primaryBtn}>
                    Start Lesson
                  </Link>
                )}
              </>
            )}
          </article>

          <article className={cl.card}>
            <p className={cl.cardLabel}>Your Progress</p>
            <h2 className={cl.cardTitle}>
              {completedCount} of {totalCount} lessons completed
            </h2>

            <div className={cl.progressBar}>
              <div className={cl.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>

            <div className={cl.statRow}>
              <div className={cl.statBox}>
                <span className={cl.statValue}>{completedCount}</span>
                <span className={cl.statLabel}>Completed</span>
              </div>
              <div className={cl.statBox}>
                <span className={cl.statValue}>{remainingCount}</span>
                <span className={cl.statLabel}>Remaining</span>
              </div>
              <div className={cl.statBox}>
                <span className={cl.statValue}>{progressPercent}%</span>
                <span className={cl.statLabel}>Progress</span>
              </div>
            </div>
          </article>

          <article className={cl.card}>
            <p className={cl.cardLabel}>Course Access</p>
            <h2 className={cl.cardTitle}>
              {hasProAccess ? "Full course unlocked" : "You are on the free plan"}
            </h2>
            <p className={cl.cardText}>
              {hasProAccess
                ? "You currently have access to all lessons in the course."
                : "You currently have access to the first 3 lessons. Upgrade to unlock the full path."}
            </p>
            {!hasProAccess && (
              <button type="button" className={cl.primaryBtn} onClick={() => setIsPaymentModalOpen(true)}>
                Upgrade to Pro
              </button>
            )}
          </article>

          <article className={cl.card}>
            <p className={cl.cardLabel}>Your Learning Path</p>
            <div className={cl.pathList}>
              <div className={cl.pathItem}>
                <span className={cl.pathTitle}>Last completed</span>
                <span className={cl.pathValue}>
                  {lastCompletedLesson ? lastCompletedLesson.title : "Nothing completed yet"}
                </span>
              </div>
              <div className={cl.pathItem}>
                <span className={cl.pathTitle}>Current lesson</span>
                <span className={cl.pathValue}>
                  {allCompleted ? "All lessons completed" : (currentLesson?.title || "No lesson yet")}
                </span>
              </div>
              <div className={cl.pathItem}>
                <span className={cl.pathTitle}>Next lesson</span>
                <span className={cl.pathValue}>
                  {nextLesson ? nextLesson.title : "You are at the end of your current path"}
                </span>
              </div>
            </div>
          </article>
        </div>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={grantProAccess}
        />
      </section>
    </Container>
  );
};

export default MyLearning;
