import { createContext, useContext, useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Currency } from "./utils/types";

export const ExchangeContext = createContext<{
  from: Currency;
  setFrom: (value: Currency) => void;
  to: Currency;
  setTo: (value: Currency) => void;
  amount: string;
  setAmount: (value: string) => void;
  debouncedAmount: string;
  resetHandler: () => void;
}>({
  from: {
    code: "",
    description: "",
  },
  setFrom: (value: Currency) => {},
  to: {
    code: "",
    description: "",
  },
  setTo: (value: Currency) => {},
  amount: "",
  setAmount: (value: string) => {},
  debouncedAmount: "",
  resetHandler: () => {},
});

export const ExchangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [from, setFrom] = useState({
    code: "",
    description: "",
  });
  const [to, setTo] = useState({
    code: "",
    description: "",
  });
  const [amount, setAmount] = useState<string>("1.0");
  const debouncedAmount = useDebounce(amount, 2000);

  const resetHandler = () => {
    setFrom({ code: "", description: "" });
    setTo({ code: "", description: "" });
    setAmount("1.0");
  };

  return (
    <ExchangeContext.Provider
      value={{
        from,
        setFrom,
        to,
        setTo,
        amount,
        setAmount,
        debouncedAmount,
        resetHandler,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchangeContext = () => useContext(ExchangeContext);
