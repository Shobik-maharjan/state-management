import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

const Test2 = () => {
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <WelcomePanel />
          <label>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={(e) => {
                setTheme(e.target.checked ? "dark" : "light");
              }}
            />
            Use dark mode
          </label>
        </CurrentUserContext.Provider>
      </ThemeContext.Provider>
    </>
  );
};

const WelcomePanel = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Panel title="welcome">
      {currentUser !== null ? <Greeting /> : <LoginForm />}
    </Panel>
  );
};

const Greeting = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return <p>You logged in as {currentUser.name}</p>;
};

const LoginForm = () => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState("");
  const [lsatName, setLastName] = useState("");
  const canLogin = firstName.trim() !== "" && lsatName.trim() !== "";
  return (
    <>
      <label>
        First Name {":"}
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name{":"}{" "}
        <input
          type="text"
          required
          value={lsatName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({ name: firstName + " " + lsatName });
        }}
      >
        Login
      </Button>
      {!canLogin && <i>Fill in both fields</i>}
    </>
  );
};

const Panel = ({ title, children }) => {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

const Button = ({ children, disabled, onClick }) => {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Test2;
