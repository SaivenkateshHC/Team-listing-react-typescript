import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { IUsers } from "../utils/interfaces";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filteredUsers: {
    admins: IUsers[] | [];
    members: IUsers[] | [];
  };
  setUsers: (users: User) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type SearchProviderProps = {
  children: ReactNode;
};
interface User {
    admins: IUsers[] | [];
    members: IUsers[] | [];
  }
  
export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User>({
    members: [],
    admins: [],
  })
  const [filteredUsers, setFilteredUsers] = useState<User>({
    members: [],
    admins: [],
  })
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // Debounce after 1000ms

  useEffect(() => {
    setFilteredUsers(users);
    return () => {
        
    };
  }, [users]);

  useEffect(() => {
    // NOTE : context of debouncedSearchTerm is the debounced value
    handleSearchChange();
    return () => {};
  }, [debouncedSearchTerm]);

  const handleSearchChange = useCallback(() => {
    if (debouncedSearchTerm !== "") {
      const filteredAdmins = users.admins.filter(
        (user: IUsers) =>{
         return  user.first_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      });
      const filteredMembers = users.members.filter(
        (user: IUsers) =>
          user.first_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredUsers({
        admins: filteredAdmins,
        members: filteredMembers,
      });
      console.log("state call");
    } 
  }, [debouncedSearchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredUsers, setUsers }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default SearchContext;