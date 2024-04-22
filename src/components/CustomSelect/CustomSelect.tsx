import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import styles from "./CustomSelect.module.scss";
import { useDispatch } from "react-redux";
import { setEventType } from "store/slices/graphSlice";

interface IProps {
  defaultText: string;
  optionsList: string[];
  clickFunctionality: (e: any) => void;
}

const CustomSelect: FC<IProps> = ({
  defaultText,
  optionsList,
  clickFunctionality,
}) => {
  const [defaultSelectText, setDefaultSelectText] = useState("");
  const [showOptionList, setShowOptionList] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDefaultSelectText(defaultText);
  }, [defaultText]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowOptionList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setShowOptionList((prevState) => !prevState);
  };

  const handleOptionClick = (e: any) => {
    clickFunctionality(e);
    setDefaultSelectText(e.target.getAttribute("data-name"));

    setShowOptionList(false);
  };

  return (
    <div className={styles.container} ref={selectRef}>
      <div
        className={
          showOptionList
            ? `${styles.selectedText} ${styles.active}`
            : styles.selectedText
        }
        onClick={handleListDisplay}
      >
        {defaultSelectText}
      </div>
      {showOptionList && (
        <ul className={styles.selectOptions}>
          {optionsList.map((option, i) => (
            <li
              className={styles.option}
              data-name={option}
              key={i}
              onClick={handleOptionClick}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
