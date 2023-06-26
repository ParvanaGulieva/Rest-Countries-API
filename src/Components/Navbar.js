import React from "react";
import modeDark from "../assets/dark.svg";
import modeLight from "../assets/light.svg";

const Navbar = ({ toggleTheme, theme }) => {
  return (
    <header>
      <h1>Where in the world?</h1>
      <div className="modeButton" onClick={toggleTheme}>
        <img src={theme === "light" ? modeLight : modeDark} alt="mode" />
        <p className="mode">{`${theme === "light" ? "Dark" : "Light"} Mode`}</p>
      </div>
    </header>
  );
};

export default Navbar;
