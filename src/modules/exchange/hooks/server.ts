import { useQuery } from "@tanstack/react-query";
import { API } from "@/shared/api/axios";

export const fetchCurrencies = async () => {
  const { data } = await API.get("/listquotes");
  return data as string[];
};

export const useFetchCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
};

export const exchangeCurrency = async ({
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
    q: amount,
  };
  const response = await API.get("/exchange", { params });
  return response.data as number;
  // console.log("response", response.data);
};

export const useExchangeResult = ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) => {
  console.log(
    "useExchangeResult",
    from,
    to,
    amount,

    !!from && !!to && !!Number(amount) && !isNaN(Number(amount))
  );

  return useQuery({
    queryKey: ["exchange", from, to, amount],
    queryFn: () => exchangeCurrency({ from, to, amount }),
    enabled: !!from && !!to && !!Number(amount) && !isNaN(Number(amount)),
  });
};
