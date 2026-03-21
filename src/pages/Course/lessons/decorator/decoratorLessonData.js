import burgerCard from "../../../../assets/2_Decorator/Decorator_1.png";
import lessonFinish from "../../../../assets/2_Decorator/Decorator_finish.png";
import decoratorHero from "../../../../assets/2_Decorator/Decorator_hero.png";

const burgerCode = `def burger_style(func):
    def wrapper(bun, patty):
        print(f"Top {bun} bun")
        func(bun, patty)
        print(f"Bottom {bun} bun")
    return wrapper

@burger_style
def make_burger(bun, patty):
    print(f"{patty} patty")

make_burger("white", "chicken")
make_burger("brown", "beef")
make_burger("white", "pork")`;

const fillMissingLineTasks = [
  {
    id: 1,
    code: `def sandwich_style(func):
    def wrapper():
        print("Bread")
        func()
        print("Bread")
    ______`,
    question: "Choose the missing line:",
    options: {
      A: "return func",
      B: "return wrapper",
      C: "wrapper()",
    },
    correct: "B",
  },
  {
    id: 2,
    code: `def polite(func):
    def wrapper(name):
        print("Dear customer,")
        ______
    return wrapper`,
    question: "Choose the missing line:",
    options: {
      A: "return name",
      B: "print(name)",
      C: "func(name)",
    },
    correct: "C",
  },
  {
    id: 3,
    code: `def syrup(func):
    def wrapper(drink):
        result = func(drink)
        ______
    return wrapper`,
    question: "Choose the missing line:",
    options: {
      A: 'print(result + ", with syrup")',
      B: 'return result + ", with syrup"',
      C: "func(result)",
    },
    correct: "B",
  },
];

const predictOutputTasks = [
  {
    id: 1,
    code: `def coffee_style(func):
    def wrapper():
        print("Cup")
        func()
        print("Saucer")
    return wrapper

@coffee_style
def pour_coffee():
    print("Latte")

pour_coffee()`,
    question: "What is printed?",
    options: {
      A: ["Cup", "Latte", "Saucer"],
      B: ["Latte", "Cup", "Saucer"],
      C: ["Cup", "Saucer", "Latte"],
      D: ["Error"],
    },
    correct: "A",
  },
  {
    id: 2,
    code: `def plus_five(func):
    def wrapper(x):
        return func(x) + 5
    return wrapper

@plus_five
def triple(x):
    return x * 3

print(triple(2))`,
    question: "What is printed?",
    options: {
      A: ["5"],
      B: ["6"],
      C: ["11"],
      D: ["15"],
    },
    correct: "C",
  },
  {
    id: 3,
    code: `def burger_style(func):
    def wrapper(bun, patty):
        print(f"Top {bun} bun")
        func(bun, patty)
        print(f"Bottom {bun} bun")
    return wrapper

@burger_style
def make_burger(bun, patty):
    print(f"{patty} patty inside")

make_burger("brown", "beef")`,
    question: "What is printed?",
    options: {
      A: ["beef patty inside", "Top brown bun", "Bottom brown bun"],
      B: ["Top brown bun", "Bottom brown bun", "beef patty inside"],
      C: ["Top brown bun", "beef patty inside", "Bottom brown bun"],
      D: ["Error"],
    },
    correct: "C",
  },
];

const findMistakeTasks = [
  {
    id: 1,
    code: `def cake_style(func):
    def wrapper():
        print("Cream")
        func()
        print("Cream")
    return func`,
    question: "What is the mistake?",
    options: {
      A: "Decorators cannot print text",
      B: "It should return wrapper, not func",
      C: "func() must have two arguments",
    },
    correct: "B",
  },
  {
    id: 2,
    code: `def checker(func):
    def wrapper():
        print("Checking...")
        return func()
        print("Done")
    return wrapper`,
    question: "What is the mistake?",
    options: {
      A: "return func() is invalid",
      B: "Decorators cannot use return",
      C: '"Done" will never be printed because it is after return',
    },
    correct: "C",
  },
  {
    id: 3,
    code: `def tea_style(func):
    def wrapper():
        print("Cup ready")
    return wrapper

@tea_style
def serve_tea():
    print("Green tea")`,
    question: "What is the mistake?",
    options: {
      A: "serve_tea must return a number",
      B: "The wrapper never calls func()",
      C: "@tea_style must be written after the function call",
    },
    correct: "B",
  },
];

const reorderLinesTasks = [
  {
    id: 1,
    title: 'Build a decorator: "fries_box"',
    lines: [
      { id: "1", text: "return wrapper" },
      { id: "2", text: "def fries_box(func):" },
      { id: "3", text: 'print("Fries ready")' },
      { id: "4", text: "def wrapper():" },
      { id: "5", text: "func()" },
    ],
    correctOrder: ["2", "4", "3", "5", "1"],
  },
  {
    id: 2,
    title: 'Build a decorator with argument: "label"',
    lines: [
      { id: "1", text: "return wrapper" },
      { id: "2", text: "func(name)" },
      { id: "3", text: "def wrapper(name):" },
      { id: "4", text: 'print("Message")' },
      { id: "5", text: "def label(func):" },
    ],
    correctOrder: ["5", "3", "4", "2", "1"],
  },
  {
    id: 3,
    title: 'Build a decorator that changes the result: "extra_cheese"',
    lines: [
      { id: "1", text: "return wrapper" },
      { id: "2", text: "def extra_cheese(func):" },
      { id: "3", text: "return func(price) + 2" },
      { id: "4", text: "def wrapper(price):" },
    ],
    correctOrder: ["2", "4", "3", "1"],
  },
];

const codingTasks = [
  {
    id: 1,
    title: "Tea tray",
    description:
      "Write a decorator with_tray(func) that prints [tray] before the function call and [/tray] after it. The decorated function takes no arguments.",
    expectedOutput: `[tray]
Green tea
[/tray]`,
    starterCode: `def with_tray(func):
    # write your code here
    pass


def serve_tea():
    print("Green tea")


decorated = with_tray(serve_tea)
decorated()

# Expected output:
# [tray]
# Green tea
# [/tray]`,
    solution: `def with_tray(func):
    def wrapper():
        print("[tray]")
        func()
        print("[/tray]")
    return wrapper`,
  },
  {
    id: 2,
    title: "Greeting label",
    description:
      "Write a decorator label_greeting(func) that prints Greeting: before calling the function. The decorated function takes one argument: name.",
    expectedOutput: `Greeting:
Hello, Anna!`,
    starterCode: `def label_greeting(func):
    # write your code here
    pass


def greet(name):
    print(f"Hello, {name}!")


decorated = label_greeting(greet)
decorated("Anna")

# Expected output:
# Greeting:
# Hello, Anna!`,
    solution: `def label_greeting(func):
    def wrapper(name):
        print("Greeting:")
        func(name)
    return wrapper`,
  },
  {
    id: 3,
    title: "Extra topping price",
    description:
      "Write a decorator extra_topping(func) that adds 2 to the numeric result of the original function. For example, if the function returns 5, the decorated version should return 7.",
    expectedOutput: `7`,
    starterCode: `def extra_topping(func):
    # write your code here
    pass


def dessert_price(price):
    return price


decorated = extra_topping(dessert_price)
print(decorated(5))

# Expected output:
# 7`,
    solution: `def extra_topping(func):
    def wrapper(price):
        return func(price) + 2
    return wrapper`,
  },
  {
    id: 4,
    title: "Safe divide",
    description:
      'Write a decorator safe_divide(func) that checks the second argument. If it is 0, return "Cannot divide by zero". Otherwise, call the original function.',
    expectedOutput: `5.0
Cannot divide by zero`,
    starterCode: `def safe_divide(func):
    # write your code here
    pass


def divide(a, b):
    return a / b


decorated = safe_divide(divide)

print(decorated(10, 2))
print(decorated(10, 0))

# Expected output:
# 5.0
# Cannot divide by zero`,
    solution: `def safe_divide(func):
    def wrapper(a, b):
        if b == 0:
            return "Cannot divide by zero"
        return func(a, b)
    return wrapper`,
  },
  {
    id: 5,
    title: "Burger order",
    description:
      "Write a decorator burger_style(func) that prints the top bun before the function call and the bottom bun after it. The decorated function takes two arguments: bun and patty. The original function should print patty inside.",
    expectedOutput: `Top white bun
chicken patty inside
Bottom white bun
Top brown bun
beef patty inside
Bottom brown bun`,
    starterCode: `def burger_style(func):
    # write your code here
    pass


def make_burger(bun, patty):
    print(f"{patty} patty inside")


decorated = burger_style(make_burger)

decorated("white", "chicken")
decorated("brown", "beef")

# Expected output:
# Top white bun
# chicken patty inside
# Bottom white bun
# Top brown bun
# beef patty inside
# Bottom brown bun`,
    solution: `def burger_style(func):
    def wrapper(bun, patty):
        print(f"Top {bun} bun")
        func(bun, patty)
        print(f"Bottom {bun} bun")
    return wrapper`,
  },
];

const callsCode = `make_burger("white", "chicken")   # prints top bun + chicken patty + bottom bun
make_burger("brown", "beef")      # prints top bun + beef patty + bottom bun
make_burger("white", "pork")      # prints top bun + pork patty + bottom bun`;

const timingCode = `import time

def timing(func):
    def wrapper():
        start = time.time()
        func()
        end = time.time()
        print("Took", end - start, "seconds")
    return wrapper`;

const decoratorLessonData = {
  slug: "decorator",
  sections: [
{
  type: "intro",
  props: {
    imageSrc: decoratorHero,
    imageAlt: "Decorator lesson hero illustration",
    description:
      "Decorators let you add extra behavior to a function without changing the function itself. In real Python, this is useful for logging, timing, access checks, caching, validation, and formatting output.",
  },
},
    {
  type: "theory",
  props: {
    badge: "Theory",
    title: "First of all, why do we call it a decorator?",
    paragraphs: [
      "Because it decorates a function.",
      "You already have the function itself — that is the main thing. Then you wrap something extra around it.",
      "A decorator is like building a burger.",
      "The patty is the original function: it does the main job.",
      "The top bun and bottom bun are the extra behavior around it: something happens before and after the main part.",
      "So the function stays the function — but now it comes with extra layers.",
      "In other words, the burger is still a burger. It just got promoted.",
      "Now, let's look at a decorator using a tasty metaphor.",
    ],
  },
},
    {
      type: "codeExample",
      props: {
        burgerCode,
      },
    },
    {
  type: "howItWorks",
  props: {
    badge: "In plain words",
    title: "How it works",
    steps: [
      "burger_style(func) runs once and takes the original function.",
      "Inside it, Python creates the inner function wrapper().",
      "wrapper() prints the top bun, then calls the original function, then prints the bottom bun.",
      "burger_style returns the wrapper function, so the original function gets replaced with the wrapped version.",
      "When you call make_burger() later, you are actually calling the wrapped version.",
    ],
  },
},
    {
      type: "diagram",
      props: {
        burgerCard,
      },
    },
    {
      type: "calls",
      props: {
        callsCode,
      },
    },
    {
  type: "explanation",
  props: {
    badge: "Explanation",
    title: "What is happening here?",
    items: [
      "@burger_style means that make_burger is passed into the decorator and replaced with the wrapped version.",
      'make_burger("white", "chicken") → the wrapper runs first, prints "Top white bun", then calls the original function, which prints "chicken patty" inside, then prints "Bottom white bun".',
      'make_burger("brown", "beef") → works the same way, but now with "brown" and "beef".',
      'make_burger("white", "pork") → again, the decorator adds the top and bottom bun, while the original function provides the patty inside.',
      "So the decorator adds extra behavior around the original function, like wrapping the filling inside the bun.",
    ],
  },
},
{
  type: "practice",
  props: {
    predictOutputProps: {
      badge: "Practice",
      title: "Predict the output",
      description: "Read the decorator code and choose what will be printed.",
      tasks: predictOutputTasks,
    },
    fillMissingLineProps: {
      badge: "Practice",
      title: "Fill the missing line",
      description:
        "Look at the decorator code and choose the line that completes it correctly.",
      tasks: fillMissingLineTasks,
    },
    findMistakeProps: {
      badge: "Practice",
      title: "Find the mistake",
      description: "Read the decorator code and choose what is wrong in it.",
      tasks: findMistakeTasks,
    },
    reorderLinesProps: {
      badge: "Practice",
      title: "Reorder lines",
      description:
        "Drag the lines into the correct order to build a working decorator.",
      tasks: reorderLinesTasks,
    },
    codingTasksProps: {
      badge: "Practice",
      title: "Coding tasks",
      description: "",
      tasks: codingTasks,
    },
  },
},
    {
  type: "realCode",
  props: {
    badge: "In practice",
    title: "Decorators in real code",
    introParagraphs: [
      "Decorators are useful because they let you add reusable behavior around a function.",
      "Instead of rewriting the same code before and after many functions, you write it once in a decorator and apply it wherever needed.",
      "They show up all the time in real code:",
    ],
    listItems: [
      "logging (print or save information about function calls)",
      "timing (measure how long something takes)",
      "access checks (allow only certain users)",
      "validation (check inputs before running code)",
      "caching (save results of expensive functions)",
      "web frameworks, where routes and permissions are often decorators",
    ],
    miniTitle: "Real example: timing a function",
    exampleParagraphs: [
      "You want to know how long a function takes.",
      "Instead of editing every function manually, you can write one decorator and reuse it.",
    ],
    code: timingCode,
    outroParagraphs: [
      "Now you can decorate any function you want to measure.",
    ],
    calloutTitle: "What's the decorator here?",
    calloutParagraphs: [
      "timing is the decorator.",
      "It takes the original function, wraps it inside wrapper, adds timing logic, and returns the wrapped version.",
      "So the original function still does its own job — the decorator just adds an extra layer around it.",
    ],
  },
},
    {
  type: "finishing",
  props: {
    badge: "Done",
    title: "Keep going!",
    paragraphs: [
      "You finished the decorator lesson. Now you know how decorators wrap functions, add extra behavior, and make code cleaner.",
      "Nice work — the original function still does its own job, and the decorator simply adds an extra layer around it.",
    ],
    imageSrc: lessonFinish,
    imageAlt: "Lesson completed illustration",
  },
},
  ],
};

export default decoratorLessonData;