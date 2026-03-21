import closureHero from "../../../../assets/1_Closure/Closure_hero.png";
import closureCard from "../../../../assets/1_Closure/Closure_1.png";
import closureFinish from "../../../../assets/1_Closure/Closure_final.png";


const closureExampleCode = `def make_bun(kind):
    def add_jam(flavor):
        print(f"{kind} bun with {flavor}")
    return add_jam


white_bun = make_bun("white")
brown_bun = make_bun("brown")

white_bun("strawberry")
brown_bun("cherry")`;

const closureCallsCode = `white_bun = make_bun("white")
brown_bun = make_bun("brown")

white_bun("strawberry")   # white bun with strawberry
brown_bun("cherry")       # brown bun with cherry`;

const discountCode = `def make_discount(percent):
    def apply(price):
        return round(price * (1 - percent), 2)
    return apply


black_friday = make_discount(0.30)

print(black_friday(100))
print(black_friday(80))`;

const predictOutputTasks = [
  {
    id: 1,
    code: `def make_pancake(thickness):
    def add_fill(fill):
        print(f"{thickness} pancake with {fill}")
    return add_fill


thin = make_pancake("thin")
thick = make_pancake("thick")

thin("chocolate")
thick("chocolate")
thick("berry")`,
    question: "What is printed?",
    options: {
      A: [
        "thin pancake with chocolate",
        "thick pancake with berry",
        "thick pancake with chocolate",
      ],
      B: [
        "thin pancake with berry",
        "thick pancake with berry",
        "thick pancake with chocolate",
      ],
      C: [
        "thin pancake with chocolate",
        "thick pancake with chocolate",
        "thick pancake with berry",
      ],
      D: ["Error"],
    },
    correct: "C",
  },
  {
    id: 2,
    code: `def make_spice(level):
    def label(dish):
        print(f"{dish}: {level} spicy")
    return label


mild_noodles = make_spice("mild")
hot_noodles = make_spice("hot")
hot_soup = make_spice("hot")

mild_noodles("noodles")
hot_noodles("noodles")
hot_soup("soup")`,
    question: "What is printed?",
    options: {
      A: [
        "noodles: mild spicy",
        "noodles: hot spicy",
        "soup: hot spicy",
      ],
      B: [
        "noodles: mild spicy",
        "noodles: mild spicy",
        "soup: mild spicy",
      ],
      C: [
        "noodles: hot spicy",
        "noodles: mild spicy",
        "soup: hot spicy",
      ],
      D: ["Error"],
    },
    correct: "A",
  },
  {
    id: 3,
    code: `def outer(x):
    def inner(y):
        return x + y
    return inner


add2 = outer(2)
print(add2(0), add2(2), add2(3), sep=", ")`,
    question: "What is printed?",
    options: {
      A: ["2, 3, 1"],
      B: ["2, 5, 6"],
      C: ["2, 4, 5"],
      D: ["Error"],
    },
    correct: "C",
  },
];

const fillMissingLineTasks = [
  {
    id: 1,
    code: `def make_sauce(kind):
    def pour(dish):
        return f"{dish} with {kind}"
    ______`,
    question: "Choose the missing line:",
    options: {
      A: "return pour",
      B: "return pour()",
      C: "return sauce",
    },
    correct: "A",
  },
  {
    id: 2,
    code: `def make_counter():
    n = 0

    def add():
        ______
        n += 1
        return n

    return add`,
    question: "Choose the missing line:",
    options: {
      A: "nonlocal n",
      B: "global n",
      C: "local n",
    },
    correct: "A",
  },
  {
    id: 3,
    code: `def make_funcs():
    funcs = []

    for i in range(3):
        funcs.append(lambda ______: i)

    return funcs`,
    question: "Choose the missing line:",
    options: {
      A: "i=i",
      B: "i",
      C: "*i",
    },
    correct: "A",
  },
];

const findMistakeTasks = [
  {
    id: 1,
    code: `def make_label(kind):
    def apply(item):
        return f"{kind}: {item}"
    return apply()`,
    question: "What is the mistake?",
    options: {
      A: "It returns apply() instead of returning the function apply",
      B: "kind must be global",
      C: "f-strings can’t be used inside closures",
    },
    correct: "A",
  },
  {
    id: 2,
    code: `def make_counter():
    count = 0

    def add():
        count += 1
        return count

    return add`,
    question: "What is the mistake?",
    options: {
      A: "count += 1 tries to assign to count, so Python treats it as local; needs nonlocal count",
      B: "count must be a list",
      C: "Closures can’t change values",
    },
    correct: "A",
  },
  {
    id: 3,
    code: `def make_funcs():
    funcs = []

    for i in range(3):
        funcs.append(lambda: i)

    return funcs`,
    question: "What is the mistake?",
    options: {
      A: "All functions return the same final i value (late binding)",
      B: "append can’t store functions",
      C: "range(3) is invalid",
    },
    correct: "A",
  },
];

const reorderLinesTasks = [
  {
    id: 1,
    title: 'Build a closure: "make_tea"',
    lines: [
      { id: "1", text: "return brew" },
      { id: "2", text: "def brew(strength):" },
      { id: "3", text: 'return f"{leaf} tea, {strength}"' },
      { id: "4", text: "def make_tea(leaf):" },
    ],
    correctOrder: ["4", "2", "3", "1"],
  },
  {
    id: 2,
    title: 'Build a closure: "make_discount"',
    lines: [
      { id: "1", text: "return apply" },
      { id: "2", text: "return round(price * (1 - percent), 2)" },
      { id: "3", text: "def apply(price):" },
      { id: "4", text: "def make_discount(percent):" },
    ],
    correctOrder: ["4", "3", "2", "1"],
  },
  {
    id: 3,
    title: 'Build a closure with state: "make_points"',
    lines: [
      { id: "1", text: "return add" },
      { id: "2", text: "total += points" },
      { id: "3", text: "def add(points):" },
      { id: "4", text: "total = 0" },
      { id: "5", text: "nonlocal total" },
      { id: "6", text: "def make_points():" },
      { id: "7", text: "return total" },
    ],
    correctOrder: ["6", "4", "3", "5", "2", "7", "1"],
  },
];

const codingTasks = [
  {
    id: 1,
    title: "Tea brewer",
    description:
      'Write make_tea(leaf) that returns a function brew(strength) which returns "{leaf} tea, {strength}".',
    expectedOutput: `green tea, strong
black tea, light`,
    starterCode: `def make_tea(leaf):
    # write your code here
    pass


green_tea = make_tea("green")
print(green_tea("strong"))

black_tea = make_tea("black")
print(black_tea("light"))

# Expected output:
# green tea, strong
# black tea, light`,
    solution: `def make_tea(leaf):
    def brew(strength):
        return f"{leaf} tea, {strength}"
    return brew`,
  },
  {
    id: 2,
    title: "Discount maker",
    description:
      "Write make_discount(percent) where percent is like 0.20 for 20%. Return a function that applies the discount and rounds to 2 decimals.",
    expectedOutput: `80.0
68.0`,
    starterCode: `def make_discount(percent):
    # write your code here
    pass


discount_20 = make_discount(0.20)
print(discount_20(100))

discount_15 = make_discount(0.15)
print(discount_15(80))

# Expected output:
# 80.0
# 68.0`,
    solution: `def make_discount(percent):
    def apply(price):
        return round(price * (1 - percent), 2)
    return apply`,
  },
  {
    id: 3,
    title: "Spice level labeler",
    description:
      'Write make_spice(level) returning a function that formats "{dish}: {level} spicy".',
    expectedOutput: `Soup: mild spicy
Tacos: hot spicy`,
    starterCode: `def make_spice(level):
    # write your code here
    pass


mild = make_spice("mild")
print(mild("Soup"))

hot = make_spice("hot")
print(hot("Tacos"))

# Expected output:
# Soup: mild spicy
# Tacos: hot spicy`,
    solution: `def make_spice(level):
    def label(dish):
        return f"{dish}: {level} spicy"
    return label`,
  },
  {
    id: 4,
    title: "Cookie counter",
    description:
      "Write make_cookie_counter() returning bake(batch) that accumulates total cookies baked.",
    expectedOutput: `12
20
25`,
    starterCode: `def make_cookie_counter():
    # write your code here
    pass


counter = make_cookie_counter()

print(counter(12))
print(counter(8))
print(counter(5))

# Expected output:
# 12
# 20
# 25`,
    solution: `def make_cookie_counter():
    total = 0

    def bake(batch):
        nonlocal total
        total += batch
        return total

    return bake`,
  },
  {
    id: 5,
    title: "Fix the loop closure bug",
    description:
      "Create a list of 3 functions so that calling them returns [0, 1, 2].",
    expectedOutput: `[0, 1, 2]`,
    starterCode: `def make_funcs():
    # write your code here
    pass


funcs = make_funcs()
result = [fn() for fn in funcs]
print(result)

# Expected output:
# [0, 1, 2]`,
    solution: `def make_funcs():
    funcs = []

    for i in range(3):
        funcs.append(lambda i=i: i)

    return funcs`,
  },
];

const closureLessonData = {
  slug: "closure",
  sections: [
    {
  type: "intro",
  props: {
    imageSrc: closureHero,
    imageAlt: "Dreamy closure lesson hero illustration",
    description:
      "Closures help functions remember context. In real Python, this is useful in decorators, callbacks, factory functions, and small stateful tools.",
  },
},
    {
      type: "theory",
      props: {
        badge: "Theory",
        title: "First of all, why do we call a closure a closure?",
        paragraphs: [
          "We have two functions: an outer function and an inner function.",
          "The inner function captures variables from the outer one.",
          "Those captured values are closed inside the function that gets returned — so the function comes with built-in memory. That’s a closure.",
          "In other words, make_bun() may be finished, but the filling is still there.",
          "Now, let’s look at a closure using a tasty metaphor.",
        ],
      },
    },
    {
      type: "codeExample",
      props: {
        burgerCode: closureExampleCode,
      },
    },
    {
  type: "howItWorks",
  props: {
    badge: "In plain words",
    title: "How it works",
    steps: [
      "make_bun(kind) runs once and creates the inner function add_jam.",
      "add_jam(flavor) can use kind because it was captured from the outer function.",
      "make_bun returns the add_jam function, so you can call it later.",
      "The returned function remembers the kind you used — like saving a recipe.",
    ],
  },
},
{
  type: "diagram",
  props: {
    burgerCard: closureCard,
  },
},
{
  type: "calls",
  props: {
    callsCode: closureCallsCode,
  },
},
    {
      type: "explanation",
      props: {
        badge: "Explanation",
        title: "What is happening here?",
        items: [
          'white_bun = make_bun("white") returns a function that has kind = "white" stored inside.',
          'white_bun("strawberry") uses the saved kind together with the new flavor and prints "white bun with strawberry".',
          'brown_bun("cherry") uses saved kind = "brown" and prints "brown bun with cherry".',
          "The outer function finishes, but the returned inner function still remembers the value it captured.",
          "If you’re suddenly hungry for a bun with jam — perfect. That means the metaphor worked… and the closure probably did too.",
        ],
      },
    },
    {
      type: "practice",
      props: {
        predictOutputProps: {
          badge: "Practice",
          title: "Predict the output",
          description: "Read the closure code and choose what will be printed.",
          tasks: predictOutputTasks,
        },
        fillMissingLineProps: {
          badge: "Practice",
          title: "Fill the missing line",
          description:
            "Look at the closure code and choose the line that completes it correctly.",
          tasks: fillMissingLineTasks,
        },
        findMistakeProps: {
          badge: "Practice",
          title: "Find the mistake",
          description: "Read the closure code and choose what is wrong in it.",
          tasks: findMistakeTasks,
        },
        reorderLinesProps: {
          badge: "Practice",
          title: "Reorder lines",
          description:
            "Drag the lines into the correct order to build a working closure.",
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
        title: "Closures in real code",
        introParagraphs: [
          "Closures are useful because they let you create a function with memory.",
          "Instead of passing the same parameters again and again, you pre-configure a function once, and it remembers the values it needs.",
          "They show up all the time in real code:",
        ],
        listItems: [
          "callbacks and event handlers (something runs later, but still needs context)",
          "decorators (built on closures)",
          "factory functions (creating specialized functions)",
          "counters / simple state without classes",
        ],
        miniTitle: "Practical example: make a discount function",
        exampleParagraphs: [
          "You choose the discount once, then reuse the function everywhere.",
        ],
        code: discountCode,
        outroParagraphs: [],
        calloutTitle: "What’s the closure here?",
        calloutParagraphs: [
          "black_friday is a function that remembers percent = 0.30.",
          "That’s why it can apply the same discount later, without you passing 0.30 every time.",
        ],
      },
    },
    {
  type: "finishing",
  props: {
    badge: "Done",
    title: "Keep going!",
    paragraphs: [
      "You finished the closure lesson. Now you know how an inner function can remember values from the outer one.",
      "That memory makes closures useful for reusable tools, counters, decorators, callbacks, and small factory functions.",
    ],
    imageSrc: closureFinish,
    imageAlt: "Closure lesson completed illustration",
  },
},
  ],
};

export default closureLessonData;