import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Main } from "./styled";
import {
  Input,
  Select,
  Modal,
  Icon,
  Form,
  Button,
  Tooltip,
  Tag,
} from "antd";
import Axios from "axios";
import { set } from "immutable";
import { param } from "jquery";
const qs=require('qs')
const { confirm } = Modal;


function Room({
  total,
  size,
  page,
  sortType,
  isLoading,
  isLoadingCreate,
  ...props
}) {

  const[mail,setMail]=useState(null)
  const[title,setTitle]=useState(null)
  const[content,setContent]=useState(null)

  const [sent,setsent] = useState(false);
  const [text,settext] = useState("");

  let datas={
    mails:mail,
    titles:title,
    contents:content,
  }
  const handleSend = async() =>{
    setsent(true);
    try{
      Axios({
        method:'post',
        url:"http://localhost:8888/mail/send_mail",       
        data:  datas,
      })
    }
    catch(err){
      console.log(err);
    }
    console.log({mail});
  };


  

  return (
    <Main>
      <AdminPage className="form-mail">
        <div className="panel" >
         <Form.Item  className="">
              <div>
                <div className="txtColor">Nhập Địa Chỉ Mail Khách Hàng</div>
                <Input className="input-td"  value={mail} onInput={e => setMail(e.target.value)}
                placeholder="Địa chỉ mail"                             
              />    
              </div>
                     
              <div>
                <div className="txtColor"  >Nhập Tiêu Đề Mail</div>
                <Input className="input-td" value={title} onInput={e => setTitle(e.target.value)}
                placeholder="Tiêu đề mail"               
              />    
              </div>
              <Input.TextArea rows={15}  value={content} onInput={e=> setContent(e.target.value)}
              
              ></Input.TextArea>
              <Button className="btn"
                  style={{ minWidth: 100, marginRight: "10px" }}
                  type="submit" 
                  onClick={handleSend}               
                >
                  Gửi 
              </Button>
          </Form.Item>
            
          
        </div>
      </AdminPage>
    </Main>
  );
}
export default connect(
  (state) => ({
    
  }),
  
)(Room);
