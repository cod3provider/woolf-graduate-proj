import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx";

import './index.css'

import App from './App.jsx';
import Home from "./pages/Home/Home.jsx";
import Course from "./pages/Course/Course.jsx";
import MyLearning from "./pages/MyLearning/MyLearning.jsx";
import AdminDashboard from "@pages/Admin/AdminDashboard.jsx";
import AdminRoute from "@components/auth/AdminRoute.jsx";
import ClosureLesson from "@pages/Course/lessons/closure/ClosureLesson.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="course/:courseSlug/:lessonSlug?" element={<Course />} />
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="closure-preview" element={<ClosureLesson />} />

            <Route element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)