import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
function LoaiPhongChiTiet({
  isLoadingCreate,
  onGuestBookRoom,
  isLoadingClient,
  currentItemClient,
  onSearchLoaiPhongById,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    })
  };
  const onSave = () => {
    props.form.validateFields((error, values) => {
      if (!error) {
        const payload = {
          checkinDate: moment(state.checkinDate).format("YYYY-MM-DD"),
          checkoutDate: moment(state.checkoutDate).format("YYYY-MM-DD"),
          dob: moment(state.dob).format("YYYY-MM-DD"),
          numberOfRoom: state.numberOfRoom,
          name: state.name,
          phone: state.phone,
          email: state.email,
          address: state.address,
          note: state.note,
          //identifyNumber: state.identifyNumber,
          unsignedName: removeVietnameseTones(state.name),
          idRoomType: currentItemClient?.id,
        };
        onGuestBookRoom(payload)
          .then(s => {
            push("/");
          })
          .catch(e => {
            push("/");
          });
      }
    });
  }
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      onSearchLoaiPhongById(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoadingClient}>
      <Banner title={`${currentItemClient?.name}`} />
      <Main>
        <div className="_row">
          <div className="_col">
            <img src={`${HOST}images/${currentItemClient?.thumb}`} alt="" />
          </div>
          <div className="_col">
            <div className="_i">
              <img src={require("resources/images/logo.png")} alt="" />
              <div className="price">{currentItemClient?.dailyRate} VNĐ/Ngày</div>
            </div>
            <Form className="form">
              <Form.Item>
                {getFieldDecorator("checkinDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày nhận phòng!"
                    }
                  ],
                  initialValue: state.checkinDate,
                })(
                  <DatePicker
                    placeholder="Ngày checkin"
                    format="DD / MM / YYYY"
                    onChange={onChange("checkinDate")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("checkoutDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày trả phòng!"
                    }
                  ],
                  initialValue: state.checkoutDate,
                })(
                  <DatePicker
                    placeholder="Ngày checkout"
                    format="DD / MM / YYYY"
                    onChange={onChange("checkoutDate")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("numberOfRoom", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số phòng đặt trước!"
                    }
                  ],
                  initialValue: state.numberOfRoom,
                })(
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Số phòng đặt trước"
                    onChange={onChange("numberOfRoom")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!"
                    }
                  ],
                  initialValue: state.name,
                })(
                  <Input
                    placeholder="Họ và tên"
                    onChange={onChange("name")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("dob", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn ngày sinh!"
                    }
                  ],
                  initialValue: state.dob,
                })(
                  <DatePicker
                    placeholder="Ngày sinh"
                    format="DD / MM / YYYY"
                    onChange={onChange("dob")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!"
                    }
                  ],
                  initialValue: state.phone,
                })(
                  <Input
                    placeholder="Số điện thoại"
                    onChange={onChange("phone")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập email!"
                    }
                  ],
                  initialValue: state.email,
                })(
                  <Input
                    placeholder="Email"
                    onChange={onChange("email")}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập address!"
                    }
                  ],
                  initialValue: state.address,
                })(
                  <Input
                    placeholder="Địa chỉ"
                    onChange={onChange("address")}
                  />
                )}
              </Form.Item>
              {/* <Form.Item>
                {getFieldDecorator("identifyNumber", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập CMND!"
                    }
                  ],
                  initialValue: state.identifyNumber,
                })(
                  <Input
                    placeholder="CMND"
                    onChange={onChange("identifyNumber")}
                  />
                )}
              </Form.Item> */}
              <Form.Item>
                {getFieldDecorator("note", {
                  rules: [],
                  initialValue: state.note,
                })(
                  <Input.TextArea
                    placeholder="Ghi chú"
                    onChange={onChange("note")}
                  />
                )}
              </Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={onSave}
              >
                Đặt phòng
              </Button>
            </Form>
          </div>
        </div>
        <div className="_row">

        </div>
        <div className="_row">

        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingClient: state.loaiPhong.isLoadingClient || false,
      isLoadingCreate: state.phieuThuePhong.isLoadingCreate || false,
      currentItemClient: state.loaiPhong.currentItemClient,
    }),
    ({
      loaiPhong: {
        onSearchLoaiPhongById,
      },
      phieuThuePhong: {
        onGuestBookRoom,
      }
    }) => ({
      onSearchLoaiPhongById,
      onGuestBookRoom,
    }),

  )(LoaiPhongChiTiet)
);