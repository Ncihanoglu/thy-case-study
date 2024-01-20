import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import style from "./passenger.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPerson,
  faPersonCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Counter from "../counter/Counter";
import Radio from "../radio/Radio";
import { FARE_CATEGORIES } from "../../utils/Constants";
interface PassengerProps {
  count: number;
  onChange: (
    args1:
      | ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  typeName: string;
  type: "ECONOMY" | "BUSINESS";
  countName: string;
}
const Passenger = ({
  count,
  onChange,
  type,
  typeName,
  countName,
}: PassengerProps) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openMenuRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: any) => {
    if (
      (menuRef.current && !menuRef.current.contains(event.target)) &&
      (openMenuRef.current && !openMenuRef.current.contains(event.target))
    ) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        style={{ height: "100%" }}
        ref={menuRef}
        onClick={() => setOpenMenu((prevState) => !prevState)}
      >
        <div className={style.countPosition}>{count}</div>
        <div className={style.iconContainer}>
          {count < 4 ? (
            Array(count)
              .fill(null)
              .map((_, index) => (
                <FontAwesomeIcon icon={faPerson} key={index} />
              ))
          ) : (
            <FontAwesomeIcon icon={faPersonCirclePlus} />
          )}
        </div>
      </div>
      {openMenu && (
        <div className={style.menu} ref={openMenuRef}>
          <p className={style.menuHeader}>Kabin ve Yolcu Seçimi</p>

          <div className={style.menuSelection}>
            <div>
              <Radio
                typeName={typeName}
                label="Economy Class"
                id="economy"
                value={FARE_CATEGORIES.economy}
                checked={type === FARE_CATEGORIES.economy}
                onChange={onChange}
              />
            </div>
            <div>
              <Radio
                typeName={typeName}
                label="Business Class"
                id="business"
                value={FARE_CATEGORIES.business}
                checked={type === FARE_CATEGORIES.business}
                onChange={onChange}
              />
            </div>
          </div>

          <div className={style.menuPassenger}>
            <p
              style={{ fontWeight: "bold", fontSize: "16px", color: "#000000" }}
            >
              Yolcu
            </p>
            <Counter value={count} onChange={onChange} name={countName} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Passenger;
