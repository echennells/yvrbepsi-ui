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
    sparkAddress: "sp1pgss9yraqg7tar9myzzjv537hvnek2mhsx7mvpdcys4tapu7qcs4xpz9vmnf5m",
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
    sparkAddress: "sp1pgssyzwfjk7y26fmnc25nfmmw6dlfxstawku6ek2vj08ld2qqknlw4hl0sfgq8",
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
    sparkAddress: "sp1pgssxmkhpxnv3sulg69cezy85lc6xvwqka45pwlhernd5d3hkm8rhrmnm2c390",
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
    sparkAddress: "sp1pgssyejngahdcda5f3xy9q2gycnwd5k0wwvfs83w6laym4t8dwqnzfzu9jugja",
  },
  {
    id: "5",
    name: "cooler",
    color: "orange",
    price: 2000,
    sparkPrice: 2,
    alcoholic: true,
    bepsiAmounts: {
      '1x': 2000,
      '3x': 1692,
      '5x': 2368,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2V34YESK6MM4DE6R6VFSXYCZUVPXV36HYCT5D9HKU0F4XQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FSTJJ3CR",
    sparkAddress: "sp1pgss8ajrlf6h50kxvnssa272n5z5l6y50dr0w3c8f82qwlygdm9wkl5hquaaf2",
  },
  {
    id: "6",
    name: "beer",
    color: "grey",
    price: 2000,
    sparkPrice: 2,
    alcoholic: true,
    bepsiAmounts: {
      '1x': 2000,
      '3x': 1692,
      '5x': 2368,
    },
    lnurl: "LNURL1DP68GURN8GHJ7AR0WFHX7ER99E38YMMYD9JJUUN0VD4HXTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVG44X5VM0D92H24MW24ZY6MMWF4ZHGURNXF4N7URFDC7N2V3CYESK6MM4DE6R6VFSXYCZUVPXV36HYCT5D9HKU0F4XQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FS6XTF62",
    sparkAddress: "sp1pgss9ymwewhlcwrxscrxy8g6p8hwf2u0hmt86jn26fp4syenf545a6utvcpgna",
  },
];

export default drinks;
