import { Outlet } from 'react-router-dom';

import Header from '../../layouts/Header/Header.jsx';
import Footer from "../../layouts/Footer/Footer.jsx";

const SharedLayout = () => {

  return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
  );
};

export default SharedLayout;