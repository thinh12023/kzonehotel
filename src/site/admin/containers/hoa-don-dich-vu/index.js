import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel, FilterBox } from "site/admin/components/admin";
import { Pagination, Table } from "site/admin/components/common";
import ModalPhieuDichVu from "site/admin/components/ModalPhieuDichVu";
import { Main } from "./styled";
import {
  Input,
  Select,
  Button,
  Modal,
  Spin,
  Icon,
  Checkbox,
  message,
  Tooltip,
  Tag,
} from "antd";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

function ServiceBill({
  total,
  size,
  page,
  sortType,
  isLoading,
  isLoadingCreate,
  dsPhieuDichVu,
  onSearchLoaiPhong,
  onSearchPhieuDichVu,
  onDeletePhieuDichVu,
  onChangeInputSearch,
  onSearchDichVu,
  ...props
}) {
  const refTimeOut = useRef(null);
  const refPhieuDichVu = useRef(null);
  const idsPhieuDichVu = dsPhieuDichVu.map((item) => item?.id);

  const [state, _setState] = useState({
    expandedRowKeys: new Set(),
    showCheckBox: false,
    selectedItem: [],
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const onChangeInput = (type) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChangeInputSearch({
          [type]: value,
        });
      },
      300,
      e?.target ? e?.target?.value : e
    );
  };

  const onChangeSelect = (type) => (e) => {
    onChangeInputSearch({
      [type]: e && e.target ? e.target.value : e,
    });
  };

  const onChange = (type) => e => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? e._d
          : e
    })
  }

  const onChangePage = (page) => {
    onSearchPhieuDichVu({ page });
  };
  const onChangeSize = (size) => {
    onSearchPhieuDichVu({ size });
  };
  function showConfirm(item) {
    confirm({
      title: "X??c nh???n",
      icon: <Icon type="delete" />,
      content: `B???n c?? mu???n x??a phi???u d???ch v??? ${item.code}`,
      okText: "?????ng ??",
      cancelText: "H???y b???",
      onOk() {
        onDeletePhieuDichVu({ id: item.id });
      },
    });
  }

  const onClickAction = ({ type = "add", payload = {} }) => (e) => {
    switch (type) {
      case "delete":
        showConfirm(payload);
        break;
      case "view":
        showModalPhieuDichVu(payload, true);
        break;
      default:
        break;
    }
  };

  const onDeleteMultiple = () => {
    if (state.selectedItem.length > 0) {
      confirm({
        title: "X??c nh???n",
        icon: <Icon type="delete" />,
        content: `B???n c?? mu???n x??a ${state.selectedItem.length} danh m???c`,
        okText: "?????ng ??",
        cancelText: "H???y b???",
        onOk() {
          // props.onDeleteMultiple(state.selectedItem);
        },
      });
      return;
    }
    message.warning("B???n ch??a ch???n danh m???c s???n ph???m n??o");
  };

  const showModalPhieuDichVu = (payload, isReadOnly) => {
    if (refPhieuDichVu.current) {
      refPhieuDichVu.current.show(payload, payload?.idRoom, payload?.idBooking);
    }
  };

  const filterOption = (input, option) => {
    return (
      (option.props.name || option.props.children)
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };

  const onChangeCheckBox = (value) => () => {
    const index = state.selectedItem.indexOf(value);
    if (index != -1) {
      state.selectedItem.splice(index, 1);
      setState({
        selectedItem: [...state.selectedItem],
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, value],
      });
    }
  };

  const showCheckBox = () => {
    setState({
      showCheckBox: !state.showCheckBox,
      selectedItem: [],
    });
  };

  const onRow = (record, rowIndex) => {
    return {
      onDoubleClick: (event) => {
        showCheckBox();
      },
    };
  };

  const onChangeCheckBoxAll = (e) => {
    if (!e?.target?.checked) {
      setState({
        selectedItem: state.selectedItem.filter(
          (item, index) => !idsPhieuDichVu.includes(item)
        ),
      });
    } else {
      setState({
        selectedItem: [...state.selectedItem, ...idsPhieuDichVu].filter(
          (item, i, self) => item && self.indexOf(item) === i
        ),
      });
    }
  };

  useEffect(() => {
    onSearchPhieuDichVu({
      dataSearch: { size: 10, page: 1 }
    });
    onSearchDichVu({});
  }, []);

  return (
    <Main>
      <AdminPage>
        <Panel
          title="Qu???n l?? phi???u d???ch v???"
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              <div className="right-area">
                {state.selectedItem.length > 0 && (
                  <Button
                    icon="delete"
                    type="danger"
                    onClick={onDeleteMultiple}
                  >
                    X??a phi???u d???ch v???
                  </Button>
                )}
                {/* <Button icon="plus" type="primary" onClick={onClickAction({})}>
                  Th??m ph??ng
                </Button> */}
              </div>
            </div>
          }
        >
          <div className="page-container">
            <div className="page-filter">
              <FilterBox
                title="M?? phi???u thu?? ph??ng"
                showExpandButton={true}
                showAddButton={false}
              >
                <Search
                  placeholder="T??m theo m?? phi???u thu?? ph??ng"
                  onChange={onChangeInput("codeBooking")}
                />
              </FilterBox>
              <FilterBox
                title="Tr???ng th??i ph??ng"
                showAddButton={false}
                showExpandButton={true}
              >
                <Select
                  placeholder="Tr???ng th??i thanh to??n"
                  onChange={onChangeInput("status")}
                >
                  <Option key={0} value={0}>???? thanh to??n</Option>
                  <Option key={1} value={1}>Ch??a thanh to??n</Option>
                </Select>
              </FilterBox>
            </div>
            <div className="page-main">
              <div className="fixed">
                <Spin spinning={isLoading}>
                  <Table
                    expandIconAsCell={false}
                    expandIconColumnIndex={-1}
                    rowClassName={(record, index) =>
                      state.expandedRowKeys.has(record?.key)
                        ? "table-row-selected"
                        : index % 2 === 0
                          ? "table-row-light"
                          : "table-row-dark"
                    }
                    onRow={onRow}
                    scroll={{ x: 800, y: "calc(100vh - 355px)" }}
                    className="custom"
                    rowKey="key"
                    columns={[
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">
                              <Checkbox
                                onChange={onChangeCheckBoxAll}
                                checked={idsPhieuDichVu?.every(
                                  (item, index, self) =>
                                    state.selectedItem.includes(item)
                                )}
                              />
                            </div>
                          </div>
                        ),
                        width: 70,
                        dataIndex: "id",
                        key: "0",
                        align: "center",
                        hidden: !state.showCheckBox,
                        render: (value, row, index) => {
                          return (
                            <Checkbox
                              onChange={onChangeCheckBox(value)}
                              checked={state.selectedItem.includes(value)}
                            />
                          );
                        },
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Tr???ng th??i</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "status",
                        key: "1",
                        align: "center",
                        render: (value) => value == 0
                          ? "???? thanh to??n"
                          : "Ch??a thanh to??n"
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">T???ng ti???n</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "totalPayment",
                        key: "2",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Ghi ch??</div>
                          </div>
                        ),
                        width: 150,
                        dataIndex: "note",
                        key: "3",
                        align: "center",
                      },
                      {
                        title: (
                          <div className="custome-header">
                            <div className="title-box">Action</div>
                          </div>
                        ),
                        width: 150,
                        key: "6",
                        align: "center",
                        fixed: "right",
                        render: (value, item, index) => {
                          return (
                            <div className="list-action">
                              <Tooltip title="Xem th??ng tin phi???u d???ch v???">
                                <Button
                                  type="primary"
                                  icon="eye"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "view",
                                    payload: item,
                                  })}
                                />
                              </Tooltip>
                              {/* <Tooltip title="Ch???nh s???a th??ng tin ">
                                <Button
                                  type="primary"
                                  icon="edit"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "edit",
                                    payload: item,
                                  })}
                                />
                              </Tooltip> */}
                              {/* <Tooltip title="X??a th??ng tin ph??ng">
                                <Button
                                  type="primary"
                                  icon="delete"
                                  size="small"
                                  onClick={onClickAction({
                                    type: "delete",
                                    payload: item,
                                  })}
                                />
                              </Tooltip> */}
                            </div>
                          );
                        },
                      },
                    ]}
                    dataSource={dsPhieuDichVu}
                  />
                  <div className="footer">
                    {total > 0 && (
                      <Pagination
                        onPageChange={onChangePage}
                        onChangeSize={onChangeSize}
                        page={page}
                        size={size}
                        total={total}
                        style={{ justifyContent: "flex-end" }}
                      />
                    )}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
          <ModalPhieuDichVu wrappedComponentRef={refPhieuDichVu} />
        </Panel>
      </AdminPage>
    </Main>
  );
}
export default connect(
  (state) => ({
    page: state.phieuDichVu.page || 1,
    size: state.phieuDichVu.size || 10,
    total: state.phieuDichVu.total || 0,
    isLoading: state.phieuDichVu.isLoading || false,
    isLoadingCreate: state.phieuDichVu.isLoadingCreate || false,
    dsPhieuDichVu: state.phieuDichVu.dsPhieuDichVu || [],
  }),
  ({
    phieuDichVu: {
      onSearch: onSearchPhieuDichVu,
      onDelete: onDeletePhieuDichVu,
      onChangeInputSearch,
    },
    dichVu: {
      onSearch: onSearchDichVu,
    }
  }) => {
    return {
      onSearchPhieuDichVu,
      onDeletePhieuDichVu,
      onChangeInputSearch,
      onSearchDichVu,
    };
  }
)(ServiceBill);
