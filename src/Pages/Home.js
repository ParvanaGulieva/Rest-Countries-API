import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../Components/Navbar";
import Input from "../Components/Input";
import CountryCardList from "../Components/CountryCardList";
import Dropdown from "../Components/Dropdown";
import { useQueryParams, NumberParam, StringParam } from "use-query-params";

const perPage = 12;

const Home = ({ toggleTheme, theme, countries }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    filter: StringParam,
    search: StringParam,
  });

  useEffect(() => {
    if (query) {
      const { page, filter, search } = query;

      setCurrentPage(page - 1 || 0);
      setSelectedOption(filter || "");
      setSearchField(search || "");
    }
  }, []);

  useEffect(() => {
    if (query.page !== currentPage + 1) {
      setCurrentPage(query.page - 1 || 0);
    }
  }, [query.page]);

  function handlePageClick({ selected: selectedPage }) {
    const newPage = selectedPage + 1; // Increment the selectedPage by 1
    setCurrentPage(selectedPage);
    if (newPage !== query.page) {
      // Use newPage instead of selectedPage
      setQuery({ page: newPage }); // Store newPage value in the query parameter
    }
  }

  const offset = currentPage * perPage;

  const currentPageData = filteredCountries.slice(offset, offset + perPage);

  const pageCount = Math.ceil(filteredCountries.length / perPage);

  useEffect(() => {
    setCurrentPage(0);
    setFilteredCountries(
      countries
        .filter((country) => {
          return (
            country.name.common
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
            country.name.official
              .toLowerCase()
              .includes(searchField.toLowerCase())
          );
        })
        .filter((country) => {
          if (!selectedOption || selectedOption === "All") return true;
          return country.region === selectedOption;
        })
    );

    if (selectedOption || searchField || currentPage !== 0) {
      setQuery({
        filter: selectedOption,
        search: searchField || undefined,
        page: 1,
      });
    }
  }, [searchField, selectedOption, countries]);

  return (
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <div className="filter-container">
        <Input theme={theme} setSearchField={setSearchField} />
        <Dropdown
          theme={theme}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      {filteredCountries.length > 0 ? (
        <CountryCardList countries={currentPageData} />
      ) : (
        <p className="no-result">No results found</p>
      )}
      {!!filteredCountries.length && (
        <ReactPaginate
          previousLabel={<span>&#8592;</span>}
          nextLabel={<span>&#8594;</span>}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination_link"}
          nextLinkClassName={"pagination_link-disabled"}
          activeClassName={"pagination_link-active"}
          forcePage={currentPage}
        />
      )}
    </>
  );
};

export default Home;
