import { createContext, useContext } from "react";



export type SelectValue = {
  label: string;
  value: any;
};


export const SelectContext = createContext<{
  selectedOption: SelectValue;
  changeSelectedOption: (option: SelectValue) => void;
}>({
  selectedOption: {
    label: "",
    value: "",
  },
  changeSelectedOption: (option: SelectValue) => {},
});

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Error in creating the context");
  }
  return context;
};
