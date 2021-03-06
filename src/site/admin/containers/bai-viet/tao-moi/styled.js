import styled from "styled-components/macro";

const Main = styled("div")`
  & * {
    font-size: .7rem !important;
  }
  & .list-action {
    display: flex;
    justify-content: space-around;
  }
  .error-message {
    width: 300px;
    height: auto;
    color: #282828;
    border-radius: 3px;
    box-shadow: 0px 1px 1px 1px grey;
  }
  & .view-main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    & .view-main__field {
      border-radius: 15px;
      padding: 10px 10px;
      box-shadow: 0px 0px 5px 2px #d8d8d8bd;
      &:first-of-type {
        width: 25%;
      }
      &:last-of-type{
        width: 74%;
      }
      & .ant-row {
        margin: 0 !important;
      }
    }
  }
  .ant-input-number {
    width: 100%;
    & .ant-input-number-handler-wrap {
      display: none;
    }
  }
`;

export { Main };
