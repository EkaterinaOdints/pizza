export const topping = [
  { id: "mozzarellaCheese", name: "Сыр моцарелла", price: 50 },
  { id: "spicySauce", name: "Острый соус", price: 30 },
  { id: "olives", name: "Оливки", price: 40 },
  { id: "extraPepperoni", name: "Доп. пепперони", price: 70 },
  { id: "basil", name: "Базилик", price: 20 },
  { id: "cherryTomatoes", name: "Помидоры черри", price: 40 },
  { id: "extraCheese", name: "Доп. сыр", price: 50 },
  { id: "pesto", name: "Песто", price: 30 },
  { id: "gorgonzola", name: "Горгонзола", price: 60 },
  { id: "cheddar", name: "Чеддер", price: 50 },
  { id: "creamySauce", name: "Сливочный соус", price: 30 },
  { id: "mushrooms", name: "Грибы", price: 40 },
  { id: "extraPineapple", name: "Доп. ананас", price: 30 },
  { id: "ham", name: "Ветчина", price: 50 },
  { id: "chicken", name: "Курица", price: 50 },
  { id: "bacon", name: "Бекон", price: 50 },
  { id: "onion", name: "Лук", price: 20 },
  { id: "eggplant", name: "Баклажаны", price: 40 },
  { id: "zucchini", name: "Цукини", price: 40 },
  { id: "bellPepper", name: "Перец болгарский", price: 30 },
  { id: "broccoli", name: "Брокколи", price: 30 },
  { id: "barbecueSauce", name: "Соус барбекю", price: 30 },
  { id: "salami", name: "Салями", price: 50 },
  { id: "beef", name: "Говядина", price: 70 },
  { id: "jalapeno", name: "Халапеньо", price: 30 },
  { id: "redOnion", name: "Лук красный", price: 20 },
  { id: "whiteMushrooms", name: "Белые грибы", price: 50 },
  { id: "truffleOil", name: "Трюфельное масло", price: 60 },
  { id: "champignons", name: "Шампиньоны", price: 40 },
  { id: "shrimp", name: "Креветки", price: 80 },
  { id: "squid", name: "Кальмары", price: 70 },
  { id: "mussels", name: "Мидии", price: 60 },
  { id: "lemon", name: "Лимон", price: 10 }
];

export const products = [
  {
    id: "pepperoni",
    name: "Пепперони",
    price: 500,
    img: "https://placehold.co/150",
    availableToppingIdList: ["mozzarellaCheese", "spicySauce", "olives", "extraPepperoni"]
  },
  {
    id: "margherita",
    name: "Маргарита",
    price: 400,
    img: "https://placehold.co/150",
    availableToppingIdList: ["basil", "cherryTomatoes", "extraCheese", "pesto"]
  },
  {
    id: "fourCheese",
    name: "Четыре сыра",
    price: 550,
    img: "https://placehold.co/150",
    availableToppingIdList: ["gorgonzola", "cheddar", "creamySauce", "mushrooms"]
  },
  {
    id: "hawaiian",
    name: "Гавайская",
    price: 480,
    img: "https://placehold.co/150",
    availableToppingIdList: ["extraPineapple", "ham", "spicySauce", "mozzarellaCheese"]
  },
  {
    id: "barbecue",
    name: "Барбекю",
    price: 530,
    img: "https://placehold.co/150",
    availableToppingIdList: ["chicken", "bacon", "onion", "barbecueSauce"]
  },
  {
    id: "vegetarian",
    name: "Вегетарианская",
    price: 450,
    img: "https://placehold.co/150",
    availableToppingIdList: ["eggplant", "zucchini", "bellPepper", "broccoli"]
  },
  {
    id: "meat",
    name: "Мясная",
    price: 560,
    img: "https://placehold.co/150",
    availableToppingIdList: ["salami", "bacon", "chicken", "beef"]
  },
  {
    id: "diablo",
    name: "Дьябло",
    price: 520,
    img: "https://placehold.co/150",
    availableToppingIdList: ["jalapeno", "spicySauce", "extraPepperoni", "redOnion"]
  },
  {
    id: "withMushrooms",
    name: "С грибами",
    price: 470,
    img: "https://placehold.co/150",
    availableToppingIdList: ["whiteMushrooms", "truffleOil", "champignons", "onion"]
  },
  {
    id: "seafood",
    name: "С морепродуктами",
    price: 600,
    img: "https://placehold.co/150",
    availableToppingIdList: ["shrimp", "squid", "mussels", "lemon"]
  }
];
