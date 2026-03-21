import ClosureLesson from "../lessons/closure/ClosureLesson";
import DecoratorLesson from "../lessons/decorator/DecoratorLesson";
import ClassMethodsLesson from "../lessons/classMethods/ClassMethodsLesson";
import LambdaAndKeyLesson from "../lessons/lambdaAndKey/LambdaAndKeyLesson";
import ArgsAndKwargsLesson from "../lessons/argsAndKwargs/ArgsAndKwargsLesson";

const lessonsData = [
  {
  id: 1,
  slug: "closure",
  number: "01",
  title: "Closure",
  moduleLabel: "Module 1: Free Intro",
  component: ClosureLesson,
},
{
  id: 2,
  slug: "decorator",
  number: "02",
  title: "Decorator",
  moduleLabel: "Module 1: Free Intro",
  component: DecoratorLesson,
},
{
  id: 3,
  slug: "class-methods",
  number: "03",
  title: "Class Methods",
  moduleLabel: "Module 1: Free Intro",
  component: ClassMethodsLesson,
},
{
  id: 4,
  slug: "lambda-and-key",
  number: "04",
  title: "Lambda and Key=",
  moduleLabel: "Module 2: Pro",
  component: LambdaAndKeyLesson,
},
{
  id: 5,
  slug: "args-and-kwargs",
  number: "05",
  title: "Args and Kwargs",
  moduleLabel: "Module 2: Pro",
  component: ArgsAndKwargsLesson,
},
];

export default lessonsData;