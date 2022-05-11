import styled from "styled-components";

export const List = styled.ul`
  list-style-type: none;
  display: grid;
  grid-gap: 1rem;
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    margin-top: 3rem;
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

export const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

export const Avatar = styled.img`
  height: 100px;
  object-fit: contain;
  border-radius: 50%;
  width: 100px;
  object-fit: cover;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NumberOfImagesWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const Name = styled.h4`
  display: block;
`;

export const UserInfoTextWrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Line = styled.div`
  height: 1px;
  background: #dfdfdf;
  margin-top: 1.5rem;
`;
