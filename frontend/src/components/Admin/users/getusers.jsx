import { useEffect, useState } from "react";
import { useAdminContext } from "../../../store/Context/AdminContext";
import "./getusers.css";
import UserCard from "./userobj";
import SearchBox from "../../spinner/search";
import LoadingSpinner from "../../spinner/spinner";

function GetUsers() {
  const { getUsers, users, error, isAdmin } = useAdminContext();
  console.log(users);
  const [Query, setQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  if (users == []) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  const handleQuery = (query) => {
    setQuery(query);
  };

  return (
    <>
      <div className="get-users">
        <SearchBox handleQuery={handleQuery} />
      </div>
      <form className="get-users">
        {users &&
          users
            .filter((user) =>
              user.email.toLowerCase().includes(Query.toLowerCase())
            )
            .map((user, i) => (
              <UserCard
                key={i}
                name={user.Name}
                email={user.email}
                role={user.role}
                join={user.joined}
              />
            ))}
      </form>
    </>
  );
}

export default GetUsers;
