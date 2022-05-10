import styled from "styled-components";

export const Section = styled.section`
  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 3rem;
  }
`;

export const Canvas = styled.canvas`
  height: 300px;
  width: 100%;
  border: 2px solid lightgray;
  @media (min-width: 1440px) {
    height: 400px;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    gap: 3rem;
    margin-top: 3.5rem;
  }
  @media (min-width: 1440px) {
    gap: 5rem;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid lightgray;
  padding: 0.8rem 0.8rem;
  border-radius: 0.4rem;
  margin-top: 0.4rem;
`;

export const ButtonWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 0.8rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
  }
`;

export const Button = styled.button`
  background-color: #222;
  color: #fff;
  border: none;
  padding: 0.8rem 0.8rem;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

export const Title = styled.h1`
  margin-top: 0;
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

export const ColOne = styled.div`
  display: block;
`;

export const ColTwo = styled.div`
  display: block;
`;
