import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";
import MagnifyingGlass from '../../../assets/icons/Magnifying_Glass.svg'

const SearchBar = (props) => {
  const { placeholder, searchFunc, apiFunc, style } = props;
  const [search, setSearch] = searchFunc;
  const [api, setApi] = apiFunc;

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (api != null) setApi(api + 1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="searchbar-container">
        <img className={`searchbar-icon ${isFocused ? 'searchbar-icon-focus' : ''}`} src={MagnifyingGlass} alt="Search Icon"/>
      <input
        className={`searchbar`}
        style={style}
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={`Search ${placeholder}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  searchFunc: PropTypes.array.isRequired,
  apiFunc: PropTypes.array,
  style: PropTypes.object,
};

SearchBar.defaultProps = {
  placeholder: "",
  apiFunc: [null, null],
  style: {},
};

export default SearchBar;
