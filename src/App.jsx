import {Link, Outlet} from "react-router-dom"

import './App.css'
import {Suspense} from "react";
import SharedLayout from "./components/common/SharedLayout/SharedLayout.jsx";

function App({ children }) {

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <SharedLayout>
          <Outlet />
        </SharedLayout>
        {children}
        {/*<nav>*/}
        {/*  <Link to="/">Home</Link>*/}
        {/*  <Link to="/about">About</Link>*/}
        {/*</nav>*/}
        {/*<main>*/}
        {/*  <Outlet/>*/}
        {/*</main>*/}
      </Suspense>
  )
}

export default App
