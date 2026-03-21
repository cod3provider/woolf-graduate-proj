import { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import cl from "./ReorderLinesSection.module.css";

function LinePreview({ index, text, overlay = false }) {
  return (
    <div className={`${cl.lineCard} ${overlay ? cl.overlayCard : ""}`}>
      <span className={cl.dragHandle}>⋮⋮</span>
      <span className={cl.lineIndex}>{index + 1}</span>
      <code className={cl.lineCode}>{text}</code>
    </div>
  );
}

function SortableLine({ id, index, text }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${cl.sortableWrap} ${isDragging ? cl.sortableDragging : ""}`}
    >
      <div className={cl.handleArea} {...attributes} {...listeners}>
        <LinePreview index={index} text={text} />
      </div>
    </div>
  );
}

function ReorderTaskCard({ task }) {
  const [items, setItems] = useState(task.lines);
  const [activeId, setActiveId] = useState(null);
  const [result, setResult] = useState(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const activeItem =
    items.find((item) => item.id === activeId) ||
    task.lines.find((item) => item.id === activeId);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);

        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }

    setActiveId(null);
    setResult(null);
  };

  const handleCheck = () => {
    const currentOrder = items.map((item) => item.id);
    const isCorrect =
      currentOrder.length === task.correctOrder.length &&
      currentOrder.every((id, index) => id === task.correctOrder[index]);

    setResult(isCorrect);
  };

  const handleReset = () => {
    setItems(task.lines);
    setActiveId(null);
    setResult(null);
  };

  return (
    <article className={cl.taskCard}>
      <div className={cl.taskHeader}>
        <span className={cl.taskNumber}>{task.id}</span>
        <h3 className={cl.taskTitle}>Reorder #{task.id}</h3>
      </div>

      <p className={cl.taskSubtitle}>{task.title}</p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragCancel={handleDragCancel}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div className={cl.orderList}>
            {items.map((line, index) => (
              <SortableLine
                key={line.id}
                id={line.id}
                index={index}
                text={line.text}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeItem ? (
            <LinePreview
              index={items.findIndex((item) => item.id === activeItem.id)}
              text={activeItem.text}
              overlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className={cl.taskFooter}>
        <button type="button" className={cl.checkBtn} onClick={handleCheck}>
          Check answer
        </button>

        <button type="button" className={cl.resetBtn} onClick={handleReset}>
          Reset
        </button>

        {result === true && (
          <p className={`${cl.feedback} ${cl.feedbackCorrect}`}>Correct!</p>
        )}

        {result === false && (
          <p className={`${cl.feedback} ${cl.feedbackWrong}`}>
            Not quite. Try again.
          </p>
        )}
      </div>
    </article>
  );
}

const ReorderLinesSection = ({
  badge = "Practice",
  title = "Reorder lines",
  description = "Drag the lines into the correct order to build a working code block.",
  tasks = [],
}) => {
  if (!tasks.length) return null;

  return (
    <div className={cl.quizBlock}>
      <span className={cl.sectionBadge}>{badge}</span>
      <h2 className={cl.sectionTitle}>{title}</h2>
      <p className={cl.sectionText}>{description}</p>

      <div className={cl.tasksList}>
        {tasks.map((task) => (
          <ReorderTaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ReorderLinesSection;