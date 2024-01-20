import React from "react";
import style from "./counter.module.css";
interface CounterProps {
  value: number;
  onChange: (args1: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name: string;
}

const Counter = ({ value, onChange, name }: CounterProps) => {
  return (
    <div className={style.container}>
      <button
        onClick={(event) => {
          if (value > 1) {
            let localValue = Number(value) - 1;
            (event.target as HTMLInputElement).name = name;
            (event.target as HTMLInputElement).valueAsNumber = localValue;
            onChange(event);
          }
        }}
      >
        -
      </button>
      <p>{value}</p>
      <button
        onClick={(event) => {
          let localValue = Number(value) + 1;

          (event.target as HTMLInputElement).name = name;
          (event.target as HTMLInputElement).valueAsNumber = localValue;
          onChange(event);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
