import {useState} from 'react';
import {FaArrowLeft, FaSave, FaTrash, FaPlus, FaGripVertical, FaFileImport} from 'react-icons/fa';
import TaskEditor from './TaskEditor';
import {api} from "@/services/api.js";

import cl from '../AdminDashboard.module.css';

import LessonIntroBlock from "@pages/Course/blocks/LessonIntroBlock.jsx";
import TheoryBlock from "@pages/Course/blocks/TheoryBlock.jsx";
import HowItWorksBlock from "@pages/Course/blocks/HowItWorksBlock.jsx";
import ExplanationBlock from "@pages/Course/blocks/ExplanationBlock.jsx";
import RealCodeBlock from "@pages/Course/blocks/RealCodeBlock.jsx";
import CallsBlock from "@pages/Course/blocks/CallsBlock.jsx";
import CodeExampleBlock from "@pages/Course/blocks/CodeExampleBlock.jsx";
import DiagramBlock from "@pages/Course/blocks/DiagramBlock.jsx";
import FinishingBlock from "@pages/Course/blocks/FinishingBlock.jsx";
import PracticeSection from "@pages/Course/blocks/PracticeSection.jsx";

const SECTION_TYPES = [
  {value: "intro", label: "Intro (Hero)", icon: "👋"},
  {value: "theory", label: "Theory", icon: "📖"},
  {value: "howItWorks", label: "How It Works", icon: "⚙️"},
  {value: "explanation", label: "Explanation", icon: "💡"},
  {value: "realCode", label: "Real Code Block", icon: "🚀"},
  {value: "calls", label: "Calls Example", icon: "📞"},
  {value: "codeExample", label: "Code Example", icon: "💻"},
  {value: "diagram", label: "Diagram/Image", icon: "🖼️"},
  {value: "practice", label: "Practice Section", icon: "🎯"},
  {value: "finishing", label: "Finishing", icon: "🏁"},
];

const ContentEditor = ({lesson, course, onBack}) => {
  const [sections, setSections] = useState(lesson.sections || []);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const updateSection = (index, field, value) => {
    const newSections = [...sections];
    newSections[index].content = {...newSections[index].content, [field]: value};
    setSections(newSections);
  };

  const addSection = (type) => {
    const defaults = {
      intro: {description: '', imageSrc: ''},
      theory: {title: '', paragraphs: ['']},
      realCode: {title: '', code: '', introParagraphs: [], listItems: [], miniTitle: '', exampleParagraphs: [], outroParagraphs: [], calloutTitle: '', calloutParagraphs: []},
      practice: {tasks: []},
      diagram: {burgerCard: ''},
      calls: {callsCode: ''},
      codeExample: {burgerCode: ''}
    };

    const newSection = {
      type,
      order_index: sections.length,
      content: defaults[type] || {title: '', paragraphs: ['']}
    };
    setSections([...sections, newSection]);
  };

  // --- DRAG N DROP ---
  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...sections];
    const [draggedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    setSections(updated.map((s, i) => ({...s, order_index: i})));
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    try {
      const payload = {
        course_id: course.id,
        title: lesson.title,
        slug: lesson.slug,
        order_index: lesson.order_index,
        is_free: lesson.is_free,
        sections
      };
      await api.updateLesson(lesson.id, payload);
      alert("Lesson saved!");
      onBack();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={cl.editorLayout}>
      <aside className={cl.editorSidebar}>
        <header className={cl.editorHeader}>
          <button onClick={onBack} className={cl.ghostBtn}><FaArrowLeft/> Go back</button>
          <button onClick={handleSave} className={cl.saveBtn}><FaSave/>Save</button>
        </header>

        <div className={cl.blockList}>
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`${cl.sectionBlock} ${draggedIndex === idx ? cl.dragging : ''}`}
              draggable onDragStart={() => handleDragStart(idx)}
              onDragOver={handleDragOver} onDrop={() => handleDrop(idx)}
            >
              <div className={cl.blockHeader}>
                <span
                  className={cl.dragHandle}><FaGripVertical/> {SECTION_TYPES.find(t => t.value === section.type)?.label}</span>
                <button onClick={() => setSections(sections.filter((_, i) => i !== idx))} className={cl.deleteBtn}>
                  <FaTrash/></button>
              </div>

              <div className={cl.blockBody}>
                {['theory', 'howItWorks', 'explanation', 'finishing'].includes(section.type) && (
                  <>
                    <input placeholder="Заголовок" value={section.content.title || ''}
                           onChange={e => updateSection(idx, 'title', e.target.value)}/>
                    <textarea
                      placeholder="Текст (параграфы через Enter)"
                      value={section.content.paragraphs?.join('\n') || section.content.steps?.join('\n') || section.content.items?.join('\n') || ''}
                      onChange={e => {
                        const val = e.target.value.split('\n');
                        const field = section.type === 'howItWorks' ? 'steps' : (section.type === 'explanation' ? 'items' : 'paragraphs');
                        updateSection(idx, field, val);
                      }}
                    />
                  </>
                )}

                {section.type === 'intro' && (
                  <>
                    <textarea placeholder="Описание" value={section.content.description || ''}
                              onChange={e => updateSection(idx, 'description', e.target.value)}/>
                    <input placeholder="URL картинки" value={section.content.imageSrc || ''}
                           onChange={e => updateSection(idx, 'imageSrc', e.target.value)}/>
                  </>
                )}

                {section.type === 'realCode' && (
                  <div className={cl.nestedFields}>
                    <input placeholder="Title" value={section.content.title || ''}
                           onChange={e => updateSection(idx, 'title', e.target.value)}/>
                    <textarea placeholder="Intro paragraphs (one per line)"
                              value={section.content.introParagraphs?.join('\n') || ''}
                              onChange={e => updateSection(idx, 'introParagraphs', e.target.value.split('\n'))}/>
                    <textarea placeholder="List items (one per line)"
                              value={section.content.listItems?.join('\n') || ''}
                              onChange={e => updateSection(idx, 'listItems', e.target.value.split('\n'))}/>
                    <input placeholder="Mini title (e.g. Real example: timing a function)"
                           value={section.content.miniTitle || ''}
                           onChange={e => updateSection(idx, 'miniTitle', e.target.value)}/>
                    <textarea placeholder="Example paragraphs (one per line)"
                              value={section.content.exampleParagraphs?.join('\n') || ''}
                              onChange={e => updateSection(idx, 'exampleParagraphs', e.target.value.split('\n'))}/>
                    <textarea className={cl.codeArea} placeholder="Code"
                              value={section.content.code || ''}
                              onChange={e => updateSection(idx, 'code', e.target.value)}/>
                    <textarea placeholder="Outro paragraphs (one per line)"
                              value={section.content.outroParagraphs?.join('\n') || ''}
                              onChange={e => updateSection(idx, 'outroParagraphs', e.target.value.split('\n'))}/>
                    <input placeholder="Callout title (e.g. What's the decorator here?)"
                           value={section.content.calloutTitle || ''}
                           onChange={e => updateSection(idx, 'calloutTitle', e.target.value)}/>
                    <textarea placeholder="Callout paragraphs (one per line)"
                              value={section.content.calloutParagraphs?.join('\n') || ''}
                              onChange={e => updateSection(idx, 'calloutParagraphs', e.target.value.split('\n'))}/>
                  </div>
                )}

                {['calls', 'codeExample'].includes(section.type) && (
                  <textarea
                    className={cl.codeArea}
                    placeholder="Python code..."
                    value={section.content.callsCode || section.content.burgerCode || ''}
                    onChange={e => updateSection(idx, section.type === 'calls' ? 'callsCode' : 'burgerCode', e.target.value)}
                  />
                )}

                {section.type === 'diagram' && (
                  <input placeholder="Image URL" value={section.content.burgerCard || ''}
                         onChange={e => updateSection(idx, 'burgerCard', e.target.value)}/>
                )}

                {section.type === 'practice' && (
                  <TaskEditor
                    tasks={section.content.tasks || []}
                    onChange={(newT) => {
                      const next = [...sections];
                      next[idx].content.tasks = newT;
                      setSections(next);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={cl.addActions}>
          {SECTION_TYPES.map(t => (
            <button key={t.value} onClick={() => addSection(t.value)} className={cl.addTypeBtn}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </aside>

      <main className={cl.previewArea}>
        <div className={cl.previewContent}>
          <h1 className={cl.previewTitle}>{lesson.title}</h1>
          {sections.map((s, i) => {
            switch (s.type) {
              case 'intro': return <LessonIntroBlock key={i} {...s.content} />;
              case 'theory': return <TheoryBlock key={i} {...s.content} />;
              case 'howItWorks': return <HowItWorksBlock key={i} {...s.content} />;
              case 'explanation': return <ExplanationBlock key={i} {...s.content} />;
              case 'realCode': return <RealCodeBlock key={i} {...s.content} />;
              case 'calls': return <CallsBlock key={i} {...s.content} />;
              case 'codeExample': return <CodeExampleBlock key={i} {...s.content} />;
              case 'diagram': return <DiagramBlock key={i} {...s.content} />;
              case 'finishing': return <FinishingBlock key={i} {...s.content} />;
              case 'practice': {
                const tasks = s.content.tasks || [];

                if (tasks.length === 0) {
                  return (
                    <div key={i} style={{
                      padding: '20px',
                      border: '2px dashed #e0e7ff',
                      borderRadius: '16px',
                      textAlign: 'center',
                      color: '#6366f1',
                      background: '#f8f9ff',
                      margin: '20px 0'
                    }}>
                      Practices block added. Add task!
                    </div>
                  );
                }

                const practiceProps = {
                  codingTasksProps: { tasks: tasks?.filter(t => t.task_type === 'code_check') || [] },
                  predictOutputProps: { tasks: tasks?.filter(t => t.task_type === 'multiple_choice') || [] },
                  fillMissingLineProps: { tasks: [] },
                  findMistakeProps: { tasks: [] },
                  reorderLinesProps: { tasks: tasks?.filter(t => t.task_type === 'reorder_lines') || [] },
                };
                return <PracticeSection key={i} {...practiceProps} />;
              }

              default:
                return <div key={i} className={cl.error}>Unknown block type: {s.type}</div>;
            }
          })}
        </div>
      </main>
    </div>
  );
};

export default ContentEditor;