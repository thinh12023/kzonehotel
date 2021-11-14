import React from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { HOST } from "client/request";
import {formatNumber} from "utils/index";

function Room({
  item,
  ...props
}) {

  return (
    <Main {...props} bg={`${HOST}images/${item?.thumb}`}>
      <div className="name"><span>{item?.name} </span></div>
      <div className="Content">      
        <span >Số Người: {item?.numberOfPerson}</span>
        <span>Số Giường: {item?.numberOfBed}</span>  
        <span>Diện Tích: {item?.square}m2</span> 
        <span>Giá Ở Qua Đêm: {formatNumber(item?.overnightRate)} VND</span> 
        <span>Giá Ở Cả Ngày: {formatNumber(item?.dailyRate)} VND</span>   
        <span> <i className="fal fa-bath"></i> 
         <i class="fal fa-air-conditioner"></i>
         <i class="fal fa-wifi"></i>
         <i class="fal fa-tv"></i>
         <i class="fal fa-phone"></i>
         <i class="fal fa-coffee"></i>
         <i class="fal fa-bed-alt"></i>
         <i class="fal fa-user-md"></i>
         </span>  
      </div>   
      
    </Main>
  )
}


export default connect()(Room);