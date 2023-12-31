import styles from "@/styles/Home.module.scss";

import { useState } from "react";
import Head from "next/head";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { FloatInput } from "@/shared/components/float-input";
import {
  fetchCurrencies,
  useConvertResult,
  useFetchCurrencies,
} from "@/modules/exchange/hooks/server";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Option, Select } from "@/shared/components/select";
import { GoArrowSwitch } from "react-icons/go";
import { ExchangeProvider } from "@/modules/exchange/provider";
import { ExchangeForm } from "@/modules/exchange/components/form";
import { ExchangeResult } from "@/modules/exchange/components/result";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <ExchangeProvider>
          <ExchangeForm />
          <ExchangeResult />
        </ExchangeProvider>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["currencies"], fetchCurrencies);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
