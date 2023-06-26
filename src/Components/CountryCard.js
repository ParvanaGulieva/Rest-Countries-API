import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`}>
      <div className="country-card">
        <img src={country.flags.svg} alt="flag" />
        <div className="details">
          <h2>{country.name.common}</h2>
          <ul className="details-list">
            <li>
              Population: <span>{country.population.toLocaleString()}</span>
            </li>
            <li>
              Region: <span>{country.region}</span>
            </li>
            <li>
              Capital: <span>{country.capital ? country.capital : " N/A"}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
