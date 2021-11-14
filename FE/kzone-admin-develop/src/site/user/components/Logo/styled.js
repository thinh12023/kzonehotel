import styled from "styled-components/macro";

const Main = styled.div`
  width: 10%;
  display: flex;
  & img {
    object-fit: contain;
    width: 100px;
    height: auto;
  }
`;

export { Main };