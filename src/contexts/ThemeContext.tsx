import { createContext, ReactNode, useState } from 'react';
export const ThemeContext = createContext({} as ThemeContextType);

type Theme = boolean;

type ThemeContextType =
{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: any;
};

type ThemeContexProviderProps =
{ 
  children: ReactNode;
};

export function ThemeContextProvider(props: ThemeContexProviderProps)
{
  const [theme, setTheme] = useState<Theme>(false);

  const colors =
  {
    gray50: theme ? "#F7F8FA" : "#7a7a7a",
    violet: theme ? "#3c096c" : "#835afd",
  }

  return (
  <ThemeContext.Provider value={{ theme, setTheme, colors }}>
    { props.children }
  </ThemeContext.Provider>
  );
}

