type Drink = {
  id: string;
  name: string;
  color: string;
  price: number;
  sparkPrice: number;
  alcoholic: boolean;
  bepsiAmounts: {
    '1x': number;
    '3x': number;
    '5x': number;
  };
  lnurl: string;
  sparkAddress: string;
};

const drinks: Drink[] = [
  {
    id: "1",
    name: "coke",
    color: "crimson",
    price: 1000,
    sparkPrice: 1,
    alcoholic: false,
    bepsiAmounts: {
      '1x': 1000,
      '3x': 2000,
      '5x': 2025,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2VFKYESK6MM4DE6R6DFSX5HRQFNYW4EXZARFDAHR6DFSXQN8VCTJD9SKYMR984RXZMRNV5NXXMMDD4JKUAPAGESKCUM9YEJXJUMPVFKX2ARFD4JN6VQW2CN4E",
    sparkAddress: "sp1pgssxuw6sy63ju52lcsjyal3z6sazg8zcwlpdufns6f6y08dzaypqwh6gfa969",
  },
  {
    id: "2",
    name: "iced tea",
    color: "red",
    price: 1000,
    sparkPrice: 1,
    alcoholic: false,
    bepsiAmounts: {
      '1x': 1000,
      '3x': 2000,
      '5x': 2025,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2VFHYESK6MM4DE6R6DFSX5HRQFNYW4EXZARFDAHR6VFSXQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FSS4FGF0",
    sparkAddress: "sp1pgssxzh93wrep5vh4vwxjufhafr4gpve5z8mmdusmfqhyv3uegh6kqkst95g22",
  },
  {
    id: "3",
    name: "poppi",
    color: "lightpink",
    price: 1000,
    sparkPrice: 1,
    alcoholic: false,
    bepsiAmounts: {
      '1x': 1000,
      '3x': 2000,
      '5x': 2025,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2VFCYESK6MM4DE6R6DFSX5HRQFNYW4EXZARFDAHR6DFSXQN8VCTJD9SKYMR984RXZMRNV5NXXMMDD4JKUAPAGESKCUM9YEJXJUMPVFKX2ARFD4JN6VQG93C5A",
    sparkAddress: "sp1pgssxzqtsuypnx7r80f35frs8j4l7x47hp49rsyhmeyzwt8rctp08athgd8lkt",
  },
  {
    id: "4",
    name: "bubbly",
    color: "lime",
    price: 1000,
    sparkPrice: 1,
    alcoholic: false,
    bepsiAmounts: {
      '1x': 1000,
      '3x': 2000,
      '5x': 2025,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2V35YESK6MM4DE6R6DFSX5HRQFNYW4EXZARFDAHR6DFSXQN8VCTJD9SKYMR984RXZMRNV5NXXMMDD4JKUAPAGESKCUM9YEJXJUMPVFKX2ARFD4JN6VQZG748S",
    sparkAddress: "sp1pgss94dkzp5g0x57ladsp389j5hgrm85aznurgr8j5cuyd7pa65a9un54vahvf",
  },
  {
    id: "5",
    name: "cooler",
    color: "orange",
    price: 3000,
    sparkPrice: 3,
    alcoholic: true,
    bepsiAmounts: {
      '1x': 3000,
      '3x': 9000,
      '5x': 15000,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2V34YESK6MM4DE6R6VFSXYCZUVPXV36HYCT5D9HKU0F4XQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FSTJJ3CR",
    sparkAddress: "sp1pgssx2y79dgxumz335fhl64jqe4mcva5z4k9pcs3ljf2nq9cz43wrh0rpu5sw2",
  },
  {
    id: "6",
    name: "beer",
    color: "grey",
    price: 3000,
    sparkPrice: 3,
    alcoholic: true,
    bepsiAmounts: {
      '1x': 3000,
      '3x': 9000,
      '5x': 15000,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2V3CYESK6MM4DE6R6VFSXYCZUVPXV36HYCT5D9HKU0F4XQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FS6XTF62",
    sparkAddress: "sp1pgss8taqlw2vhd2pfqzg4y753fpz2heavhztlrt6nh32xek6qvdu5emf7zaggp",
  },
];

export default drinks;
