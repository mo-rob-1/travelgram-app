import { useState } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function UpdateProfile() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      setNameError("Name must be at least 2 characters long");
    } else {
      setNameError("");
      axios
        .put(`/api/users/${user._id}`, { name })
        .then((res) => {
          dispatch({ type: "UPDATE_USER", payload: res.data });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    setUsernameError("");
    axios
      .put(`/api/users/${user._id}`, { username })
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    setEmailError("");
    axios
      .put(`/api/users/${user._id}`, { email })
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    setPasswordError("");
    axios
      .put(`/api/users/${user._id}`, { password })
      .then((res) => {
        dispatch({ type: "UPDATE_USER", payload: res.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleNameSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={handleName}
            required
          />
          <small className="form-text text-muted">{nameError ? nameError : ""}</small>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>

      <form onSubmit={handleUsernameSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsername}
            required
          />
          <small className="form-text text-muted">{usernameError ? usernameError : ""}</small>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>

      <form onSubmit={handleEmailSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmail}
            required
          />
          <small className="form-text text-muted">{emailError ? emailError : ""}</small>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePassword}
            required
          />
          <small className="form-text text-muted">{passwordError ? passwordError : ""}</small>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
