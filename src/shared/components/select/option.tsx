import React, { ReactNode } from "react";
import { SelectValue, useSelectContext } from "./select-context";
import styles from "./select.module.scss";
const Option: React.FC<{
  children: ReactNode | ReactNode[];
  value: SelectValue;
  disabled?: boolean;
}> = ({ children, value, disabled }) => {
  const { changeSelectedOption } = useSelectContext();

  return (
    <li className={styles["select-option"]}>
      <button disabled={disabled} onClick={() => changeSelectedOption(value)}>
        {children}
      </button>
    </li>
  );
};

export default Option;
