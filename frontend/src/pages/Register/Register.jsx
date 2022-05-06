import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      const formData = new FormData();
      formData.append("avatar", avatar);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("username", username);
      formData.append("confirmPassword", confirmPassword);

      dispatch(register(formData));

      navigate("/");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleChange} required />
        </div>
        <div>
          <input
            type="text"
            placeholder="name"
            required
            value={name}
            data-testid="name-input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="username"
            data-testid="username-input"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="email"
            required
            value={email}
            data-testid="email-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            data-testid="password-input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            data-testid="confirm-password-input"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
