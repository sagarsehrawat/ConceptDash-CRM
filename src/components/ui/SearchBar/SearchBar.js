import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './SearchBar.css'

const SearchBar = (props) => {
    const {placeholder, searchFunc, apiFunc, style} = props;
    const [search, setSearch] = searchFunc
    const [api, setApi] = apiFunc;

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        if(api!=null) setApi(api+1)
        }, 500)
    
        return () => clearTimeout(delayDebounceFn)
      }, [search])

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

  return (
    <input
        className={`searchbar`}
        style={style}
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={`Search ${placeholder}`}
    />
  )
}

SearchBar.propTypes = {
    placeholder: PropTypes.string,
    searchFunc: PropTypes.array.isRequired,
    apiFunc: PropTypes.array,
    style: PropTypes.object
}

SearchBar.defaultProps = {
    placeholder: '',
    apiFunc: [null, null],
    style: {}
}

export default SearchBar