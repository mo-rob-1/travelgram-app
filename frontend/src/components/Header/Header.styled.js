import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageHeader = styled.header`
  padding-top: 2rem;
  padding-bottom: 2rem;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledLogoLink = styled(Link)`
  color: #222;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
`;

export const LogoWrapper = styled.div`
  text-align: center;
`;

export const Nav = styled.nav`
  margin-top: 1rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export const NavWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const StyledNavLink = styled(Link)`
  color: #222;
  text-decoration: none;
  margin-right: 1rem;
  @media (min-width: 768px) {
    margin-right: 2.5rem;
  }
`;

export const LogoutButton = styled.button`
  cursor: pointer;
  background-color: inherit;
  border: none;
  color: #222;
`;

export const Span = styled.span`
  font-weight: 400;
`;
