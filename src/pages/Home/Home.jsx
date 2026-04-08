import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa";

import Container from "@components/common/Container/Container.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

import useProAccess from "../Course/hooks/useProAccess";
import PaymentModal from "../Course/components/payment/PaymentModal/PaymentModal.jsx";
import { api } from "@/services/api.js";

import cl from "./Home.module.css";

const NAME_STORAGE_KEY = "tasty-python-display-name";

const Home = () => {
  const { user, openAuthModal } = useAuth();
  const { hasProAccess, grantProAccess } = useProAccess();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [shouldOpenPaymentAfterLogin, setShouldOpenPaymentAfterLogin] =
    useState(false);

  const [firstCourse, setFirstCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [courseLoaded, setCourseLoaded] = useState(false);

  const savedCustomName = localStorage.getItem(NAME_STORAGE_KEY) || "";

  const userName =
    savedCustomName.trim() ||
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "friend";

  useEffect(() => {
    api.getCourses()
      .then(courses => {
        if (courses.length) setFirstCourse(courses[0]);
        setCourseLoaded(true);
      })
      .catch(err => console.error("Failed to load courses", err));
  }, []);

  useEffect(() => {
    if (!user || !firstCourse) return;
    api.getCourseLessonsBySlug(firstCourse.slug)
      .then(data => setLessons(data))
      .catch(err => console.error("Failed to load lessons", err));
  }, [user, firstCourse]);

  useEffect(() => {
    if (user && shouldOpenPaymentAfterLogin && !hasProAccess) {
      setIsPaymentModalOpen(true);
      setShouldOpenPaymentAfterLogin(false);
    }
  }, [user, shouldOpenPaymentAfterLogin, hasProAccess]);

  const handleProtectedLinkClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      openAuthModal(path);
    }
  };

  const handleBuyCourseClick = () => {
    if (!user) {
      setShouldOpenPaymentAfterLogin(true);
      openAuthModal();
      return;
    }

    if (!hasProAccess) {
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <Container>
      <section className={cl.heroSection}>
        <div className={cl.textContainer}>
          {user && <p className={cl.welcomeBadge}>Welcome, {userName}</p>}

          {courseLoaded && (!firstCourse || firstCourse.lesson_count === 0) ? (
            <p className={cl.comingSoon}>Courses coming soon</p>
          ) : (
            <>
              <h1 className={cl.title}>
                Learn Python in <span className={cl.titleSpan}>small steps</span>
              </h1>

              <p className={cl.subtitle}>
                Short lessons, simple metaphors, and practical tasks to help you
                understand tricky Python topics and prepare for junior interviews.
              </p>

              {lessons.length > 0 && (
                <div className={cl.lessonAccess}>
                  <span className={cl.freeTag}>
                    {lessons.filter(l => l.is_free).length} free lessons
                  </span>
                  <span className={cl.lockedTag}>
                    <FaLock />
                    {lessons.filter(l => !l.is_free).length} locked lessons
                  </span>
                </div>
              )}

              <ul className={cl.linksList}>
                <li className={cl.listItem}>
                  {firstCourse ? (
                    <Link
                      to={`/course/${firstCourse.slug}`}
                      className={`${cl.startBtn} ${cl.btn}`}
                    >
                      <span>Start Free Lessons</span>
                      <FaArrowRight />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`${cl.startBtn} ${cl.btn}`}
                      onClick={(e) => handleProtectedLinkClick(e, "/course")}
                    >
                      <span>Start Free Lessons</span>
                      <FaArrowRight />
                    </button>
                  )}
                </li>

                <li className={cl.listItem}>
                  {user && hasProAccess ? (
                    <Link to="/my-learning" className={`${cl.demoBtn} ${cl.btn}`}>
                      My Learning
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`${cl.demoBtn} ${cl.btn} ${cl.actionBtn}`}
                      onClick={handleBuyCourseClick}
                    >
                      Buy Full Course
                    </button>
                  )}
                </li>
              </ul>

              <div className={cl.statistic}>
                <p>Joined by 10,000+ little coders</p>
              </div>
            </>
          )}
        </div>

        <div className={cl.blocksWrap}>
          <div className={cl.innerBlocksWrap}>
            <ul className={cl.listBlocks}>
              <li>
                <div className={`${cl.yellowBlock} ${cl.block}`}></div>
              </li>
              <li>
                <div className={`${cl.blueBlock} ${cl.block}`}></div>
              </li>
              <li>
                <div className={`${cl.greenBlock} ${cl.block}`}></div>
              </li>
              <li>
                <div className={`${cl.lilaBlock} ${cl.block}`}></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={cl.infoSection}>
        <div className={cl.tiles}>
          <h2 className={cl.sectionTitle}>How to use the app</h2>

          <ul className={cl.listDescription}>
            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Read</h3>
              <p className={cl.cardText}>
                Start with a short lesson focused on one Python concept at a
                time.
              </p>
            </li>

            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Practice</h3>
              <p className={cl.cardText}>
                Complete quick tasks right after the explanation to consolidate
                the topic.
              </p>
            </li>

            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Progress</h3>
              <p className={cl.cardText}>
                Move lesson by lesson and build confidence for junior-level
                questions.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={cl.infoSection}>
        <h2 className={cl.sectionTitle}>What makes it useful</h2>

        <ul className={cl.featureList}>
          <li className={cl.featureItem}>Short lessons instead of overload</li>
          <li className={cl.featureItem}>Metaphors for difficult topics</li>
          <li className={cl.featureItem}>Practice that matches the theory</li>
          <li className={cl.featureItem}>
            Focus on junior Python interview topics
          </li>
        </ul>
      </section>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={grantProAccess}
        courseId={firstCourse?.id}
      />
    </Container>
  );
};

export default Home;