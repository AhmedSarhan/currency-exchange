import React from "react";
import { useExchangeContext } from "../provider";
import { useConvertResult } from "../hooks/server";

import styles from "@/styles/Home.module.scss";
import { AxiosError } from "axios";

export const ExchangeResult = () => {
  const { amount, debouncedAmount, from, to, resetHandler } =
    useExchangeContext();
  const {
    isLoading,
    isInitialLoading,
    data: result,
    error,
  } = useConvertResult({
    from: from.code,
    to: to.code,
    amount: debouncedAmount,
  });

  if (isInitialLoading) {
    return <p>loading...</p>;
  }
  if (!!result && debouncedAmount === amount) {
    return (
      <div className={styles.result_container}>
        <button onClick={resetHandler}>Reset</button>
        <p>
          {amount} {from?.description} is equal to {result} {to?.description}
        </p>
      </div>
    );
  }
  if (!!error) {
    return (
      <p>
        {(error as unknown as AxiosError)["message"] ?? "something went wrong"}
      </p>
    );
  }
  return <></>;
};
