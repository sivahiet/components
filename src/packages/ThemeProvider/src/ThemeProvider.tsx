import clsx from "clsx";
import React, { ReactNode, useEffect } from "react";

import { ThemeContext } from "./ThemeContext";
import { Theme } from "./theme";
import "./themes"; // your css files

interface Props {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeProvider: React.FC<Props> = ({ children, theme = "light" }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className={clsx(theme)}>{children}</div>
    </ThemeContext.Provider>
  );
};
