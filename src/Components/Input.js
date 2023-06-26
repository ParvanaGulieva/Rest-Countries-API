import React from "react";
import searchLight from "../assets/search-light.svg";
import searchDark from "../assets/search-dark.svg";

const Input = ({ theme, setSearchField }) => {
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };
  return (
    <div className="inputContainer">
      <img src={theme === "light" ? searchLight : searchDark} alt="" />
      <input
        type="text"
        placeholder="Search for a country…"
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
