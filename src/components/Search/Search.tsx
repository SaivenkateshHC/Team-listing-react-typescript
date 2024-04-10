import { BaseSyntheticEvent } from "react";
import "./Search.scss";

import { FiSearch } from "react-icons/fi";
import { useSearch } from "../../hooks/useSearch";

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const handleSearchChange = (event: BaseSyntheticEvent) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-component gap-2">
      <FiSearch
        width={24}
        height={24}
        style={{ width: "24px", height: "24px" }}
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: BaseSyntheticEvent) => {
          handleSearchChange(e);
        }}
      />
    </div>
  );
};

export default Search;
