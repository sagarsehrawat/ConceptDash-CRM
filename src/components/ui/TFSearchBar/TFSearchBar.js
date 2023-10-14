import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./TFSearchBar.css";
import MagnifyingGlass from '../../../assets/icons/Magnifying_Glass.svg'

const SearchBar = (props) => {
  const { placeholder, searchFunc, apiFunc, style, variant } = props;
  let [search, setSearch] = searchFunc;
  const [s, setS] = useState('')
  
  if(search===null){
    search = s;
    setSearch = setS;
  }
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
   /**
   * Placeholder for the SearchBar
   */
  placeholder: PropTypes.string,
   /**
   * useState variable for the accessing the SearchBar Value
   */
  searchFunc: PropTypes.array.isRequired,
   /**
   * useState Variable for Backend Searching
   */
  apiFunc: PropTypes.array,
   /**
   * Any Custom Styles for SearchBar
   */
  style: PropTypes.object,
};

SearchBar.defaultProps = {
  placeholder: "",
  apiFunc: [null, null],
  searchFunc: [null, null],
  style: {},
};

export default SearchBar;
