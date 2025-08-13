type LightningConfig = {
  lnurl: string;
  baseAmount: number; // Amount in Lightning coins for $1
  displayName: string;
  icon: string;
  currencyName: string;
};

const lightning: LightningConfig = {
  lnurl: "LNURL1DP68GURN8GHJ7CN9WPEKJTNZWFHKG6T99EEX7CMTWVHKY6T5VDHKJMNNWA5HGCMG9ASHQ6F0WCCJ7MRWW4EXC4T8VAC5W3TZF3K52J65GVU5ZVJWG93553RR8ACXJM3AXYCRQVPXV9KK7ATWWS7NZVPSXQHRQFNYW4EXZARFDAHR6VFSXQCZVANPWF5KZCNVV575VCTVWDJJVCM0D4KK2MN584RXZMRNV5NXG6TNV93XCET5D9KK20FSL2ST4K",
  baseAmount: 1000, // 1000 Lightning = $1
  displayName: "Lightning on Bitcoin",
  icon: "⚡",
  currencyName: "Lightning",
};

export default lightning;
