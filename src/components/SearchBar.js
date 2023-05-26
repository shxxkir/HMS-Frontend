import React, { useState } from 'react';
import { ImSearch } from "react-icons/im";
import css from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <form className={css.frm}> 
      <input className={css.bar} 
        type="text" 
        placeholder="Search" 
        value={searchTerm} 
        onChange={handleInputChange} 
      /> 
      <ImSearch className={css.searchIcon} size={'1.4em'}/> 
    </form>
  );
};

export default SearchBar;
