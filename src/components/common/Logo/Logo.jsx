import {NavLink} from "react-router-dom";

import IconLogo from './Icon.jsx';


import cl from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={cl.logoWrapper}>
      <NavLink className={({isActive}) =>
        `${cl.link} ${isActive ? cl.active : ''}`
      } to="/blog">
        <div className={cl.iconWrap}>
          <IconLogo />
        </div>
      </NavLink>
    </div>
  )
}

export default Logo;