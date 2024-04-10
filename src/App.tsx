import { useEffect, useState } from "react";
import "./App.scss";
import "./styles/bootstrap.scss";

//components
import CustomCard from "./components/CustomCard/CustomCard";
import Navbar from "./components/Navbar/Navbar";

// other imports
import { IUsers } from "./utils/interfaces";
import { FetchUserListApi } from "./services/DataFetching";
import { useSearch } from "./hooks/useSearch";

function App() {
  const { searchTerm, setUsers, filteredUsers } = useSearch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsersList();
    return () => {};
  }, []);

  const fetchUsersList = async () => {
    setLoading(true);
    FetchUserListApi({
      successCallback: (data: IUsers[]) => {
        // filtered based on user role and set to state
        const admins = data.filter((user: IUsers) => user.role === "admin");
        const members = data.filter((user: IUsers) => user.role === "member");

        // assign to state
        setUsers({
          admins,
          members,
        });
        setLoading(false);
      },
      errorCallback: (error) => {
        console.log(error);

        setUsers({
          admins: [],
          members: [],
        });
        setLoading(false);
      },
    });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container my-5 d-flex flex-column gap-5">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {searchTerm !== "" && <p>Results for "{searchTerm}"</p>}
            <div>
              <h3 className="section-title">Adminstrators</h3>
              <div className="grid-wrapper">
                {filteredUsers.admins.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    <p>No Admins found</p>
                  </div>
                ) : (
                  filteredUsers.admins.map((user: IUsers, index: number) => (
                    <CustomCard key={index} user={user} />
                  ))
                )}
              </div>
            </div>
            <div>
              <h3 className="section-title">Members</h3>
              <div className="grid-wrapper">
                {filteredUsers.members.length === 0 ? (
                  <div className="d-flex justify-content-center">
                    {" "}
                    <p>No Members found</p>
                  </div>
                ) : (
                  filteredUsers.members.map((user: IUsers, index: number) => (
                    <CustomCard key={index} user={user} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
