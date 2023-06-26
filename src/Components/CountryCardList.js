import React from "react";
import CountryCard from "./CountryCard";

const CountryCardList = ({ countries }) => {
  return (
    <section>
      {countries.map((country) => (
        <CountryCard country={country} key={country.cca2} />
      ))}
    </section>
  );
};

export default CountryCardList;
