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

    violet: theme ? "#835afd": "#5a189a",
    gray: theme ? "#343a40" : "#e9ecef",
    purple: theme ? "#835afd" : "#5e32e0",
    pink: theme ? "#fdc5f5" : "#E559f9"
  }

  return (
  <ThemeContext.Provider value={{ theme, setTheme, colors }}>
    { props.children }
  </ThemeContext.Provider>
  );
}

