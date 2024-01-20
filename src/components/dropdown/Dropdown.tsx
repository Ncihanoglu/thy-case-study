import React, { useEffect, useRef, useState } from "react";
import style from "./dropdown.module.css";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface DropdownReturn {
  name: string;
  value: { key: string; value: string };
}

interface DropdownProps {
  value?: string | null;
  options: { key: string; value: string }[];
  placeholder: string;
  onChange: (args1: DropdownReturn) => void;
  icon?: IconDefinition;
  name: string;
}

const Dropdown = ({
  value = null,
  options,
  placeholder,
  onChange,
  icon,
  name,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={style.wrapper} ref={dropdownRef}>
      <button
        className={style.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {value || placeholder}
      </button>
      {isOpen && (
        <div className={style.list}>
          {options.map((opt) => (
            <button
              name={name}
              className={style.item}
              key={opt.key}
              onClick={() => {
                const returnValue = {
                  name: name,
                  value: { key: opt.key, value: opt.value },
                };
                onChange(returnValue);
                setIsOpen(false);
              }}
            >
              {opt.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
