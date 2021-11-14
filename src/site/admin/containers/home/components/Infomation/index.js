import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import UnconfirmedBooking from "../UnconfirmedBooking";
import { useHistory } from "react-router";
import Axios from 'axios';

function Infomation({
  isLoading,
  dsPhieuChuaXacNhan,
  onSearchUnConfirmedBooking,
  booking,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  }
  let [ready,readied] = useState("");
  let [notReady,notReadied] = useState("");
  let [order,ordered] = useState("");
  let [inuse,inused] = useState("");
  const [sent,setsent] = useState(false);
  let datas={
    mails:"",
    titles:"",
    contents:"",
  }

  const handleReady = async() =>{
    Axios.get('http://localhost:8000/room/getRoomReady')
    .then(res=> {
      readied(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      console.log("" + error);
    });
  };

  const handleNotReady = async() =>{
    Axios.get('http://localhost:8000/room/getRoomNotReady')
    .then(res=> {
      notReadied(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      console.log("" + error);
    });
  };
  const handleInUse = async() =>{
    Axios.get('http://localhost:8000/room/getRoomInUse')
    .then(res=> {
      inused(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      console.log("" + error);
    });
  };
  const handleOrder = async() =>{
    Axios.get('http://localhost:8000/room/getRoomPreorder')
    .then(res=> {
      ordered(res.data.data);
      return res.data;
    })
    .catch(function (error) {
      console.log("" + error);
    });
  };

  const handleSend = async(mail,title,content) =>{
    setsent(true);
    try{
      Axios({
        method:'post',
        url:"http://localhost:8000/mail/send_mail",       
        data: {
        mails: mail,
        titles: title,
        contents:content
      }
        ,
      })
    }
    catch(err){
      console.log(err);
    }
    console.log({mail});
  };

  const handleChangeConfirm = async(ids,mail) =>{
    Axios.put(`http://localhost:8000/booking/changeConfirm/${ids}`)
    .then(res=> {
      ordered(res.data.data);
      handleSend(mail,"Đặt Phòng Thành Công","Qúy khách đã đặt phòng thành công tại khách sạn Kzone Hotel");
      return res.data;
    })
    .catch(function (error) {
      console.log("" + error);
    });
   window.location.reload();
  };

  const handleReject = async(ids,mail) =>{
    Axios.delete(`http://localhost:8000/booking/delete/${ids}`)   
    .catch(function (error) {
      console.log("" + error);
    });
    window.location.reload();
    handleSend(mail,"Đặt Phòng Thất Bại ","Xin lỗi quý khách vì sự bất tiên , hiện tại khách sạn chúng tôi đã đầy phòng")
  };

  useEffect(() => {
    onSearchUnConfirmedBooking({ isConfirm: 0 });
    handleReady();
    handleNotReady();
    handleOrder();
    handleInUse();
  }, []);
  
  return (
    <Spin spinning={isLoading}>
      <Main {...props}>
        <div className="fontColor" >Phòng còn trống:{ready} </div>
        <div className="fontColor">Phòng được đặt trước:{order} </div>
        <div  className="fontColor">Phòng đang sử dụng:{inuse} </div>
        <div  className="fontColor">Phòng đang sửa chữa, chưa dọn:{notReady} </div>
        <div className="border"></div>
        <div className="action">

        </div>
        <div className="info">
          {dsPhieuChuaXacNhan?.map((item, index) => (
            <div
            className="name"
            key={index}
            // onClick={() => {
            //   handleChangeConfirm(item.id)
            // }}
            >
              Khách: <span>{item?.guest?.profile?.name}</span> đã đặt online!
              <div className="btnRow">
              <div className="Buttons_accept"
                    onClick={()=>{handleChangeConfirm(item.id,item?.guest?.profile?.email)}}
                    // onClick={()=>{handleSend(item?.guest?.profile?.email)}}
              ><span>Accept</span></div>
              <div 
                    onClick={()=>{handleReject(item.id,item?.guest?.profile?.email)}}
              className="Buttons_reject"><span>Reject</span></div>
              </div>

            </div>
        
          ))}

        </div>
      </Main>
    </Spin>
  );
}


export default connect(
  (state) => ({
    isLoading: state.phieuThuePhong.isLoading || false,
    dsPhieuChuaXacNhan: state.phieuThuePhong.dsPhieuChuaXacNhan || [],
  }),
  ({
    phieuThuePhong: {
      onSearchUnConfirmedBooking,
    }
  }) => ({
    onSearchUnConfirmedBooking,
  })
)(Infomation);