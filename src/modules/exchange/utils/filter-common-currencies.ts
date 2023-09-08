import { Currency } from "./types";

export const COMMON_CURRENCIES = ["EGP", "KWD", "EUR", "USD", "GBP", "AED", "AUD", "CAD", "JPY", "SAR"];

export const filterCommonCurrencies = (currencies: {
  [key: string]: Currency;
}) => {
  const result = COMMON_CURRENCIES.reduce((acc: Currency[], key) => {
    if (currencies.hasOwnProperty(key)) {
      acc.push(currencies[key]);
    }
    return acc;
  }, []);

  return result;
};
