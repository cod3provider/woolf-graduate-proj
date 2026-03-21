import argsCard from "../../../../assets/5_args_kwargs/args_1.png";
import argsFinish from "../../../../assets/5_args_kwargs/args_finishing.png";
import argsHero from "../../../../assets/5_args_kwargs/args_hero.png";

const argsExampleCode = `def yogurt_order(base, *toppings, **options):
    print(f"Base: {base}")

    print("Toppings:")
    for topping in toppings:
        print(topping)

    print("Options:")
    for key, value in options.items():
        print(f"{key} = {value}")


yogurt_order("vanilla", "strawberry", "oreo", size="large", syrup="caramel")
yogurt_order("chocolate", "banana", "nuts", "cookie", size="medium")
yogurt_order("mango", syrup="chocolate", spoon="yes")`;

const argsCallsCode = `yogurt_order("vanilla", "strawberry", "oreo", size="large", syrup="caramel")
# Base: vanilla
# Toppings:
# strawberry
# oreo
# Options:
# size = large
# syrup = caramel

yogurt_order("chocolate", "banana", "nuts", "cookie", size="medium")
# Base: chocolate
# Toppings:
# banana
# nuts
# cookie
# Options:
# size = medium

yogurt_order("mango", syrup="chocolate", spoon="yes")
# Base: mango
# Toppings:
# Options:
# syrup = chocolate
# spoon = yes`;

const forwardingCode = `def show_order(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)


def process_order(*args, **kwargs):
    show_order(*args, **kwargs)


process_order("latte", "vanilla", size="large", sugar="no")`;

const predictOutputTasks = [
  {
    id: 1,
    code: `def show_items(*items):
    print(items)

show_items("apple", "banana", "kiwi")`,
    question: "What is printed?",
    options: {
      A: [`("apple", "banana", "kiwi")`],
      B: [`["apple", "banana", "kiwi"]`],
      C: [`"apple", "banana", "kiwi"`],
      D: ["Error"],
    },
    correct: "A",
  },
  {
    id: 2,
    code: `def collect(main, *extras, **labels):
    print((main, extras, labels))

collect(10, 20, 30, x=40, y=50)`,
    question: "What is printed?",
    options: {
      A: [`(10, [20, 30], {'x': 40, 'y': 50})`],
      B: [`(10, (20, 30), {'x': 40, 'y': 50})`],
      C: [`(10, (20, 30, 40, 50), {})`],
      D: ["Error"],
    },
    correct: "B",
  },
  {
    id: 3,
    code: `def mix(base, *flavors, **extras):
    print(base)
    print(flavors)
    print(extras)

mix("tea", "mint", "lemon", sugar="no")`,
    question: "What is printed?",
    options: {
      A: [`tea`, `('mint', 'lemon')`, `{'sugar': 'no'}`],
      B: [`tea`, `['mint', 'lemon']`, `{'sugar': 'no'}`],
      C: [`tea`, `('mint', 'lemon', 'sugar')`, `{}`],
      D: ["Error"],
    },
    correct: "A",
  },
];

const fillMissingLineTasks = [
  {
    id: 1,
    code: `def collect(main, ______):
    print(main)
    print(extras)`,
    question: "Choose the missing line:",
    options: {
      A: "main",
      B: "extras",
      C: "*extras",
    },
    correct: "C",
  },
  {
    id: 2,
    code: `def forward(______):
    print(args)
    print(kwargs)`,
    question: "Choose the missing line:",
    options: {
      A: "args, kwargs",
      B: "*args, **kwargs",
      C: "args + kwargs",
    },
    correct: "B",
  },
  {
    id: 3,
    code: `drink_order("latte", ______)`,
    question: "Choose the missing part:",
    options: {
      A: `"milk=oat"`,
      B: `milk="oat"`,
      C: `{"milk": "oat"}`,
    },
    correct: "B",
  },
];

const findMistakeTasks = [
  {
    id: 1,
    code: `def basket(base, *items, **labels):
    print(base, items, labels)`,
    question: "What is true about this code?",
    options: {
      A: "It is correct",
      B: "It is wrong because *items must come after **labels",
      C: "It is wrong because strings cannot go into *items",
    },
    correct: "A",
  },
  {
    id: 2,
    code: `def broken(**kwargs, *args):
    print(kwargs, args)`,
    question: "What is the mistake?",
    options: {
      A: "There is no mistake",
      B: "**kwargs cannot come before *args in function parameters",
      C: "kwargs must always be a list",
    },
    correct: "B",
  },
  {
    id: 3,
    code: `coffee_order(size="large", "vanilla", "caramel")`,
    question: "What is the problem?",
    options: {
      A: "*toppings cannot contain strings",
      B: "Positional arguments cannot come after a keyword argument in a function call",
      C: "options must be written before toppings",
    },
    correct: "B",
  },
];

const reorderLinesTasks = [
  {
    id: 1,
    title: 'Build a function: "fruit_bowl"',
    lines: [
      { id: "1", text: 'print(f"Base: {base}")' },
      { id: "2", text: "def fruit_bowl(base, *fruits):" },
      { id: "3", text: "print(fruit)" },
      { id: "4", text: "for fruit in fruits:" },
      { id: "5", text: 'print("Fruits:")' },
    ],
    correctOrder: ["2", "1", "5", "4", "3"],
  },
  {
    id: 2,
    title: 'Build a function: "order_info"',
    lines: [
      { id: "1", text: "for key, value in options.items():" },
      { id: "2", text: "def order_info(*items, **options):" },
      { id: "3", text: "print(items)" },
      { id: "4", text: "print(key, value)" },
    ],
    correctOrder: ["2", "3", "1", "4"],
  },
  {
    id: 3,
    title: 'Build a function: "taco_order"',
    lines: [
      { id: "1", text: "def taco_order(shell, *fillings, **extras):" },
      { id: "2", text: 'print(f"Shell: {shell}")' },
      { id: "3", text: 'print(f"Fillings: {fillings}")' },
      { id: "4", text: 'print(f"Extras: {extras}")' },
    ],
    correctOrder: ["1", "2", "3", "4"],
  },
];

const codingTasks = [
  {
    id: 1,
    title: "Topping collector",
    description:
      "Write a function collect_toppings(*args) that returns all received toppings as a tuple.",
    expectedOutput: `('cheese', 'mushrooms', 'corn')
('pepperoni',)`,
    starterCode: `def collect_toppings(*args):
    # write your code here
    pass


print(collect_toppings("cheese", "mushrooms", "corn"))
print(collect_toppings("pepperoni"))

# Expected output:
# ('cheese', 'mushrooms', 'corn')
# ('pepperoni',)`,
    solution: `def collect_toppings(*args):
    return args`,
  },
  {
    id: 2,
    title: "Profile builder",
    description:
      "Write a function build_profile(**kwargs) that returns all named arguments as a dictionary.",
    expectedOutput: `{'name': 'Anna', 'role': 'tester'}
{'city': 'Kyiv', 'language': 'Python'}`,
    starterCode: `def build_profile(**kwargs):
    # write your code here
    pass


print(build_profile(name="Anna", role="tester"))
print(build_profile(city="Kyiv", language="Python"))

# Expected output:
# {'name': 'Anna', 'role': 'tester'}
# {'city': 'Kyiv', 'language': 'Python'}`,
    solution: `def build_profile(**kwargs):
    return kwargs`,
  },
  {
    id: 3,
    title: "Smoothie order",
    description:
      "Write a function smoothie_order(base, *fruits, **options) that prints Base, Fruits, and Options. The fruits should be printed as a tuple, and options as a dictionary.",
    expectedOutput: `Base: yogurt
Fruits: ('banana', 'mango')
Options: {'size': 'large', 'ice': 'yes'}
Base: milk
Fruits: ('strawberry',)
Options: {'syrup': 'vanilla'}`,
    starterCode: `def smoothie_order(base, *fruits, **options):
    # write your code here
    pass


smoothie_order("yogurt", "banana", "mango", size="large", ice="yes")
smoothie_order("milk", "strawberry", syrup="vanilla")

# Expected output:
# Base: yogurt
# Fruits: ('banana', 'mango')
# Options: {'size': 'large', 'ice': 'yes'}
# Base: milk
# Fruits: ('strawberry',)
# Options: {'syrup': 'vanilla'}`,
    solution: `def smoothie_order(base, *fruits, **options):
    print(f"Base: {base}")
    print(f"Fruits: {fruits}")
    print(f"Options: {options}")`,
  },
  {
    id: 4,
    title: "Sum all values",
    description:
      "Write a function sum_all(*args) that returns the sum of all positional arguments.",
    expectedOutput: `6
100`,
    starterCode: `def sum_all(*args):
    # write your code here
    pass


print(sum_all(1, 2, 3))
print(sum_all(10, 20, 30, 40))

# Expected output:
# 6
# 100`,
    solution: `def sum_all(*args):
    return sum(args)`,
  },
  {
    id: 5,
    title: "Coffee order",
    description:
      "Write a function coffee_order(size, *flavors, **extras) that prints Size, Flavors, and Extras. The flavors should be printed as a tuple, and extras as a dictionary.",
    expectedOutput: `Size: large
Flavors: ('vanilla', 'caramel')
Extras: {'milk': 'oat', 'sugar': 'no'}
Size: small
Flavors: ()
Extras: {'milk': 'regular'}`,
    starterCode: `def coffee_order(size, *flavors, **extras):
    # write your code here
    pass


coffee_order("large", "vanilla", "caramel", milk="oat", sugar="no")
coffee_order("small", milk="regular")

# Expected output:
# Size: large
# Flavors: ('vanilla', 'caramel')
# Extras: {'milk': 'oat', 'sugar': 'no'}
# Size: small
# Flavors: ()
# Extras: {'milk': 'regular'}`,
    solution: `def coffee_order(size, *flavors, **extras):
    print(f"Size: {size}")
    print(f"Flavors: {flavors}")
    print(f"Extras: {extras}")`,
  },
];

const argsAndKwargsLessonData = {
  slug: "args-and-kwargs",
  sections: [
    {
      type: "intro",
      props: {
        imageSrc: argsHero,
        imageAlt: "Args and kwargs lesson hero illustration",
        description:
          "*args and **kwargs let a function accept a flexible number of arguments. In real Python, this is useful when you do not know in advance how many values the function will receive, or when you want to pass named settings in a convenient way.",
      },
    },
    {
      type: "theory",
      props: {
        badge: "Theory",
        title: "First of all, these names look strange. Why do we need stars at all?",
        paragraphs: [
          "Because sometimes a function needs to accept not just one or two fixed ingredients, but a whole handful of them.",
          "A function with regular parameters is like a simple meal order: one soup, one drink, one dessert.",
          "Nice. Clear. Civilized.",
          "But real code is often messier.",
          "Sometimes a function gets extra values, extra options, extra settings — and you do not want to rewrite the function every time life becomes slightly more chaotic.",
          "That is where *args and **kwargs help.",
          "Now, let’s look at *args and **kwargs using a tasty metaphor.",
        ],
      },
    },
    {
      type: "codeExample",
      props: {
        burgerCode: argsExampleCode,
      },
    },
    {
      type: "howItWorks",
      props: {
        badge: "In plain words",
        title: "How it works",
        steps: [
          "yogurt_order(base, *toppings, **options) has one regular parameter, one *args parameter, and one **kwargs parameter.",
          'base takes the first fixed argument, like "vanilla" or "chocolate".',
          "*toppings collects any extra unnamed arguments into a tuple.",
          "**options collects any extra named arguments into a dictionary.",
          "Inside the function, we print the base, then go through all toppings one by one, then go through all named options one by one.",
          "This means the function can handle different orders without needing a new function every time.",
        ],
      },
    },
    {
      type: "diagram",
      props: {
        burgerCard: argsCard,
      },
    },
    {
      type: "calls",
      props: {
        callsCode: argsCallsCode,
      },
    },
    {
      type: "explanation",
      props: {
        badge: "Explanation",
        title: "What is happening here?",
        items: [
          `yogurt_order("vanilla", "strawberry", "oreo", size="large", syrup="caramel") → "vanilla" goes into base, "strawberry" and "oreo" go into toppings, and the named arguments go into options.`,
          `yogurt_order("chocolate", "banana", "nuts", "cookie", size="medium") → "chocolate" is the base, the three extra unnamed items become toppings, and size="medium" goes into options.`,
          `yogurt_order("mango", syrup="chocolate", spoon="yes") → "mango" is still the base, there are no extra toppings this time, and the named settings go into options.`,
          "So *args helps collect extra unnamed values, while **kwargs helps collect extra named values.",
          "This makes the function flexible: the yogurt cup stays the same, but the toppings and settings can change from order to order.",
          "If you are now slightly tempted to build a Python-powered dessert bar, that is understandable.",
        ],
      },
    },
    {
      type: "practice",
      props: {
        predictOutputProps: {
          badge: "Practice",
          title: "Predict the output",
          description: "Read the function code and choose what will be printed.",
          tasks: predictOutputTasks,
        },
        fillMissingLineProps: {
          badge: "Practice",
          title: "Fill the missing line",
          description:
            "Look at the function code and choose the missing part.",
          tasks: fillMissingLineTasks,
        },
        findMistakeProps: {
          badge: "Practice",
          title: "Find the mistake",
          description:
            "Read the function code and choose what is wrong in it.",
          tasks: findMistakeTasks,
        },
        reorderLinesProps: {
          badge: "Practice",
          title: "Reorder lines",
          description:
            "Drag the lines into the correct order to build a working function.",
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
        title: "*args and **kwargs in real code",
        introParagraphs: [
          "*args and **kwargs are useful because they make functions more flexible.",
          "Sometimes you know exactly what arguments a function should take. That is simple and neat.",
          "But in real code, functions often need to handle different numbers of values or different named settings. That is where *args and **kwargs become very helpful.",
          "They are often used in real Python for:",
        ],
        listItems: [
          "wrapper functions",
          "decorators",
          "helper utilities",
          "forwarding arguments to another function",
          "building flexible APIs",
          "handling optional settings without writing ten separate parameters",
        ],
        miniTitle: "Practical example: forwarding arguments",
        exampleParagraphs: [
          "Sometimes one function receives arguments and simply passes them to another function.",
          "This is very common in decorators and helper functions.",
        ],
        code: forwardingCode,
        outroParagraphs: [],
        calloutTitle: "What is happening here?",
        calloutParagraphs: [
          "process_order does not know in advance how many positional or named arguments it will receive. So it accepts them with *args and **kwargs.",
          "Then it passes them forward to show_order(*args, **kwargs).",
          "This means all extra positional arguments stay together, all named arguments stay together, and nothing gets lost on the way.",
          "That is one of the biggest real uses of *args and **kwargs: they help functions stay flexible and pass information along cleanly.",
          "So in real code, *args and **kwargs are not just strange star decorations. They are a practical way to deal with functions when life refuses to stay nicely organized.",
        ],
      },
    },
    {
      type: "finishing",
      props: {
        badge: "Done",
        title: "Keep going!",
        paragraphs: [
          "You finished the *args and **kwargs lesson. Now you know how a function can accept a flexible number of positional and named arguments.",
          "That makes your code more adaptable, especially when functions need to pass information around without knowing every detail in advance.",
        ],
        imageSrc: argsFinish,
        imageAlt: "Args and kwargs lesson completed illustration",
      },
    },
  ],
};

export default argsAndKwargsLessonData;