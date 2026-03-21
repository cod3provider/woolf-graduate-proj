import classMethodsCard from "../../../../assets/3_Class Methods/Class_methods_1.png";
import classMethodsFinish from "../../../../assets/3_Class Methods/Class_methods_finishing.png";
import classMethodsHero from "../../../../assets/3_Class Methods/Class_methods_hero.png";

const methodsExampleCode = `class CoffeeShop:
    chain_name = "Daily Brew"

    def __init__(self, shop_name, drinks_sold):
        self.shop_name = shop_name
        self.drinks_sold = drinks_sold

    def describe_shop(self):
        print(f"{self.shop_name}: {self.drinks_sold} drinks sold")

    @classmethod
    def change_chain_name(cls, new_name):
        cls.chain_name = new_name

    @staticmethod
    def ml_to_liters(ml):
        return ml / 1000


shop1 = CoffeeShop("TeaCup", 300)
shop1.describe_shop()

CoffeeShop.change_chain_name("Roast Republic")
print(CoffeeShop.chain_name)

print(CoffeeShop.ml_to_liters(750))`;

const methodsCallsCode = `shop1 = CoffeeShop("TeaCup", 300)

shop1.describe_shop()                      # TeaCup: 300 drinks sold
CoffeeShop.change_chain_name("Roast Republic")
print(CoffeeShop.chain_name)              # Roast Republic
print(CoffeeShop.ml_to_liters(750))       # 0.75`;

const userAccountsCode = `class UserAccount:
    total_users = 0

    def __init__(self, name):
        self.name = name
        UserAccount.total_users += 1

    def say_hello(self):
        print(f"Hello, I am {self.name}")

    @classmethod
    def show_total_users(cls):
        print(cls.total_users)

    @staticmethod
    def is_valid_name(name):
        return len(name.strip()) >= 3


user = UserAccount("Anna")
user2 = UserAccount("Ben")

user.say_hello()
UserAccount.show_total_users()
print(UserAccount.is_valid_name("Al"))
print(UserAccount.is_valid_name("Anna"))`;

const predictOutputTasks = [
  {
    id: 1,
    code: `class TeaCup:
    def __init__(self, name, size):
        self.name = name
        self.size = size

    def describe(self):
        print(self.name, self.size)

cup = TeaCup("TeaCup", 300)
cup.describe()`,
    question: "What is printed?",
    options: {
      A: ["Herbal"],
      B: ["300 ml"],
      C: ["TeaCup 300"],
      D: ["Error"],
    },
    correct: "C",
  },
  {
    id: 2,
    code: `class Bakery:
    brand = "Sweet Spot"

    @classmethod
    def rename_brand(cls, new_name):
        cls.brand = new_name

Bakery.rename_brand("Crumb & Joy")
print(Bakery.brand)`,
    question: "What is printed?",
    options: {
      A: ["Sweet Spot"],
      B: ["Crumb & Joy"],
      C: ["new_name"],
      D: ["Error"],
    },
    correct: "B",
  },
  {
    id: 3,
    code: `class MathHelper:
    @staticmethod
    def double(x):
        return x * 2

print(MathHelper.double(4))`,
    question: "What is printed?",
    options: {
      A: ["8"],
      B: ["16"],
      C: ["4"],
      D: ["Error"],
    },
    correct: "A",
  },
];

const fillMissingLineTasks = [
  {
    id: 1,
    code: `class Snack:
    def __init__(____, kind):
        self.kind = kind`,
    question: "Choose the missing part:",
    options: {
      A: "cls",
      B: "x",
      C: "self",
    },
    correct: "C",
  },
  {
    id: 2,
    code: `class Bakery:
    brand = "Daily Brew"

    @classmethod
    def rename(____, name):
        cls.brand = name`,
    question: "Choose the missing part:",
    options: {
      A: "self",
      B: "cls",
      C: "name",
    },
    correct: "B",
  },
  {
    id: 3,
    code: `class Converter:
    @staticmethod
    def grams_to_kg(g):
        return ______`,
    question: "Choose the missing part:",
    options: {
      A: "g / 1000",
      B: "self.g / 1000",
      C: "cls.g / 1000",
    },
    correct: "A",
  },
];

const findMistakeTasks = [
  {
    id: 1,
    code: `class Helper:
    @staticmethod
    def show(self):
        print(self.name)`,
    question: "What is the problem?",
    options: {
      A: "A static method should not use self like an instance method",
      B: "Static methods cannot print",
      C: "@staticmethod must always return a number",
    },
    correct: "A",
  },
  {
    id: 2,
    code: `class Bakery:
    brand = "Sweet Spot"

    @classmethod
    def rename(self, new_name):
        self.brand = new_name`,
    question: "What is the issue?",
    options: {
      A: "Class methods cannot change class attributes",
      B: "The first parameter should be cls, not self",
      C: "new_name must be uppercase",
    },
    correct: "B",
  },
  {
    id: 3,
    code: `class Dessert:
    kind = "cake"

    @classmethod
    def show_kind(cls):
        print(self.kind)`,
    question: "What is the problem?",
    options: {
      A: "self does not exist inside this class method",
      B: "kind cannot be printed",
      C: "__init__ cannot set attributes",
    },
    correct: "A",
  },
];

const reorderLinesTasks = [
  {
    id: 1,
    title: "Build an instance method",
    lines: [
      { id: "1", text: "print(self.flavor)" },
      { id: "2", text: "class Soup:" },
      { id: "3", text: "def __init__(self, flavor):" },
      { id: "4", text: "self.flavor = flavor" },
      { id: "5", text: "def show_flavor(self):" },
    ],
    correctOrder: ["2", "3", "4", "5", "1"],
  },
  {
    id: 2,
    title: "Build a class method",
    lines: [
      { id: "1", text: "cls.brand = new_name" },
      { id: "2", text: 'brand = "Daily Brew"' },
      { id: "3", text: "@classmethod" },
      { id: "4", text: "class Cafe:" },
      { id: "5", text: "def rename_brand(cls, new_name):" },
    ],
    correctOrder: ["4", "2", "3", "5", "1"],
  },
  {
    id: 3,
    title: "Build a static method",
    lines: [
      { id: "1", text: "return cm / 100" },
      { id: "2", text: "class Converter:" },
      { id: "3", text: "def cm_to_m(cm):" },
      { id: "4", text: "@staticmethod" },
    ],
    correctOrder: ["2", "4", "3", "1"],
  },
];

const codingTasks = [
  {
    id: 1,
    title: "Tea order description",
    description:
      "Write a class TeaOrder with __init__(self, tea_type, cups) and an instance method describe(self) that prints: {tea_type}: {cups} cups",
    expectedOutput: `Green tea: 3 cups`,
    starterCode: `class TeaOrder:
    # write your code here
    pass


order = TeaOrder("Green tea", 3)
order.describe()

# Expected output:
# Green tea: 3 cups`,
    solution: `class TeaOrder:
    def __init__(self, tea_type, cups):
        self.tea_type = tea_type
        self.cups = cups

    def describe(self):
        print(f"{self.tea_type}: {self.cups} cups")`,
  },
  {
    id: 2,
    title: "Company rename",
    description:
      'Write a class DeliveryService with a class attribute company_name = "QuickDrop" and a class method rename_company(cls, new_name) that changes the class attribute.',
    expectedOutput: `QuickDrop
FastArrow`,
    starterCode: `class DeliveryService:
    # write your code here
    pass


print(DeliveryService.company_name)
DeliveryService.rename_company("FastArrow")
print(DeliveryService.company_name)

# Expected output:
# QuickDrop
# FastArrow`,
    solution: `class DeliveryService:
    company_name = "QuickDrop"

    @classmethod
    def rename_company(cls, new_name):
        cls.company_name = new_name`,
  },
  {
    id: 3,
    title: "Cookie weight converter",
    description:
      "Write a class CookieHelper with a static method grams_to_kg(g) that returns kilograms.",
    expectedOutput: `0.5
1.25`,
    starterCode: `class CookieHelper:
    # write your code here
    pass


print(CookieHelper.grams_to_kg(500))
print(CookieHelper.grams_to_kg(1250))

# Expected output:
# 0.5
# 1.25`,
    solution: `class CookieHelper:
    @staticmethod
    def grams_to_kg(g):
        return g / 1000`,
  },
  {
    id: 4,
    title: "Pizza shop counter",
    description:
      "Write a class PizzaShop with a class attribute shops_open = 0, __init__(self, name) that saves the name and increases shops_open by 1, and a class method show_total(cls) that prints the number of shops.",
    expectedOutput: `2`,
    starterCode: `class PizzaShop:
    # write your code here
    pass


p1 = PizzaShop("North")
p2 = PizzaShop("South")
PizzaShop.show_total()

# Expected output:
# 2`,
    solution: `class PizzaShop:
    shops_open = 0

    def __init__(self, name):
        self.name = name
        PizzaShop.shops_open += 1

    @classmethod
    def show_total(cls):
        print(cls.shops_open)`,
  },
  {
    id: 5,
    title: "Message formatter",
    description:
      "Write a class TextTools with a static method make_upper(text) that returns the text in uppercase.",
    expectedOutput: `HELLO
PYTHON INTERVIEW`,
    starterCode: `class TextTools:
    # write your code here
    pass


print(TextTools.make_upper("hello"))
print(TextTools.make_upper("python interview"))

# Expected output:
# HELLO
# PYTHON INTERVIEW`,
    solution: `class TextTools:
    @staticmethod
    def make_upper(text):
        return text.upper()`,
  },
];

const classMethodsLessonData = {
  slug: "class-methods",
  sections: [
    {
      type: "intro",
      props: {
        imageSrc: classMethodsHero,
        imageAlt: "Class methods lesson hero illustration",
        description:
          "Instance methods, class methods, and static methods are three different kinds of methods in Python classes. In real Python, this matters because interviews often ask not just what a class is, but when you would use each kind of method.",
      },
    },
    {
      type: "theory",
      props: {
        badge: "Theory",
        title: "Why do these three method types even exist?",
        paragraphs: [
          "At first glance, they all look annoyingly similar.",
          "They all live inside a class. They all look like functions. They all wear the same outfit and act mysterious.",
          "But they are not the same.",
          "A good tasty metaphor here is a café.",
          "One action belongs to one specific shop, another belongs to the whole chain, and another is just a useful helper nearby.",
          "So: instance method → one object (self), class method → the whole class (cls), static method → a helper inside the class namespace.",
        ],
      },
    },
    {
      type: "codeExample",
      props: {
        burgerCode: methodsExampleCode,
      },
    },
    {
      type: "howItWorks",
      props: {
        badge: "In plain words",
        title: "How it works",
        steps: [
          "describe_shop(self) is an instance method. It works with one specific object and uses self.",
          'shop1.describe_shop() means: use the data from shop1.',
          "change_chain_name(cls, new_name) is a class method. It works with the class itself and uses cls.",
          'CoffeeShop.change_chain_name("Roast Republic") changes the class-level value for the whole chain.',
          "ml_to_liters(ml) is a static method. It does not use self or cls. It is just a useful helper placed inside the class.",
        ],
      },
    },
    {
      type: "diagram",
      props: {
        burgerCard: classMethodsCard,
      },
    },
    {
      type: "calls",
      props: {
        callsCode: methodsCallsCode,
      },
    },
    {
      type: "explanation",
      props: {
        badge: "Explanation",
        title: "What is happening here?",
        items: [
          "shop1.describe_shop() uses the specific object shop1, so the method can read shop1.shop_name and shop1.drinks_sold.",
          'CoffeeShop.change_chain_name("Roast Republic") changes a class attribute, so the whole chain gets the new name.',
          "CoffeeShop.ml_to_liters(750) does not need any shop object and does not need the class state either. It is just a helper conversion.",
          "So instance methods are for one object, class methods are for the class, and static methods are for utility logic that happens to belong in the class.",
          "If these three used to look like one blurry pastry tray, that is normal. Now they should be starting to sit in their proper boxes.",
        ],
      },
    },
    {
      type: "practice",
      props: {
        predictOutputProps: {
          badge: "Practice",
          title: "Predict the output",
          description: "Read the methods code and choose what will be printed.",
          tasks: predictOutputTasks,
        },
        fillMissingLineProps: {
          badge: "Practice",
          title: "Fill the missing line",
          description:
            "Look at the class code and choose the missing part.",
          tasks: fillMissingLineTasks,
        },
        findMistakeProps: {
          badge: "Practice",
          title: "Find the mistake",
          description: "Read the methods code and choose what is wrong in it.",
          tasks: findMistakeTasks,
        },
        reorderLinesProps: {
          badge: "Practice",
          title: "Reorder lines",
          description:
            "Drag the lines into the correct order to build a working method example.",
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
        title: "Methods in real code",
        introParagraphs: [
          "These three method types matter because real Python projects use classes for different purposes, and not every method should work at the same level.",
          "You use instance methods when the action depends on one object, class methods when the action belongs to the class as a whole, and static methods when you need a helper that fits the class but does not depend on object or class state.",
        ],
        listItems: [
          "instance methods for object-specific actions",
          "class methods for shared class-level operations",
          "static methods for helper logic inside the class",
        ],
        miniTitle: "Practical example: user accounts",
        exampleParagraphs: [],
        code: userAccountsCode,
        outroParagraphs: [],
        calloutTitle: "What is happening here?",
        calloutParagraphs: [
          "say_hello(self) is an instance method because it depends on one specific user.",
          "show_total_users(cls) is a class method because it works with shared class data.",
          "is_valid_name(name) is a static method because it is just a helper check.",
          "So in real code, these methods are not three random decorations. They solve three different kinds of problems.",
        ],
      },
    },
    {
      type: "finishing",
      props: {
        badge: "Done",
        title: "Keep going!",
        paragraphs: [
          "You finished the instance, class, and static methods lesson. Now you know when logic belongs to one object, the whole class, or just a useful helper.",
          "That distinction matters a lot in real Python code — and yes, in interviews too.",
        ],
        imageSrc: classMethodsFinish,
        imageAlt: "Class methods lesson completed illustration",
      },
    },
  ],
};

export default classMethodsLessonData;