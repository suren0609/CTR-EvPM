import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useTheme } from "hooks/useTheme";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const { theme, setTheme } = useTheme();

  const changeThemeHandler = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setPrevScrollY(currentScrollY);
    if (currentScrollY < prevScrollY) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    setPrevScrollY(currentScrollY);
  };
  return (
    <div
      className={
        isVisible
          ? `${styles.Header} ${styles.show}`
          : `${styles.Header} ${styles.hide}`
      }
    >
      {theme === "light" ? (
        <h1 style={{ textShadow: "unset" }}>Test-task</h1>
      ) : (
        <h1>Test-task</h1>
      )}

      <nav>
        <a href="#graph">Graph</a>
        <a href="#table">Table</a>
      </nav>
      <button onClick={changeThemeHandler} className={styles.theme}>
        {theme === "dark" ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </button>
    </div>
  );
};

export default Header;
