import styled from "styled-components";

const Main = styled.div`
  padding: 30px 30px;
  overflow-y: auto;
  & ._row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: auto;
    justify-content: space-between;
    @media(max-width: 800px) {
      flex-direction: column;
    }
    & ._col {
      box-shadow: inset 0 0 10px -5px #000;
      border-radius: 10px;
    }
    &:first-of-type {
      width: 80%;
      & ._col {
        &:first-of-type {
          width: 68%;
          min-height: 75vh;
          max-height: 75vh;
          @media(max-width: 800px) {
            width: 100%;
            margin-bottom: 20px;
          }
          & img {
            width: 100%;
            max-height: 75vh;
            object-fit: contain;
          }
        }
        &:nth-of-type(2) {
          & ._i {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & img {
              width: 100px;
              height: 100px;
              border-radius: 5px;
            }
            & .price {
              padding: 0 5px;
              font-size: 1.5rem;
              font-weight: 400;
              color: #b36f19;
            }
          }
        }
        &:last-of-type {
          width: 30%;
          min-height: 75vh;
          max-height: 78vh;

          @media(max-width: 800px) {
            width: 100%;
            margin-bottom: 20px;
          }
          & .form {
            overflow-y: auto;
            width: 100%;
            height: 100%;
            padding: 10px 10px;
          }
        }
      }
    }
  }
`;

export { Main };