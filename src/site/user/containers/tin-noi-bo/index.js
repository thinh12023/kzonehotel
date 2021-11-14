import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import New from "../../components/New";
import Banner from "../../components/Banner";
import { Icon, message } from "antd";
import { useHistory } from "react-router";
function LoaiPhong({
  dsTinNoiBo,
  onSearchTinNoiBo,
  ...props
}) {
  const { push } = useHistory();
  useEffect(() => {
    onSearchTinNoiBo({ size: 999 })
  }, []);
  return (
    <Main>
      <Banner title="Tin Tức Nội Bộ Khách Sạn" />
      <div className="main">
        {dsTinNoiBo?.map((item, index) => {
          let direction = "row";
          if (index % 2 == 0) {
            direction = "row-reverse";
          }
          else direction = "row";
          return (
            <New
              direction={direction}
              item={item}
              key={index}
              onClick={(e) => {
                push("/tin-noi-bo/" + item?.id)
              }}
            />
          )
        })}
      </div>
    </Main>
  )
}

export default connect(
  (state) => ({
    dsTinNoiBo: state.tinNoiBo.dsTinNoiBo || [],
  }),
  ({
    tinNoiBo: {
      onSearch: onSearchTinNoiBo,
    }
  }) => ({
    onSearchTinNoiBo,
  })
)(LoaiPhong);