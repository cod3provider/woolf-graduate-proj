import { Link } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa";

import Container from "@components/common/Container/Container.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

import cl from "./Home.module.css";

const Home = () => {
  const { user } = useAuth();

  const userName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "friend";

  return (
    <Container>
      {/* --- HERO SECTION --- */}
      <section className={cl.heroSection}>
        <div className={cl.contentItem}>
          <div className={`${cl.textContainer} ${cl.contentContainer}`}>
            {user && (
              <p className={cl.welcomeBadge}>
                Welcome back, {userName}
              </p>
            )}

            <h1 className={cl.title}>
              Learn Python in <span className={cl.titleSpan}>small steps</span>
            </h1>

            <p className={cl.subtitle}>
              Short lessons, simple metaphors, and practical tasks to help you
              understand tricky Python topics and prepare for junior interviews.
            </p>

            <div className={cl.lessonAccess}>
              <span className={cl.freeTag}>3 free lessons</span>
              <span className={cl.lockedTag}>
                <FaLock />
                2 locked lessons
              </span>
            </div>

            <ul className={cl.linksList}>
              <li className={cl.listItem}>
                <Link to="/course/closure" className={`${cl.startBtn} ${cl.btn}`}>
                  <span>Start Free Lessons</span>
                  <FaArrowRight />
                </Link>
              </li>
              <li className={cl.listItem}>
                <Link to="/course" className={`${cl.demoBtn} ${cl.btn}`}>
                  Open Course
                </Link>
              </li>
            </ul>

            <div className={cl.statistic}>
              <p>Joined by 10,000+ little coders</p>
            </div>
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
        </div>
      </section>

      {/* --- INFO SECTION (How to use) --- */}
      <section className={cl.infoSection}>
        <div className={cl.tiles}>
          <h2 className={cl.sectionTitle}>How to use the app</h2>

          <ul className={cl.listDescription}>
            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Read</h3>
              <p className={cl.cardText}>Start with a short lesson focused on one Python concept at a time.</p>
            </li>

            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Practice</h3>
              <p className={cl.cardText}>Complete quick tasks right after the explanation to consolidate the topic.</p>
            </li>

            <li className={cl.listDescriptionItem}>
              <div className={cl.iconBackground}></div>
              <h3 className={cl.cardTitle}>Progress</h3>
              <p className={cl.cardText}>Move lesson by lesson and build confidence for junior-level questions.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* --- FEATURE SECTION --- */}
      <section className={cl.infoSection}>
        <h2 className={cl.sectionTitle}>What makes it useful</h2>

        <ul className={cl.featureList}>
          <li className={cl.featureItem}>Short lessons instead of overload</li>
          <li className={cl.featureItem}>Metaphors for difficult topics</li>
          <li className={cl.featureItem}>Practice that matches the theory</li>
          <li className={cl.featureItem}>Focus on junior Python interview topics</li>
        </ul>
      </section>

      {/* --- PATHS SECTION --- */}

    </Container>
  );
};

export default Home;