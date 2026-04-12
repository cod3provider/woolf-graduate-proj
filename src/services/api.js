import {auth} from "./firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

async function fetchOptionalAuth(endpoint, options = {}) {
  const user = auth.currentUser;
  const headers = {"Content-Type": "application/json", ...options.headers};

  if (user) {
    const token = await user.getIdToken();
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {...options, headers});
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API Error");
  }
  return response.status === 204 ? null : response.json();
}

async function fetchWithAuth(endpoint, options = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // if (response.status === 401) {
  //
  // }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API Error");
  }

  return response.status === 204 ? null : response.json();
}

export const api = {
  login: () => fetchWithAuth("/auth/login", {method: "POST"}),

  getCoursesAdmin: () => fetchWithAuth("/admin/courses"),
  createCourse: (data) => fetchWithAuth("/admin/courses", {method: "POST", body: JSON.stringify(data)}),
  updateCourse: (id, data) => fetchWithAuth(`/admin/courses/${id}`, {method: "PUT", body: JSON.stringify(data)}),
  deleteCourse: (id) => fetchWithAuth(`/admin/courses/${id}`, {method: "DELETE"}),

  getCourseLessons: (courseId) => fetchWithAuth(`/admin/courses/${courseId}/lessons`),
  createLesson: (data) => fetchWithAuth("/admin/lessons", {method: "POST", body: JSON.stringify(data)}),
  updateLesson: (id, data) => fetchWithAuth(`/admin/lessons/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteLesson: (id) => fetchWithAuth(`/admin/lessons/${id}`, {method: "DELETE"}),

  getCourses: () => fetchOptionalAuth("/courses"),
  getLesson: (courseSlug, lessonSlug) => fetchWithAuth(`/courses/${courseSlug}/lessons/${lessonSlug}`),

  getCourseProgress: (courseId) => fetchWithAuth(`/progress/courses/${courseId}`),
  completeLesson: (lessonId) => fetchWithAuth(`/progress/lessons/${lessonId}/complete`, {method: "POST"}),

  getCourseLessonsBySlug: (courseSlug) =>
    fetchWithAuth(`/courses/${courseSlug}/lessons`),

  getFullLesson: (courseSlug, lessonSlug) =>
    fetchWithAuth(`/courses/${courseSlug}/lessons/${lessonSlug}`),
  purchaseCourse: (courseId, cardNumber) =>
    fetchWithAuth("/payments/purchase", {
      method: "POST",
      body: JSON.stringify({
        course_id: courseId,
        card_number: cardNumber,
      }),
    }),
};