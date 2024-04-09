import "./App.scss";
import "./styles/bootstrap.scss";

//components
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { IUsers } from "./utils/interfaces";
import CustomCard from "./components/CustomCard/CustomCard";

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
    try {
      const response = await fetch(
        "https://nijin-server.vercel.app/api/team-members"
      );
      const data = await response.json();
      console.log(data);
      // filtered based on user role and set to state
      const admins = data.filter((user: IUsers) => user.role === "admin");
      const members = data.filter((user: IUsers) => user.role === "user");

      // assign to state
      setUsers({
        admins,
        members,
      });
    } catch (error) {
      console.log(error);

      setUsers({
        admins: [],
        members: [],
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <>
          <h3>Adminstrator</h3>
          {users.admins.map((user: IUsers, index: number) => (
            <CustomCard key={index} user={user} />
          ))}
        </>
        <>
          <h3>Members</h3>
          {users.members.map((user: IUsers, index: number) => (
            <CustomCard key={index} user={user} />
          ))}
        </>
      </div>
    </>
  );
}

export default App;
