import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  TimePicker,
  InputNumber,
} from "antd";
import { Main } from "./styled";
import moment from "moment";
import { FORMAT, DS_ } from "constant";

const { Option } = Select;
const { TextArea } = Input;

function ThongTinHoaDon({
  filterOption,
  updateData,
  onSearchTravelAgency,
  currentItem,
  typeOfBooking,
  dsTravelAgency,
  form,
  ...props
}) {
  const { getFieldDecorator } = form;
  const [state, _setState] = useState({});
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const onChange = (type) => (e) => {
    let newState = {
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d)
          : e,
    };
    setState(newState);
    if (type == "surcharge") {
      let totalPayment = 0, refund = 0;
      const totalMoney = currentItem?.totalRoomPayment
        + currentItem?.totalConsignmentPayment
        + currentItem?.totalServicePayment
        + parseFloat(newState[type])
        - currentItem?.discount;
      if (totalMoney > currentItem?.deposit) {
        refund = 0;
        totalPayment = totalMoney - currentItem?.deposit;
      }
      else if (totalMoney < currentItem?.deposit) {
        refund = currentItem?.deposit - totalMoney;
        totalPayment = 0;
      }
      else if (totalMoney == currentItem?.deposit) {
        refund = 0;
        totalPayment = 0;
      }
      updateData({
        currentItem: { ...currentItem, totalMoney, totalPayment, refund },
        surcharge: parseFloat(newState[type]),
      });
    }
  };
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }
  useEffect(() => {
    if (currentItem) {
      let payload = {
        checkinDate: moment(currentItem?.checkinDate, "YYYY-MM-DD"),
        checkinTime: moment(currentItem?.checkinTime, "HH:mm"),
        checkoutDate: moment(currentItem?.checkoutDate, "YYYY-MM-DD"),
        checkoutTime: moment(currentItem?.checkoutTime, "HH:mm"),
        surcharge: 0,
        deposit: currentItem?.deposit,
        note: "",
        totalRoomPayment: currentItem?.totalRoomPayment,
        totalServicePayment: currentItem?.totalServicePayment,
        totalConsignmentPayment: currentItem?.totalConsignmentPayment,
        totalPayment: currentItem?.totalPayment,
        totalMoney: currentItem?.totalMoney,
        refund: currentItem?.refund,
        type: typeOfBooking,
        idGuest: currentItem?.idGuest,
        idTravelAgency: currentItem?.idTravelAgency,
      };
      let travelAgency = dsTravelAgency?.find(i => i?.id == currentItem?.idTravelAgency);
      //TODO: map guest let guest = 
      setState({
        ...payload,
        travelAgency,
        // guest,
      });
    }
  }, [currentItem]);
  useEffect(() => {
    onSearchTravelAgency({ dataSearch: { size: 999 } });
  }, []);
  return (
    <Main>
      <div className="title">Th??ng tin h??a ????n</div>
      <div className="main">
        <div className="panelInfo">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("idGuest", {
                  rules: [
                    {
                      required: true,
                      message: "Kh??ch h??ng kh??ng ???????c ????? tr???ng!",
                    }
                  ],
                  initialValue: state.idGuest,
                })(
                  <Input
                    disabled={currentItem?.id == undefined ? true : false}
                    placeholder="Kh??ch h??ng"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator("checkinDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n ng??y ckeckin",
                    }
                  ],
                  initialValue: state.checkinDate,
                })(
                  <DatePicker
                    disabledDate={disabledDate}
                    disabled
                    format="DD / MM / YYYY"
                    placeholder="Ng??y checkin"
                    onChange={onChange("checkinDate")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("checkinTime", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n th???i gian checkin",
                    }
                  ],
                  initialValue: state.checkinTime,
                })(
                  <TimePicker
                    allowClear
                    disabled
                    format={FORMAT.FORMAT_TIME}
                    placeholder="Th???i gian checkin"
                    onChange={onChange("checkinTime")}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator("checkoutDate", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n ng??y ckeckout",
                    }
                  ],
                  initialValue: state.checkoutDate,
                })(
                  <DatePicker
                    format="DD / MM / YYYY"
                    placeholder="Ng??y checkin"
                    disabled
                    onChange={onChange("checkoutDate")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("checkoutTime", {
                  rules: [
                    {
                      required: true,
                      message: "Vui l??ng ch???n th???i gian checkout",
                    }
                  ],
                  initialValue: state.checkoutTime,
                })(
                  <TimePicker
                    allowClear
                    format={FORMAT.FORMAT_TIME}
                    disabled
                    placeholder="Th???i gian checkin"
                    onChange={onChange("checkoutTime")}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Form.Item>
                {getFieldDecorator("surcharge", {
                  rules: [],
                  initialValue: state.surcharge,
                })(
                  <InputNumber
                    placeholder="Ph??? thu"
                    min={0}
                    onChange={onChange("surcharge")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("deposit", {
                  rules: [],
                  initialValue: state.deposit,
                })(
                  <InputNumber
                    placeholder="Tr??? tr?????c"
                    min={0}
                    onChange={onChange("deposit")}
                    disabled
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="panelInfo">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("refund", {
                  rules: [],
                  initialValue: state.refund,
                })(
                  <InputNumber
                    placeholder="Ho??n l???i"
                    min={0}
                    disabled
                    onChange={onChange("refund")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("type", {
                  rules: [],
                  initialValue: state.type,
                })(
                  <Select
                    disabled
                    placeholder="H??nh th???c thu??"
                    onChange={onChange("type")}
                  >
                    {DS_?.map((item, index) => (
                      <Option key={`col${index}`} value={item?.value}>
                        {item?.title}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("note", {
                  rules: [],
                  initialValue: state.note,
                })(
                  <TextArea
                    onChange={onChange("note")}
                    placeholder="Ghi ch??"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="panelInfo">
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("totalRoomPayment", {
                  rules: [
                    {
                      required: true,
                      message: "T???ng ti???n thu?? ph??ng kh??ng ???????c ????? tr???ng",
                    }
                  ],
                  initialValue: state.totalRoomPayment,
                })(
                  <InputNumber
                    placeholder="T???ng ti???n thu?? ph??ng"
                    min={0}
                    disabled
                    onChange={onChange("totalRoomPayment")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("totalServicePayment", {
                  rules: [
                  ],
                  initialValue: state.totalServicePayment,
                })(
                  <InputNumber
                    disabled
                    placeholder="T???ng ti???n d???ch v???"
                    onChange={onChange("totalServicePayment")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("totalConsignmentPayment", {
                  rules: [
                  ],
                  initialValue: state.totalConsignmentPayment,
                })(
                  <InputNumber
                    disabled
                    placeholder="T???ng ti???n h??a ????n k?? g???i"
                    onChange={onChange("totalConsignmentPayment")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("totalMoney", {
                  initialValue: state.totalMoney,
                })(
                  <InputNumber
                    disabled
                    min={0}
                    placeholder="Th??nh ti???n"
                    onChange={onChange("totalMoney")}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("totalPayment", {
                  rules: [{
                    required: true,
                    message: "T???ng ti???n thanh to??n kh??ng ???????c ????? tr???ng"
                  }],
                  initialValue: state.totalPayment,
                })(
                  <InputNumber
                    disabled
                    min={0}
                    placeholder="T???ng ti???n thanh to??n"
                    onChange={onChange("totalPayment")}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

        </div>
      </div>
    </Main>
  );
}
export default connect(
  (state) => ({
    dsTravelAgency: state.travelAgency.dsTravelAgency || [],
    currentItem: state.hoaDonThuePhong.currentItem,
    typeOfBooking: state.hoaDonThuePhong.typeOfBooking,
  }),
  ({
    travelAgency: {
      onSearch: onSearchTravelAgency,
    },
    hoaDonThuePhong: {
      updateData,
    }
  }) => {
    return {
      updateData,
      onSearchTravelAgency,
    };
  }
)(ThongTinHoaDon);
