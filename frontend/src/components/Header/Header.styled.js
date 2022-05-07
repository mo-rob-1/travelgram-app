import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageHeader = styled.header`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

export const StyledNavLink = styled(Link)`
  color: #222;
  text-decoration: none;
  margin-right: 1rem;
`;
