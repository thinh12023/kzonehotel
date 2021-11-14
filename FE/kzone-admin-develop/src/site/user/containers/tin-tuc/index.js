import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import New from "../../components/New";
import Banner from "../../components/Banner";
import { Icon, message } from "antd";
import { useHistory } from "react-router";
function LoaiPhong({
  dsBaiViet,
  onSearchBaiViet,
  ...props
}) {
  const { push } = useHistory();
  useEffect(() => {
    onSearchBaiViet({ size: 999 })
  }, []);
  return (
    <Main>
      <Banner title="Tin Tức Khách Sạn" />
      <div className="main">
        {dsBaiViet?.map((item, index) => {
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
                push("/tin-tuc/" + item?.id)
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
    dsBaiViet: state.baiViet.dsBaiViet || [],
  }),
  ({
    baiViet: {
      onSearch: onSearchBaiViet,
    }
  }) => ({
    onSearchBaiViet,
  })
)(LoaiPhong);