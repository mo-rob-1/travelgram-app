import styled from "styled-components";
import { Link } from "react-router-dom";

export const List = styled.ul`
  list-style-type: none;
  display: grid;
  gap: 1.5rem;
  text-align: center;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ListItem = styled.li`
  background-color: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Avatar = styled.img`
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
  width: 100px;
  object-fit: cover;
`;

export const Title = styled.h1`
  /* text-align: center; */
  @media (min-width: 768px) {
    margin-top: 1rem;
    /* text-align: left; */
  }
`;

export const StyledCardLink = styled(Link)`
  text-decoration: none;
  color: #222;
`;

export const UsernameTitle = styled.h3`
  display: block;
`;

export const UserTextWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ViewProfile = styled(Link)`
  color: #222;
  margin-top: 1rem;
  font-weight: bold;
`;

export const Section = styled.section`
  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 3rem;
  }
`;
