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
  arkChoiceKey: string; // BTCPay POS tray identifier
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
    lnurl: "LNURL1DP68GURN8GHJ7UM9DEJZUMRPD9EK2EFWDAEXWTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVX5UYUUZJT96RW6MW0QU4GJJEWANKX7TNFDXN7URFDC7N2VFKYESK6MM4DE6R6VFSXQCZUVPXV36HYCT5D9HKU0F3XQCRQFNKV9EXJCTZD3JN63NPD3EK2FNRDAKK6ETWWS74GUN4V5NXG6TNV93XCET5D9KK20FS8TM9EX",
    sparkAddress: "sp1pgssxuw6sy63ju52lcsjyal3z6sazg8zcwlpdufns6f6y08dzaypqwh6gfa969",
    arkChoiceKey: "tray-0",
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
    lnurl: "LNURL1DP68GURN8GHJ7UM9DEJZUMRPD9EK2EFWDAEXWTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVX5UYUUZJT96RW6MW0QU4GJJEWANKX7TNFDXN7URFDC7N2VFHYESK6MM4DE6R6VFSXQCZUVPXV36HYCT5D9HKU0F3XQCRQFNKV9EXJCTZD3JN63NPD3EK2FNRDAKK6ETWWS74GUN4V5NXG6TNV93XCET5D9KK20FS795KGV",
    sparkAddress: "sp1pgssxzh93wrep5vh4vwxjufhafr4gpve5z8mmdusmfqhyv3uegh6kqkst95g22",
    arkChoiceKey: "tray-1",
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
    lnurl: "LNURL1DP68GURN8GHJ7UM9DEJZUMRPD9EK2EFWDAEXWTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVX5UYUUZJT96RW6MW0QU4GJJEWANKX7TNFDXN7URFDC7N2VFCYESK6MM4DE6R6VFSXQCZUVPXV36HYCT5D9HKU0F3XQCRQFNKV9EXJCTZD3JN63NPD3EK2FNRDAKK6ETWWS74GUN4V5NXG6TNV93XCET5D9KK20FS5DNPP3",
    sparkAddress: "sp1pgssxzqtsuypnx7r80f35frs8j4l7x47hp49rsyhmeyzwt8rctp08athgd8lkt",
    arkChoiceKey: "tray-2",
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
    lnurl: "LNURL1DP68GURN8GHJ7UM9DEJZUMRPD9EK2EFWDAEXWTMZD96XXMMFDEEHW6T5VD5Z7CTSDYHHVVF0D3H82UNVX5UYUUZJT96RW6MW0QU4GJJEWANKX7TNFDXN7URFDC7N2V35YESK6MM4DE6R6VFSXQCZUVPXV36HYCT5D9HKU0F3XQCRQFNKV9EXJCTZD3JN63NPD3EK2FNRDAKK6ETWWS74GUN4V5NXG6TNV93XCET5D9KK20FS5NMAPP",
    sparkAddress: "sp1pgss94dkzp5g0x57ladsp389j5hgrm85aznurgr8j5cuyd7pa65a9un54vahvf",
    arkChoiceKey: "tray-3",
  },
];

export default drinks;
