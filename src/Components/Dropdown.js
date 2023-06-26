import React, { useState } from "react";
import down from "../assets/down.svg";
import downDark from "../assets/downDark.svg";
import up from "../assets/up.svg";
import upDark from "../assets/upDark.svg";

const Dropdown = ({
  theme,
  selectedOption,
  setSelectedOption,
  getFilteredList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <p>{selectedOption || "Filter by region"}</p>
        <img
          src={
            theme === "light"
              ? isOpen
                ? up
                : down
              : isOpen
              ? upDark
              : downDark
          }
          alt="dropdown"
        />
      </div>
      {isOpen && (
        <ul className="dropdown-options" onChange={getFilteredList}>
          <li onClick={() => selectOption("All")}>All</li>
          <li onClick={() => selectOption("Africa")}>Africa</li>
          <li onClick={() => selectOption("Americas")}>Americas</li>
          <li onClick={() => selectOption("Asia")}>Asia</li>
          <li onClick={() => selectOption("Europe")}>Europe</li>
          <li onClick={() => selectOption("Oceania")}>Oceania</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
