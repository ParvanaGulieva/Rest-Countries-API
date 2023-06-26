import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import backLight from "../assets/backLight.svg";
import backDark from "../assets/backDark.svg";
import { useParams } from "react-router-dom";

const DetailedCountry = ({ toggleTheme, theme, countries }) => {
  const { countryID } = useParams();

  const country = countries.find((country) => country.cca3 === countryID);

  if (!country) {
    return <div>Country not found.</div>;
  }

  let nativename = country.name.official;

  if (country.name.nativeName) {
    const key = Object.keys(country.name.nativeName)[0];
    nativename = country.name.nativeName[key].official;
  }

  let currency = [];

  if (country.currencies) {
    currency = Object.values(country.currencies).map(
      (currency) => currency.name
    );
  }

  const formattedCurrency = currency.join(", ");

  let languages = [];

  if (country.languages) {
    languages = Object.values(country.languages);
  }

  let borderCountries = [];

  if (country.borders) {
    borderCountries = country.borders.map((border) => {
      const borderCountry = countries.find(
        (country) => country.cca3 === border
      );
      return borderCountry ? borderCountry.name.common : border;
    });
  }

  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Link to="/" className="backButton">
        <img src={theme === "light" ? backLight : backDark} alt="" />
        Back
      </Link>
      <div className="info">
        <div className="flag">
          <img src={country.flags.svg} alt="flag" />
        </div>
        <div className="info-details">
          <h3>{country.name.official}</h3>
          <div className="info-flex">
            <ul className="info-details-list">
              <li>
                Native Name: <span>{nativename}</span>
              </li>
              <li>
                Population: <span>{country.population.toLocaleString()}</span>
              </li>
              <li>
                Region: <span>{country.region}</span>
              </li>
              <li>
                Sub Region: <span>{country.subregion}</span>
              </li>
              <li>
                Capital:{" "}
                <span>{country.capital ? country.capital : " N/A"}</span>
              </li>
            </ul>
            <ul className="info-details-list">
              <li>
                Top Level Domain: <span>{country.tld}</span>
              </li>
              <li>
                Currencies: <span>{formattedCurrency || "N/A"}</span>
              </li>
              <li>
                Languages:{" "}
                <span>
                  {languages.length > 0 ? languages.join(", ") : "N/A"}
                </span>
              </li>
            </ul>
          </div>
          <div className="border-list-div">
            <h4>Border Countries: </h4>
            <ul className="border-list">
              {borderCountries.length > 0 ? (
                borderCountries.map((border) => <li key={border}>{border}</li>)
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedCountry;
