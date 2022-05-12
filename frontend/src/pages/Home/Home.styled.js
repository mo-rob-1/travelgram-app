import styled from "styled-components";
import { Link } from "react-router-dom";

export const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

export const Figure = styled.figure`
  position: relative;
`;

export const Location = styled.figcaption`
  position: absolute;
  bottom: 0;
  padding: 1rem;
  color: #fff;
  background-color: #222222b8;
  font-size: 14px;
`;

export const Username = styled.figcaption`
  position: absolute;
  top: 0;
  right: 0;
  background: #222222b8;
  color: #fff;
  padding: 1rem;
  font-size: 14px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.section`
  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 3rem;
  }
`;

export const Title = styled.h1`
  margin-top: 0;
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

export const LoginLink = styled(Link)`
  text-align: center;
  color: #fff;
  padding: 1rem;
  background-color: #222;
  text-decoration: none;
`;

export const Span = styled.span`
  font-weight: 400;
`;
