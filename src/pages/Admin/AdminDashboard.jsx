import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";

import { api } from "@/services/api.js";

import cl from "./AdminDashboard.module.css";

import Container from "../../components/common/Container/Container";
import LessonManager from "@pages/Admin/LessonManager.jsx";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    slug: "",
    description: "",
  });

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const data = await api.getCoursesAdmin();
      setCourses(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);


  if (selectedCourse) {
    return (
      <LessonManager
        course={selectedCourse}
        onBack={() => {
          setSelectedCourse(null);
          loadCourses();
        }}
      />
    );
  }

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await api.updateCourse(editingCourseId, newCourse);
      } else {
        await api.createCourse(newCourse);
      }
      setNewCourse({ title: "", slug: "", description: "" });
      setShowCreateForm(false);
      setEditingCourseId(null);
      loadCourses();
    } catch (err) {
      alert("Error saving course: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.deleteCourse(id);
        setCourses(courses.filter(c => c.id !== id));
        loadCourses();
      } catch (err) {
        alert("Delete failed: " + err.message );
      }
    }
  };

  if (isLoading) return <div className={cl.loader}>Loading Admin Panel...</div>;

  return (
    <Container>
      <div className={cl.adminHeader}>
        <div>
          <h1 className={cl.title}>Admin Dashboard</h1>
          <p className={cl.subtitle}>Manage your courses and learning content</p>
        </div>
        <button
          className={showCreateForm ? `${cl.button} ${cl.cancelButton}` : `${cl.addBtn} ${cl.button}`}
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingCourseId(null);
            setNewCourse({ title: "", slug: "", description: "" });
          }}
        >
          <FaPlus className={`${cl.icon} ${showCreateForm ? cl.rotated : ""}`} /> {showCreateForm ? "Cancel" : "Add New Course"}
        </button>
      </div>


      {showCreateForm && (
        <form className={cl.createForm} onSubmit={handleSubmitCourse}>
          <h3>{editingCourseId ? "Edit Course" : "New Course"}</h3>
          <div className={cl.formGrid}>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={e => setNewCourse({...newCourse, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="course-slug"
              value={newCourse.slug}
              onChange={e => setNewCourse({...newCourse, slug: e.target.value})}
              required
            />
            <textarea
              placeholder="Short description"
              value={newCourse.description}
              onChange={e => setNewCourse({...newCourse, description: e.target.value})}
            />
          </div>
          <button type="submit" className={cl.saveBtn}>
            {editingCourseId ? "Save Changes" : "Create Course"}
          </button>
        </form>
      )}

      {/* Список курсов */}
      <div className={cl.courseGrid}>
        {courses.map(course => (
          <div key={course.id} className={cl.courseCard}>
            <div className={cl.courseInfo}>
              <h3>{course.title}</h3>
              <p className={cl.slug}>/{course.slug}</p>
              {course.description && <p>{course.description}</p>}
            </div>

            <div className={cl.actions}>
              <button
                className={cl.iconBtn}
                onClick={() => setSelectedCourse(course)}
              >
                <FaBookOpen /> Lessons
              </button>

              <button
                className={cl.iconBtn}
                onClick={() => {
                  setNewCourse({ title: course.title, slug: course.slug, description: course.description || "" });
                  setEditingCourseId(course.id);
                  setShowCreateForm(true);
                }}
              >
                <FaEdit /> Edit
              </button>

              <button
                className={`${cl.iconBtn} ${cl.delete}`}
                onClick={() => handleDelete(course.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminDashboard;