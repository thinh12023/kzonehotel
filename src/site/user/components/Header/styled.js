import styled from "styled-components/macro";

const Main = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  & .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    background-color: #001b36;
    color: #9d5e00;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0 4px 4px -4px #855000d1;
  }
`;

export { Main };