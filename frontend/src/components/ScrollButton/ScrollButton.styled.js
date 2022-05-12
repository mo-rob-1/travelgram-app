import styled from "styled-components";

export const Button = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 40px;
  height: 20px;
  font-size: 3rem;
  z-index: 1;
  cursor: pointer;
  color: #fff;
  @media (min-width: 768px) {
    bottom: 50px;
    right: 2rem;
  }
`;
