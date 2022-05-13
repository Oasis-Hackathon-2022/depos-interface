export type CoinMarketInfo = {
  current_price: number;
  id: string;
  name: string;
  image: string;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  symbol: string;
};

export type TimeDeposit = {
  user: string;
  asset: string;
  id: string;
  // time: number;
  time: string;
  // amount: number;
  amount: string;
  // price: number; // NOTE: price at deposit (1 hr twap)
  price: string; // NOTE: price at deposit (1 hr twap)
  isWithdraw: boolean;
};
