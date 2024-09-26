type Drink = {
  id: string;
  name: string;
  color: string;
  price: number;
};

const drinks: Drink[] = [
  {
    id: "1",
    name: "coke",
    color: "crimson",
    price: 1,
  },
  {
    id: "2",
    name: "strawberry",
    color: "red",
    price: 1,
  },
  {
    id: "3",
    name: "grapefruit",
    color: "lightpink",
    price: 1,
  },
  {
    id: "4",
    name: "lime",
    color: "lime",
    price: 1,
  },
  {
    id: "5",
    name: "beer",
    color: "orange",
    price: 3,
  },
  {
    id: "6",
    name: "random",
    color: "grey",
    price: 1,
  },
];

export default drinks;
