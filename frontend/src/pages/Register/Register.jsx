import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("confirmPassword", confirmPassword);

      dispatch(register(formData));

      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleChange} required />
          {/* <button type="submit">Upload</button> */}
        </div>
        <div>
          <input type="text" placeholder="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
