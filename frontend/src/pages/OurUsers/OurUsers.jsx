import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function OurUsers() {
  // get all users from the database and console.log them
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Our Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            {/* <Link to={`/our-users/${user.name}`}>{user.name}</Link> */}
            <Link to={`/our-users/${user._id}`}>{user.name}</Link>
            <br></br>
            <img src={user.avatar} alt={user.name} height="40" />
            <p>{user.email}</p>
            <p>{user._id}</p>
            <p>Joined at: {user.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OurUsers;
