import React from "react";

interface RadioProps {
  id?: string;
  value: string;
  checked: boolean;
  onChange: (args1: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  typeName?: string;
}

const Radio = ({
  id = new Date().toISOString(),
  value,
  checked,
  onChange,
  label,
  typeName = "",
}: RadioProps) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={(event) => {
          (event.target as HTMLInputElement).name = typeName;

          onChange(event);
        }}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

export default Radio;
