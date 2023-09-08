import { FloatInput } from "@/shared/components/float-input";
import { Option, Select } from "@/shared/components/select";
import React from "react";
import { GoArrowSwitch } from "react-icons/go";
import { useFetchCurrencies } from "../hooks/server";

import styles from "@/styles/Home.module.scss";
import { useExchangeContext } from "../provider";

export const ExchangeForm = () => {
  const { amount, setAmount, from, setFrom, to, setTo } = useExchangeContext();
  const { data: currencies } = useFetchCurrencies();

  return (
    <div className={styles.form}>
      <div className={styles.form_group}>
        <label htmlFor="amount">Amount</label>
        <FloatInput value={String(amount)} onChange={setAmount} />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="from">From</label>
        <Select
          value={{
            label: from.code,
            value: from,
          }}
          onChange={(option) => setFrom(option.value)}
          placeholder="Currency"
        >
          {currencies?.map((currency) => (
            <Option
              key={currency.label}
              value={currency}
              disabled={currency.label === to.code}
            >
              {currency.label}
            </Option>
          ))}
        </Select>
      </div>
      <button
        onClick={() => {
          const temp = from;
          setFrom(to);
          setTo(temp);
        }}
        className={styles.switch_button}
      >
        <GoArrowSwitch />
      </button>
      <div className={styles.form_group}>
        <label htmlFor="to">To</label>
        <Select
          value={{
            label: to.code,
            value: to,
          }}
          onChange={(option) => setTo(option.value)}
          placeholder="Currency"
        >
          {currencies?.map((currency) => (
            <Option
              key={currency.label}
              value={currency}
              disabled={currency.label === from.code}
            >
              {currency.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
