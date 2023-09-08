import { useQuery } from "@tanstack/react-query";
import { API_V2 } from "@/shared/api/axios";
import { filterCommonCurrencies } from "../utils/filter-common-currencies";
import { Currency } from "../utils/types";

export const fetchCurrencies = async () => {
  const { data } = await API_V2.get("/symbols");
  const symbols = data.symbols as Record<string, Currency>;

  const currencies = filterCommonCurrencies(symbols).map((key) => ({
    value: key,
    label: key.code,
  }));
  return currencies;
};

export const useFetchCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
};

export const convertCurrency = async ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) => {
  const params = {
    from,
    to,
    amount,
  };
  const response = await API_V2.get("/convert", { params });
  return response.data;
  // console.log("response", response.data);
};

export const useConvertResult = ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) => {
  return useQuery({
    queryKey: ["exchange", from, to, amount],
    queryFn: () => convertCurrency({ from, to, amount }),
    enabled: !!from && !!to && !!Number(amount) && !isNaN(Number(amount)),
    select: (data) => data?.result as number,
  });
};
