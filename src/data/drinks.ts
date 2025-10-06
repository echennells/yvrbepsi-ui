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
    sparkAddress: "sp1pgss8u2xnsh9d29xuanp9jeg8z9687qvhqm7qelp290nd0jwhjg3z3gg4xz0sa",
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
    sparkAddress: "sp1pgss84whnpa0wvszc8yuw7gka7krxkuqypzad2k35ywtdarkw9lcczm66xhc2h",
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
    sparkAddress: "sp1pgssyuj25mhnnfc8mx5dq9z93qrar09yaqz7xmp23wltj0fvkyhtrnak2vxlpv",
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
    sparkAddress: "sp1pgss8f4a8v5n3q2xm2320lug9nd837ar523m3evmdykve850nskdx3yfsrd0fy",
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
    sparkAddress: "sp1pgss8azvj3vpm98xtrp9y5fdf3gwcfv9g3ujv7rmcj3m5werny9hva28fjzext",
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
    sparkAddress: "sp1pgss8h6jlfk4dcrfn0hjfep0acv05vznamm6uq3ytjlpeyq3r3teu93avayvnf",
  },
];

export default drinks;
