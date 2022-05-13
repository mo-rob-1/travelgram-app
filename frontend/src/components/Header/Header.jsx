import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import {
  PageHeader,
  Nav,
  NavWrapper,
  LogoWrapper,
  List,
  StyledLogoLink,
  StyledNavLink,
  LogoutButton,
  Span,
} from "./Header.styled";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <PageHeader>
      <LogoWrapper>
        <StyledLogoLink to="/">
          <Span>travel</Span>Gram
        </StyledLogoLink>
      </LogoWrapper>
      <NavWrapper>
        <Nav>
          <List>
            {user ? (
              <>
                <li>
                  <StyledNavLink to="/">Home</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/our-users">Our Users</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/upload-image">Upload Image</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/my-images">My Images</StyledNavLink>
                </li>
                <li>
                  <LogoutButton onClick={onLogout}>Logout</LogoutButton>
                </li>
              </>
            ) : (
              <>
                <li>
                  <StyledNavLink to="/">Home</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/about">About</StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/our-users" data-testid="our-users-link">
                    Our Users
                  </StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/login" data-testid="login-link">
                    Login
                  </StyledNavLink>
                </li>
                <li>
                  <StyledNavLink to="/register" data-testid="register-link" style={{ marginRight: 0 }}>
                    Register
                  </StyledNavLink>
                </li>
              </>
            )}
          </List>
        </Nav>
      </NavWrapper>
    </PageHeader>
  );
}

export default Header;
