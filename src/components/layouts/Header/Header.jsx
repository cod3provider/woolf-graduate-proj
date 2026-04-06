import { NavLink } from "react-router-dom";

import Container from "../../common/Container/Container.jsx";
import Logo from "../../common/Logo/Logo.jsx";
import LoginButton from "../../common/LoginButton/LoginButton.jsx";
import { useAuth } from "@context/AuthContext.jsx";

import cl from "./Header.module.css";

const Header = () => {
  const { user, logOut } = useAuth();

  const handleGuideOpen = () => {
    window.dispatchEvent(new CustomEvent("open-onboarding"));
  };

  return (
    <header className={cl.header}>
      <Container>
        <div className={cl.wrapLinks}>
          <div className={cl.leftSide}>
            <Logo />
          </div>

          <nav className={cl.centerNav}>
            <ul className={cl.navList}>
              <li className={cl.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    `${cl.link} ${isActive ? cl.active : ""}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li className={cl.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    `${cl.link} ${isActive ? cl.active : ""}`
                  }
                  to="/course"
                >
                  Learn
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={cl.rightSide}>
            <div className={cl.authActions}>
              <button
                type="button"
                className={cl.guideBtn}
                onClick={handleGuideOpen}
              >
                Guide
              </button>

              {user ? (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `${cl.accountLink} ${isActive ? cl.accountLinkActive : ""}`
                    }
                    to="/my-learning"
                  >
                    My Learning
                  </NavLink>

                  <button
                    type="button"
                    className={cl.logoutBtn}
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;