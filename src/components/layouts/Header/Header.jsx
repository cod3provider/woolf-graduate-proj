import {NavLink} from "react-router-dom";

import Container from "../../common/Container/Container.jsx";

import cl from "./Header.module.css";
import Logo from "../../common/Logo/Logo.jsx";
import LoginButton from "../../common/LoginButton/LoginButton.jsx";

const Header = () => {
  return (
    <header>
      <Container>
        <div className={cl.wrapLinks}>
          <Logo />

          <ul className={cl.navList}>
            <li className={cl.navItem}>
              <NavLink className={({isActive}) =>
                `${cl.link} ${isActive ? cl.active : ''}`
              } to="/">Home</NavLink>
            </li>

            <li className={cl.navItem}>
              <NavLink className={({isActive}) =>
                `${cl.link} ${isActive ? cl.active : ''}`
              } to="/course">Courses</NavLink>
            </li>
          </ul>

          <LoginButton />
        </div>
      </Container>
    </header>
  )
}

export default Header;