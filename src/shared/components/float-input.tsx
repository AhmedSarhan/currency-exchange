import React, { ChangeEvent, useState } from "react";

export const FloatInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) onChange(input);
  };

  const handleFloat = () => {
    // The conditional prevents parseFloat(null) = NaN (when the user deletes the input)
    onChange(value);
  };

  return (
    <input
      placeholder="Type number..."
      value={value}
      onChange={handleNumber}
      onBlur={handleFloat}
    />
  );
};
