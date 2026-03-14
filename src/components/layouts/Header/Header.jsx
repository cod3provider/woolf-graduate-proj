import {NavLink} from "react-router-dom";

import Container from "../../common/Container/Container.jsx";

import cl from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <Container>
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
      </Container>
    </header>
  )
}

export default Header;