import React from "react";
import styles from "./dialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: React.ReactNode;
}

const Dialog = ({
  isOpen,
  onClose,
  title = "Hata Oluştu",
  content,
}: DialogProps) => {
  return (
    <div className={`${styles.customDialog} ${isOpen ? styles.open : ""}`}>
      <div className={styles.dialogOverlay}></div>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <h2>{title}</h2>
          <FontAwesomeIcon
            data-testid="close-button"
            className={styles.closeButton}
            icon={faXmark}
            onClick={onClose}
          />
        </div>
        <div className={styles.dialogBody}>{content}</div>
      </div>
    </div>
  );
};

export default Dialog;
