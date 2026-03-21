import lambdaCard from "../../../../assets/4_Lambda/Lambda_1.png";
import lambdaFinish from "../../../../assets/4_Lambda/Lambda_finishing.png";
import lambdaHero from "../../../../assets/4_Lambda/Lambda_hero.png";

const lambdaExampleCode = `pastries = [
    ("croissant", 3.5),
    ("muffin", 2.7),
    ("brownie", 2.8),
    ("eclair", 3.2),
]

by_price = sorted(pastries, key=lambda item: item[1])
print(by_price)

by_name_length = sorted(pastries, key=lambda item: len(item[0]))
print(by_name_length)`;

const lambdaCallsCode = `pastries = [
    ("croissant", 3.5),
    ("muffin", 2.7),
    ("brownie", 2.8),
    ("eclair", 3.2),
]

print(sorted(pastries, key=lambda item: item[1]))
# [('muffin', 2.7), ('brownie', 2.8), ('eclair', 3.2), ('croissant', 3.5)]

print(sorted(pastries, key=lambda item: len(item[0])))
# [('muffin', 2.7), ('eclair', 3.2), ('brownie', 2.8), ('croissant', 3.5)]`;

const usersByScoreCode = `users = [
    {"name": "Anna", "score": 88},
    {"name": "Mark", "score": 72},
    {"name": "Ira", "score": 95},
]

sorted_users = sorted(users, key=lambda user: user["score"])
print(sorted_users)`;

const predictOutputTasks = [
  {
    id: 1,
    code: `drinks = [("latte", 4.5), ("tea", 2.0), ("mocha", 4.0)]
print(sorted(drinks, key=lambda item: item[1]))`,
    question: "What is printed?",
    options: {
      A: ["[('latte', 4.5), ('mocha', 4.0), ('tea', 2.0)]"],
      B: ["[('tea', 2.0), ('mocha', 4.0), ('latte', 4.5)]"],
      C: ["[('tea', 2.0), ('latte', 4.5), ('mocha', 4.0)]"],
      D: ["Error"],
    },
    correct: "B",
  },
  {
    id: 2,
    code: `words = ["banana", "fig", "apple", "kiwi"]
print(sorted(words, key=lambda word: len(word)))`,
    question: "What is printed?",
    options: {
      A: ["['fig', 'kiwi', 'apple', 'banana']"],
      B: ["['kiwi', 'fig', 'apple', 'banana']"],
      C: ["['banana', 'apple', 'kiwi', 'fig']"],
      D: ["Error"],
    },
    correct: "A",
  },
  {
    id: 3,
    code: `desserts = [("cake", 5, 450), ("pie", 4, 380), ("tart", 6, 320)]
print(sorted(desserts, key=lambda item: item[1]))`,
    question: "What is printed?",
    options: {
      A: ["[('tart', 6, 320), ('pie', 4, 380), ('cake', 5, 450)]"],
      B: ["[('pie', 4, 380), ('cake', 5, 450), ('tart', 6, 320)]"],
      C: ["[('cake', 5, 450), ('pie', 4, 380), ('tart', 6, 320)]"],
      D: ["Error"],
    },
    correct: "B",
  },
];

const fillMissingLineTasks = [
  {
    id: 1,
    code: `pastries = [("croissant", 3.5), ("brownie", 2.8), ("eclair", 3.2)]
result = sorted(pastries, key=lambda item: ______)
print(result)`,
    question: "Choose the missing part:",
    options: {
      A: "item[0]",
      B: "item[1]",
      C: "len(item)",
    },
    correct: "B",
  },
  {
    id: 2,
    code: `words = ["banana", "fig", "apple", "kiwi"]
result = sorted(words, key=______)
print(result)`,
    question: "Choose the missing part:",
    options: {
      A: "lambda word: len(word)",
      B: "lambda: len(word)",
      C: "len(word)",
    },
    correct: "A",
  },
  {
    id: 3,
    code: `orders = [{"name": "tea", "price": 2}, {"name": "cake", "price": 5}]
result = sorted(orders, key=lambda item: ______)
print(result)`,
    question: "Choose the missing part:",
    options: {
      A: "item[0]",
      B: 'item["price"]',
      C: "price[item]",
    },
    correct: "B",
  },
];

const findMistakeTasks = [
  {
    id: 1,
    code: `nums = [5, 2, 9, 1]
print(sorted(nums, key=lambda x: x))`,
    question: "What is true about this code?",
    options: {
      A: "It is correct",
      B: "It is wrong because lambda cannot be used with numbers",
      C: "It is wrong because sorted() cannot use key=",
    },
    correct: "A",
  },
  {
    id: 2,
    code: `words = ["tea", "espresso", "latte"]
print(sorted(words, key=len(words)))`,
    question: "What is the mistake?",
    options: {
      A: "sorted() cannot sort strings",
      B: "len(words) is a value, not a function to apply to each item",
      C: "key= must always use lambda",
    },
    correct: "B",
  },
  {
    id: 3,
    code: `drinks = [("tea", 2.0), ("cake", 5.0)]
print(sorted(drinks, key=lambda item: item[2]))`,
    question: "What is the problem?",
    options: {
      A: "Tuples cannot be sorted",
      B: "item[2] does not exist in a 2-element tuple",
      C: "lambda cannot return numbers",
    },
    correct: "B",
  },
];

const reorderLinesTasks = [
  {
    id: 1,
    title: "Build a sorting expression: sort pastries by price",
    lines: [
      { id: "1", text: 'pastries = [("croissant", 3.5), ("brownie", 2.8)]' },
      { id: "2", text: "print(result)" },
      { id: "3", text: "result = sorted(pastries, key=lambda item: item[1])" },
    ],
    correctOrder: ["1", "3", "2"],
  },
  {
    id: 2,
    title: "Build a sorting expression: sort words by length",
    lines: [
      { id: "1", text: 'words = ["tea", "espresso", "latte"]' },
      { id: "2", text: "print(sorted(words, key=lambda word: len(word)))" },
    ],
    correctOrder: ["1", "2"],
  },
  {
    id: 3,
    title: "Build a sorting expression: sort dictionaries by price",
    lines: [
      {
        id: "1",
        text: 'orders = [{"name": "tea", "price": 2}, {"name": "cake", "price": 5}]',
      },
      {
        id: "2",
        text: 'result = sorted(orders, key=lambda item: item["price"])',
      },
      { id: "3", text: "print(result)" },
    ],
    correctOrder: ["1", "2", "3"],
  },
];

const codingTasks = [
  {
    id: 1,
    title: "Sort drinks by price",
    description:
      'Write a function sort_by_price(drinks) that returns the list sorted by price in ascending order. Each item is a tuple like ("latte", 4.5).',
    expectedOutput: `[('tea', 2.0), ('mocha', 4.0), ('latte', 4.5)]`,
    starterCode: `def sort_by_price(drinks):
    # write your code here
    pass


drinks = [("latte", 4.5), ("tea", 2.0), ("mocha", 4.0)]
print(sort_by_price(drinks))

# Expected output:
# [('tea', 2.0), ('mocha', 4.0), ('latte', 4.5)]`,
    solution: `def sort_by_price(drinks):
    return sorted(drinks, key=lambda item: item[1])`,
  },
  {
    id: 2,
    title: "Sort words by length",
    description:
      "Write a function sort_by_length(words) that returns the list of words sorted by length.",
    expectedOutput: `['fig', 'kiwi', 'apple', 'banana']`,
    starterCode: `def sort_by_length(words):
    # write your code here
    pass


words = ["banana", "fig", "apple", "kiwi"]
print(sort_by_length(words))

# Expected output:
# ['fig', 'kiwi', 'apple', 'banana']`,
    solution: `def sort_by_length(words):
    return sorted(words, key=lambda word: len(word))`,
  },
  {
    id: 3,
    title: "Sort desserts by calories",
    description:
      'Write a function sort_by_calories(desserts) that returns the list sorted by calories. Each item is a tuple like ("cake", 450).',
    expectedOutput: `[('tart', 320), ('pie', 380), ('cake', 450)]`,
    starterCode: `def sort_by_calories(desserts):
    # write your code here
    pass


desserts = [("cake", 450), ("pie", 380), ("tart", 320)]
print(sort_by_calories(desserts))

# Expected output:
# [('tart', 320), ('pie', 380), ('cake', 450)]`,
    solution: `def sort_by_calories(desserts):
    return sorted(desserts, key=lambda item: item[1])`,
  },
  {
    id: 4,
    title: "Sort students by age",
    description:
      'Write a function sort_students_by_age(students) that returns the list sorted by the "age" field. Each item is a dictionary like {"name": "Anna", "age": 21}.',
    expectedOutput: `[{'name': 'Mark', 'age': 19}, {'name': 'Anna', 'age': 21}, {'name': 'Ira', 'age': 23}]`,
    starterCode: `def sort_students_by_age(students):
    # write your code here
    pass


students = [
    {"name": "Anna", "age": 21},
    {"name": "Mark", "age": 19},
    {"name": "Ira", "age": 23},
]

print(sort_students_by_age(students))

# Expected output:
# [{'name': 'Mark', 'age': 19}, {'name': 'Anna', 'age': 21}, {'name': 'Ira', 'age': 23}]`,
    solution: `def sort_students_by_age(students):
    return sorted(students, key=lambda item: item["age"])`,
  },
  {
    id: 5,
    title: "Sort menu by name length",
    description:
      "Write a function sort_menu_by_name_length(menu) that returns the list sorted by the length of the dish name. Each item is a string.",
    expectedOutput: `['tea', 'soup', 'cake', 'espresso']`,
    starterCode: `def sort_menu_by_name_length(menu):
    # write your code here
    pass


menu = ["soup", "espresso", "cake", "tea"]
print(sort_menu_by_name_length(menu))

# Expected output:
# ['tea', 'soup', 'cake', 'espresso']`,
    solution: `def sort_menu_by_name_length(menu):
    return sorted(menu, key=lambda item: len(item))`,
  },
];

const lambdaAndKeyLessonData = {
  slug: "lambda-and-key",
  sections: [
    {
      type: "intro",
      props: {
        imageSrc: lambdaHero,
        imageAlt: "Lambda lesson hero illustration",
        description:
          "lambda and key= help Python sort data in a custom way. In real Python, this is useful when you want to sort not just simple numbers or words, but more complex things: lists of students, products, files, orders, or dictionaries.",
      },
    },
    {
      type: "theory",
      props: {
        badge: "Theory",
        title: "First of all, sorting sounds easy.",
        paragraphs: [
          "And sometimes it is.",
          "If you have just numbers, Python already knows what to do.",
          "Easy. Clean. No drama.",
          "But real data is often messier.",
          "Sometimes you have a list of tuples, and you want to sort by the second element.",
          "Sometimes you have a list of words, and you want to sort by length.",
          "Sometimes you have a menu, and you want to sort drinks by price, not by name.",
          "That is where key= becomes useful.",
          "A good tasty metaphor here is a bakery display.",
          "The pastries themselves stay the same. What changes is the rule we use to arrange them.",
          "That rule is like key=.",
          "And lambda? lambda is just a quick little function — a tiny instruction you write on the spot.",
          "So: key= = the sorting rule, lambda = a quick way to define that rule.",
          "In other words, the pastries are not changing. You are just telling Python which pastry drama matters most.",
        ],
      },
    },
    {
      type: "codeExample",
      props: {
        burgerCode: lambdaExampleCode,
      },
    },
    {
      type: "howItWorks",
      props: {
        badge: "In plain words",
        title: "How it works",
        steps: [
          "pastries is a list of tuples.",
          "Each tuple contains two things: pastry name and pastry price.",
          "sorted(pastries, key=lambda item: item[1]) means: sort the pastries by the second element in each tuple, which is the price.",
          "lambda item: item[1] is a tiny function that takes one tuple and returns its price.",
          "sorted(pastries, key=lambda item: len(item[0])) means: sort the pastries by the length of the pastry name.",
          "lambda item: len(item[0]) takes one tuple and returns the length of its name.",
          "So key= tells Python what value to use for comparison, and lambda is a short way to define that value.",
        ],
      },
    },
    {
      type: "diagram",
      props: {
        burgerCard: lambdaCard,
      },
    },
    {
      type: "calls",
      props: {
        callsCode: lambdaCallsCode,
      },
    },
    {
      type: "explanation",
      props: {
        badge: "Explanation",
        title: "What is happening here?",
        items: [
          "sorted(pastries, key=lambda item: item[1]) means Python looks at each tuple and uses the price for sorting.",
          '("croissant", 3.5) gives 3.5, ("brownie", 2.8) gives 2.8, and so on — that is why the cheapest pastry comes first.',
          "sorted(pastries, key=lambda item: len(item[0])) means Python looks at each tuple and uses the length of the pastry name for sorting.",
          '"muffin" and "eclair" both have 6 letters, "brownie" has 8, and "croissant" has 10.',
          "So the pastries are sorted not by price and not alphabetically, but by name length.",
          "lambda is just a short helper function used right inside sorted().",
          "If bakery sorting now feels strangely powerful, excellent. That means the metaphor is doing its honest carbohydrate-based work.",
        ],
      },
    },
    {
      type: "practice",
      props: {
        predictOutputProps: {
          badge: "Practice",
          title: "Predict the output",
          description: "Read the sorting code and choose what will be printed.",
          tasks: predictOutputTasks,
        },
        fillMissingLineProps: {
          badge: "Practice",
          title: "Fill the missing line",
          description:
            "Look at the sorting code and choose the missing part.",
          tasks: fillMissingLineTasks,
        },
        findMistakeProps: {
          badge: "Practice",
          title: "Find the mistake",
          description: "Read the sorting code and choose what is wrong in it.",
          tasks: findMistakeTasks,
        },
        reorderLinesProps: {
          badge: "Practice",
          title: "Reorder lines",
          description:
            "Drag the lines into the correct order to build a working sorting expression.",
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
        title: "lambda and key= in real code",
        introParagraphs: [
          "lambda and key= are useful because real data is often more complex than a simple list of numbers.",
          "In real Python, you often need to sort products by price, users by age, files by size, messages by date, words by length, or results by score.",
          "If you do not tell Python what exactly to compare, it may sort in a way that is technically correct but not useful for your task.",
          "That is why key= matters.",
        ],
        listItems: [
          "products by price",
          "users by age",
          "files by size",
          "messages by date",
          "words by length",
          "results by score",
        ],
        miniTitle: "Practical example: sorting users by score",
        exampleParagraphs: [
          "Imagine you have user data, and you want to show the weakest score first.",
        ],
        code: usersByScoreCode,
        outroParagraphs: [],
        calloutTitle: "What is happening here?",
        calloutParagraphs: [
          "sorted() goes through the list one item at a time.",
          'Each item is a dictionary representing one user.',
          'lambda user: user["score"] tells Python to use the "score" value for sorting.',
          "So Python compares 72, 88, and 95 — not the whole dictionaries.",
          "That is the real strength of key=: it lets you choose what part of each item matters for sorting.",
          "And lambda makes it quick and compact.",
        ],
      },
    },
    {
      type: "finishing",
      props: {
        badge: "Done",
        title: "Keep going!",
        paragraphs: [
          "You finished the lambda and key= lesson. Now you know how to tell Python what rule to use when sorting more complex data.",
          "That makes sorting more precise, more readable, and much more useful in real projects.",
        ],
        imageSrc: lambdaFinish,
        imageAlt: "Lambda and key lesson completed illustration",
      },
    },
  ],
};

export default lambdaAndKeyLessonData;