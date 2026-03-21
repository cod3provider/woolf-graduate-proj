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
      </Suspense>
  )
}

export default App
