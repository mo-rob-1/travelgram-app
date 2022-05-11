import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import {
  Container,
  StyledLink,
  Input,
  Button,
  Heading,
  HeadingWrapper,
  EmailFieldWrapper,
  FormWrapper,
  LinkWrapper,
  Section,
} from "./Login.styled";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when user is logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <Section>
        <h2 style={{ marginBottom: "1rem" }}>Loading...</h2>
        <p>If the page is still loading, refresh page and try again (Ensure email and password are correct)</p>
      </Section>
    );
  }

  return (
    <>
      <Container>
        <FormWrapper>
          <HeadingWrapper>
            <Heading>Login</Heading>
            <p>Login to access your account</p>
          </HeadingWrapper>
          <section>
            <form onSubmit={onSubmit}>
              <EmailFieldWrapper>
                <label htmlFor="email">Email:</label>
                <Input
                  type="email"
                  data-testid="email-input"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </EmailFieldWrapper>

              <div>
                <label htmlFor="password">Password:</label>
                <Input
                  type="password"
                  data-testid="password-input"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>

              <div>
                <Button type="submit">Login</Button>
              </div>

              <LinkWrapper>
                <StyledLink to="/register">Sign Up Instead</StyledLink>
              </LinkWrapper>
            </form>
          </section>
        </FormWrapper>
      </Container>
    </>
  );
}

export default Login;
