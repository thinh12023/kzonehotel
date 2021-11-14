import styled from "styled-components/macro";
const Main = styled.div`
  cursor: pointer;
  background-image: url(${({ bg }) => bg});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  width: 40%;
  height: 400px;
  max-height: 400px;
  position: relative;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.6s ease-in-out;
  border-radius: 10px;
  margin-bottom: 100px;
  &:hover {
    filter: saturate(2.3);
    transform: scaleX(1.1);


    & .Content{
      visibility: visible;
    }
  }
  & .Content{
    position: absolute;
    bottom: 70px;
    right: 0;
    left: 0;
    width: 100%;
    height: 65%;
    background-color: #00000090;
    color: #de8500;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 550;
    visibility: hidden;
    border-radius:0.5rem;
  }

  & .fa-air-conditioner{
    margin-left:10px;
  }
  & .fa-wifi{
    margin-left:10px;
  }
  & .fa-tv{
    margin-left:10px;
  }
  & .fa-phone{
    margin-left:10px;
  }
  & .fa-coffee{
    margin-left:10px;
  }
  & .fa-bed-alt{
    margin-left:10px;
  }
  & .fa-user-md{
    margin-left:10px;
  }
 
  & .name {
    position: absolute;
    bottom: 20px;
    right: 0;
    left: 0;
    width: 100%;
    height: 15%;
    background-color: #00000090;
    color: #de8500;
    display: flex;
    text-align: center;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 550;
    padding-right: 50px;
  }
  span{
    display:table;
    margin:0 auto;
  }
  
 
`;

export { Main };