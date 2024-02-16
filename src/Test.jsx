import React, { Children, createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
const Test = () => {
  const [theme, setTheme] = useState("dark");

  const darkTheme = () => {
    setTheme("dark");
    console.log("darkTheme clicked");
  };
  const lightTheme = () => {
    setTheme("light");
    console.log("lightTheme clicked");
  };
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Panel title="welcome">
          <Button onClick={darkTheme}>Dark</Button>
          <Button onClick={lightTheme}>Light</Button>
        </Panel>
      </ThemeContext.Provider>
    </>
  );
};

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
}

export default Test;
