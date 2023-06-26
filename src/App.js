import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { QueryParamProvider } from "use-query-params";
import Home from "./Pages/Home";
import DetailedCountry from "./Pages/DetailedCountry";

function App() {
  const [theme, setTheme] = useState("light");
  const [countries, setCountries] = useState([]);
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  let link = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetch(link);
        const data = await res.json();
        if (data) {
          setCountries(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, [setCountries]);

  return (
    <>
      <Router>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home
                    toggleTheme={toggleTheme}
                    theme={theme}
                    countries={countries}
                  />
                </>
              }
            />
            <Route
              path="/country/:countryID"
              element={
                <DetailedCountry
                  countries={countries}
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
          </Routes>
        </QueryParamProvider>
      </Router>
    </>
  );
}

export default App;
