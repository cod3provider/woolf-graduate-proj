import { useState, useEffect, useCallback } from 'react';
import { FaArrowLeft, FaPlus, FaTrash, FaFileAlt } from 'react-icons/fa';

import { api } from "@/services/api.js";

import cl from './AdminDashboard.module.css';
import ContentEditor from "@pages/Admin/ContentEditor/ContentEditor.jsx";

const LessonManager = ({ course, onBack }) => {
  const [lessons, setLessons] = useState([]);
  const [editingLesson, setEditingLesson] = useState(null);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: '', slug: '', order_index: 0, is_free: false });

  const loadLessons = useCallback(async () => {
    try {
      const data = await api.getCourseLessons(course.id);
      setLessons(data);
    } catch (err) {
      console.error("Error loading lessons", err);
    }
  }, [course.id]);

  useEffect(() => {
    loadLessons();
  }, [loadLessons]);

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      // При создании урока секции всегда пустые
      await api.createLesson({ ...newLesson, course_id: course.id, sections: [] });
      setIsAddingLesson(false);
      setNewLesson({ title: '', slug: '', order_index: lessons.length + 1 });
      loadLessons();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (editingLesson) {
    return (
      <ContentEditor
        lesson={editingLesson}
        course={course}
        onBack={() => {
          setEditingLesson(null);
          loadLessons();
        }}
      />
    );
  }

  return (
    <div className={cl.managerContainer}>
      <header className={cl.adminHeader}>
        <button onClick={onBack} className={cl.ghostBtn}>
          <FaArrowLeft /> To courses
        </button>
        <h2>Lessons of course: {course.title}</h2>
        <button
          onClick={() => setIsAddingLesson(!isAddingLesson)}
          className={cl.addBtn}
        >
          <FaPlus /> {isAddingLesson ? "Cancel" : "Add lesson"}
        </button>
      </header>

      {isAddingLesson && (
        <form onSubmit={handleCreateLesson} className={cl.createForm}>
          <div className={cl.formGrid}>
            <input
              placeholder="Lesson Title (e.g., Introduction to Python)"
              value={newLesson.title}
              onChange={e => setNewLesson({...newLesson, title: e.target.value})}
              required
            />
            <input
              placeholder="slug-lesson"
              value={newLesson.slug}
              onChange={e => setNewLesson({...newLesson, slug: e.target.value})}
              required
            />

            <div className={cl.wrapLabel}>
              <label className={cl.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newLesson.is_free}
                  onChange={e => setNewLesson({...newLesson, is_free: e.target.checked})}
                />
                <span>Make this lesson free (trial lesson)</span>
              </label>
            </div>
          </div>
          <button type="submit" className={cl.saveBtn}>Create lesson</button>
        </form>
      )}

      <div className={cl.courseGrid}>
        {lessons.length === 0 && <p className={cl.emptyState}>You haven't lessons. Create first lesson!</p>}

        {lessons.map(lesson => (
          <div key={lesson.id} className={cl.courseCard}>
            <div className={cl.courseInfo}>
              <strong>{lesson.order_index}. {lesson.title}</strong>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <p className={cl.slug}>/{lesson.slug}</p>

                {lesson.is_free ? (
                  <span className={cl.freeBadge}>FREE</span>
                ) : (
                  <span className={cl.proBadge} style={{ background: '#eee', color: '#666' }}>PRO</span>
                )}
              </div>
            </div>
            <div className={cl.actions}>
              <button
                className={cl.iconBtn}
                title="Edit content (Split Screen)"
                onClick={() => setEditingLesson(lesson)}
              >
                <FaFileAlt />
              </button>
              <button
                className={`${cl.iconBtn} ${cl.delete}`}
                title="Delete lesson"
                onClick={async () => {
                  if(window.confirm("Delete lesson with content?")) {
                    await api.deleteLesson(lesson.id);
                    loadLessons();
                  }
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonManager;