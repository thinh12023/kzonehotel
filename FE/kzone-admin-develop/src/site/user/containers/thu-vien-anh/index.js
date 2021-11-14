import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import New from "../../components/New";
import Banner from "../../components/Banner";
import { Icon, message } from "antd";
import { useHistory } from "react-router";
function LoaiPhong({
  dsSuKien,
  onSearchSuKien,
  ...props
}) {
  const { push } = useHistory();
  useEffect(() => {
    onSearchSuKien({ size: 999 })
  }, []);
  return (
    <Main>
      <Banner title="Sự Kiện" />
      <div className="main">
        {dsSuKien?.map((item, index) => {
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
                push("/su-kien/" + item?.id)
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
    dsSuKien: state.suKien.dsSuKien || [],
  }),
  ({
    suKien: {
      onSearch: onSearchSuKien,
    }
  }) => ({
    onSearchSuKien,
  })
)(LoaiPhong);