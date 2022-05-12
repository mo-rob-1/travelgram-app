import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  StyledLink,
  Input,
  Button,
  Heading,
  HeadingWrapper,
  FieldWrapper,
  FormWrapper,
  LinkWrapper,
  ChooseFile,
} from "./Register.styled";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Register | travelGram App</title>
      </Helmet>
      <Container>
        <FormWrapper>
          <HeadingWrapper>
            <Heading>Register</Heading>
            <p>Register to create an account</p>
          </HeadingWrapper>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="avatar">Add Profile Picture:</label>
              <br></br>
              <ChooseFile style={{ marginTop: "4px" }} type="file" onChange={handleChange} required />
            </div>
            <FieldWrapper>
              <label htmlFor="name">Name:</label>
              <Input
                type="text"
                required
                value={name}
                data-testid="name-input"
                onChange={(e) => setName(e.target.value)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="username">Username:</label>
              <Input
                type="text"
                data-testid="username-input"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="email">Email:</label>
              <Input
                type="text"
                required
                value={email}
                data-testid="email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="password">Password:</label>
              <Input
                type="password"
                value={password}
                data-testid="password-input"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FieldWrapper>
            <FieldWrapper>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Input
                type="password"
                value={confirmPassword}
                data-testid="confirm-password-input"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FieldWrapper>

            <div>
              <Button type="submit" data-testid="register-button">
                Register
              </Button>
            </div>

            <LinkWrapper>
              <StyledLink to="/login">Login Instead</StyledLink>
            </LinkWrapper>
          </form>
        </FormWrapper>
      </Container>
    </>
  );
}

export default Register;
