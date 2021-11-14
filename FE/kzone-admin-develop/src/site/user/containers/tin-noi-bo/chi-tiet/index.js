import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker, Form, Input, Spin, Button, InputNumber } from "antd";
import Banner from "../../../components/Banner";
import { HOST } from "client/request";
import moment from "moment";
import { removeVietnameseTones } from "utils";
import { useHistory } from "react-router";
function TinNoiBoChiTiet({
  isLoading,
  tinNoiBoHienTai,
  onSearchTinNoiBoById,
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
  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      onSearchTinNoiBoById(id);
    }
  }, [props.match.params.id]);
  useEffect(() => {

  }, []);
  return (
    <Spin spinning={isLoading}>
      <Banner title={`${tinNoiBoHienTai?.title}`} />
      <Main>
        <div className="img">
          <img src={`${HOST}images/${tinNoiBoHienTai?.image}`} alt="" />
        </div>
        <div className="content">
          {tinNoiBoHienTai?.content}
        </div>
      </Main>
    </Spin >
  )
}

export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.tinNoiBo.isLoading || false,
      tinNoiBoHienTai: state.tinNoiBo.tinNoiBoHienTai,
    }),
    ({
      tinNoiBo: {
        onSearchTinNoiBoById,
      },
    }) => ({
      onSearchTinNoiBoById,
    }),

  )(TinNoiBoChiTiet)
);