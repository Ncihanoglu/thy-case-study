import React, { ReactNode } from "react";
import styles from "./card.module.css";
interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  //rest of the props
  [x: string]: any;
}
const Card = ({ children, onClick, ...rest }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={styles.cardContainer}
      style={{ cursor: onClick && "pointer" }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
