import { BaseSyntheticEvent, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './Search.scss';

import { FiSearch } from "react-icons/fi";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce after 500ms
  useEffect(() => {
    // NOTE : context of debouncedSearchTerm is the debounced value
    return () => {
      
    };
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event:BaseSyntheticEvent) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <div className='search-component gap-2'>
        <FiSearch width={24} height={24} style={{width:"24px",height:"24px"}}/>
        <input type="text" placeholder="Search..." onChange={(e:BaseSyntheticEvent)=>{
          handleSearchChange(e)
        }}/>
    </div>
  )
}

export default Search