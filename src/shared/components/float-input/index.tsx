import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const FloatInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {

  useEffect(() => {
    console.log("value", value);
  }, [value]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove any non-numeric characters except dot (.)
    const numericValue = inputValue.replace(/[^0-9.]/g, "");
    // Update the value state only if the input matches the number pattern
    if (/^\d*\.?\d*$/.test(numericValue)) {
      onChange(numericValue || "");
    }
  };

  const handleBlur = () => {
    // Ensure the value is always displayed with one decimal place
    if(!value.includes(".")) {
      onChange(Number(value).toFixed(1));
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="0.0"
    />
  );
};
