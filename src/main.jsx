import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Course from "./pages/Course/Course.jsx"
import Home from "./pages/Home/Home.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="course" element={<Course/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
)
