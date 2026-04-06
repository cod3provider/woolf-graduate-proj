import { useEffect, useState } from "react";
import cl from "./OnboardingModal.module.css";

const ONBOARDING_STORAGE_KEY = "tasty-python-onboarding-seen";
const ONBOARDING_IMAGE_3 = "/src/assets/onboarding_3.png";
const ONBOARDING_IMAGE_1 = "/src/assets/onboarding_1.png";
const ONBOARDING_IMAGE_2 = "/src/assets/onboarding_2.png";
const ONBOARDING_IMAGE_4 = "/src/assets/onboarding_4.png";

const slides = [
  {
    id: 1,
    title: "Who this course is for",
    paragraphs: [
      "This app is designed for learners who already know the basics of Python and want to prepare for junior-level interviews more confidently.",
      "It is not a full beginner course from zero. It works best for users who want to revise tricky topics, organize what they already know, and practise explaining Python concepts more clearly.",
    ],
    imageSrc: ONBOARDING_IMAGE_1,
    imageAlt: "Studying",
  },
  {
    id: 2,
    title: "How to learn with this app",
    paragraphs: [
      "Do not rush through the lessons. Try to solve each task on your own before looking at the answer.",
      "If a lesson feels difficult, that is normal. Come back to it later, repeat it, and let the idea settle in your mind step by step.",
      "Short, focused sessions usually work better than trying to complete everything at once.",
    ],
    imageSrc: ONBOARDING_IMAGE_2,
    imageAlt: "Questions",
  },
  {
    id: 3,
    title: "Why Tasty Python feels different",
    paragraphs: [
      "Some Python topics are hard not because they are impossible, but because they are explained too dryly.",
      "That is why this course uses vivid, tasty metaphors and simple mental images to make difficult ideas easier to grasp.",
      "The goal is not to replace formal learning, but to help you understand the logic behind the topic before moving to more technical examples.",
    ],
    imageSrc: ONBOARDING_IMAGE_3,
    imageAlt: "Cozy Tasty Python illustration",
  },
  {
    id: 4,
    title: "How the platform works",
    paragraphs: [
      "You can start with the free lessons and explore the learning style first.",
      "Your progress is saved as you move through the course.",
      "If the format works well for you, you can unlock the full course and continue with premium lessons later.",
    ],
    imageSrc: ONBOARDING_IMAGE_4,
    imageAlt: "New horizons",
  },
];

const OnboardingModal = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const slide = slides[currentSlide];
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    onClose();
  };

  const handleNext = () => {
    if (isLastSlide) {
      handleComplete();
      return;
    }

    setCurrentSlide((prev) => prev + 1);
  };

  const handleBack = () => {
    if (isFirstSlide) return;
    setCurrentSlide((prev) => prev - 1);
  };

  return (
    <div className={cl.backdrop} onClick={handleComplete}>
      <div className={cl.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={cl.closeBtn}
          onClick={handleComplete}
          aria-label="Close onboarding"
        >
          ×
        </button>

        <p className={cl.badge}>Guide</p>
        <h2 className={cl.title}>{slide.title}</h2>

        {slide.imageSrc && (
          <div className={cl.imageWrap}>
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className={cl.image}
            />
          </div>
        )}

        <div className={cl.content}>
          {slide.paragraphs.map((paragraph, index) => (
            <p key={index} className={cl.text}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={cl.dots}>
          {slides.map((item, index) => (
            <span
              key={item.id}
              className={`${cl.dot} ${index === currentSlide ? cl.dotActive : ""}`}
            />
          ))}
        </div>

        <div className={cl.actions}>
          <button
            type="button"
            className={cl.ghostBtn}
            onClick={handleBack}
            disabled={isFirstSlide}
          >
            Back
          </button>

          <button
            type="button"
            className={cl.primaryBtn}
            onClick={handleNext}
          >
            {isLastSlide ? "Start Learning" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;