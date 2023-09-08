import React, { ReactNode, useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import { SelectContext, SelectValue } from "./select-context";
import styles from "./select.module.scss";


const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: SelectValue;
  placeholder?: string;
  value?: SelectValue;
  onChange?: (value: SelectValue) => void;
}> = ({ children, defaultValue, placeholder, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(
    value ??
      (defaultValue || {
        label: placeholder ?? "",
        value: "",
      })
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || "Choose an option";
  const selectContainerRef = useRef(null);

  useEffect(() => {
    setSelectedOption(
      value ??
        (defaultValue || {
          label: placeholder ?? "",
          value: "",
        })
    );
  }, [defaultValue, placeholder, value]);

  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = (option: SelectValue) => {
    setSelectedOption(option);
    setShowDropdown(false);
    onChange && onChange(option);
  };

  return (
    <SelectContext.Provider
      value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
    >
      <div className={styles["select-container"]} ref={selectContainerRef}>
        <div
          className={
            showDropdown
              ? `${styles["selected-text"]} ${styles["active"]}`
              : styles["selected-text"]
          }
          onClick={showDropdownHandler}
        >
          {selectedOption?.label.length > 0 ? selectedOption?.label : selectPlaceholder}
        </div>
        <ul
          className={
            showDropdown
              ? `${styles["select-options"]} ${styles["show-dropdown-options"]}`
              : `${styles["select-options"]} ${styles["hide-dropdown-options"]}`
          }
        >
          {children}
        </ul>
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
