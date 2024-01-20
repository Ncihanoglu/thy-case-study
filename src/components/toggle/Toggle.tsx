import React from "react";
import styles from "./toggle.module.css";
interface ToggleProps {
  label: string;
  isChecked?: boolean;
  onChange: (args1: boolean) => void;
}

const Toggle = ({ label, isChecked = false, onChange }: ToggleProps) => {
  const handleToggleChange = () => {
    onChange(!isChecked);
  };

  return (
    <div
      className={`${styles.roundedToggleSwitch} ${
        isChecked ? styles.checked : ""
      }`}
      onClick={handleToggleChange}
    >
      <label>{label}</label>
      <div className={styles.slider}></div>
    </div>
  );
};

export default Toggle;
