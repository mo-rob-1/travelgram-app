import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 0.6rem;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #222;
  color: #fff;
  border: none;
  padding: 0.8rem 0.8rem;
  cursor: pointer;
`;

export const HeadingWrapper = styled.div`
  text-align: center;
  margin-bottom: 2.8rem;
`;

export const Heading = styled.h1`
  margin-top: 0;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const FormWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  background-color: #fff;
  padding: 5rem 3rem;
  border-radius: 0.6rem;
`;

export const LinkWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

export const StyledLink = styled(Link)`
  color: #222;
`;

export const ChooseFile = styled.input`
  width: 50%;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    width: 100%;
  }
`;
