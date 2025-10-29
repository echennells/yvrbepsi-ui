type ArkConfig = {
  displayName: string;
  icon: string;
  currencyName: string;
  posUrl: string;
  baseUrl: string;
};

const ark: ArkConfig = {
  displayName: "Arkade on Bitcoin",
  icon: "👾",
  currencyName: "Arkade",
  posUrl: process.env.NEXT_PUBLIC_BTCPAY_POS_URL || '',
  baseUrl: process.env.NEXT_PUBLIC_BTCPAY_BASE_URL || '',
};

export default ark;
