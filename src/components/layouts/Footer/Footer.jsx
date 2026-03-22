import Container from "@components/common/Container/Container.jsx";
import Logo from "@components/common/Logo/Logo.jsx";

import cl from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className={cl.footer}>
          <Logo />
          <ul className={cl.footerLinksList}>
            <li>
              <a className={cl.footerLink} href="">Privacy</a>
            </li>
            <li>
              <a className={cl.footerLink} href="">Terms</a>
            </li>
            <li>
              <a className={cl.footerLink} href="">Contact</a>
            </li>
          </ul>
          <p className={cl.copyright}>&#169; 2026 DevQuest. Made with joy for all.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer;