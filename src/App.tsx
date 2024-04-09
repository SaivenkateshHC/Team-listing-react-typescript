import "./App.scss";
import "./styles/bootstrap.scss";

//components
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { IUsers } from "./utils/interfaces";
import CustomCard from "./components/CustomCard/CustomCard";
import { FetchUserListApi } from "./services/DataFetching";

interface User {
  admins: IUsers[] | [];
  members: IUsers[] | [];
}

function App() {
  const [users, setUsers] = useState<User>({
    members: [],
    admins: [],
  });

  useEffect(() => {
    fetchUsersList();
    return () => {};
  }, []);

  const fetchUsersList = async () => {
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
      },
      errorCallback: (error: any) => {
        console.log(error);

        setUsers({
          admins: [],
          members: [],
        });
      },
    });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container my-5 d-flex flex-column gap-5">
        <div>
          <h3 className="section-title">Adminstrators</h3>
          <div className="grid-wrapper">
            {users.admins.map((user: IUsers, index: number) => (
              <CustomCard key={index} user={user} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="section-title">Members</h3>
          <div className="grid-wrapper">
            {users.members.map((user: IUsers, index: number) => (
              <CustomCard key={index} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
