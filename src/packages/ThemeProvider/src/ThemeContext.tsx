import { createContext } from "react";

import { Theme } from "./theme";

export interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light"
});
