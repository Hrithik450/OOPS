import LoadingSpinner from "../../spinner/spinner";
import "./userobj.css";

function UserCard({ name, email, role, join }) {
  const formattedJoin = new Date(join).toLocaleDateString();

  console.log(name, email, role, join);

  if (!name || !email || !role || !join) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="user_container">
        <div>
          <label>Name :</label>
          {name}
        </div>

        <div>
          <label>Email :</label>
          {email}
        </div>
        <div>
          <label>Role :</label>
          {role}
        </div>
        <div>
          <label>Joined At :</label>
          {formattedJoin}
        </div>
      </div>
    </>
  );
}

export default UserCard;
