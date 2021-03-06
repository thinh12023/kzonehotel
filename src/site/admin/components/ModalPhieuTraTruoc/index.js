import React, {
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { Main } from "./styled";
import {
  Button,
  Form,
  Input,
  Spin,
  Select,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import { LOAI_PHIEU_THU } from "../../../../constant";

const ModalPhieuTraTruoc = ({
  isLoadingCreate,
  onCreate,
  ...props
}, ref) => {
  const { form: { getFieldDecorator } } = props;

  const [state, _setState] = useState({});

  const setState = (data = {}) => {
    _setState((state) => ({
      ...state,
      ...data,
    }));
  };
  useImperativeHandle(ref, () => ({
    show: ({ idBooking }) => {
      setState({
        show: true,
        idBooking,
      });
      props.form.resetFields();
    },
  }));
  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? e._d
          : e,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefaults();
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          const payload = {
            totalMoney: state.totalMoney,
            note: "",
            description: "",
            type: LOAI_PHIEU_THU.TRA_TRUOC,
            idBooking: state.idBooking,
          };
          if (!state.id)
            //TODO: create receipt
            onCreate(payload)
              .then((s) => {
                window.location.reload();
                setState({ show: false });
              })
              .catch((e) => {
                window.location.reload()
                setState({ show: false });
              });
        }
      });
    } else setState({ show: false });
  };

  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 660 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={false}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.isReadOnly
                ? "TH??NG TIN"
                : "CH???NH S???A"
              : "TH??M M???I"}{" "}
            PHI???U TR??? TR?????C
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item label={"S??? ti???n"}>
                    {getFieldDecorator("totalMoney", {
                      rules: [
                        {
                          required: true,
                          message: "Vui l??ng nh???p s??? ti???n tr??? tr?????c!",
                        }
                      ],
                      initialValue: state.totalMoney,
                    })(
                      <Input
                        disabled={state.isReadOnly}
                        onChange={onChange("totalMoney")}
                        placeholder={"S??? ti???n tr??? tr?????c"}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <div className="action-footer">
          {state.isReadOnly ? (
            <Button
              type="danger"
              style={{
                minWidth: 100,
              }}
              onClick={onOK(false)}
            >
              ????ng
            </Button>
          ) : (
            <>
              <Button
                type="danger"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(false)}
              >
                Hu???
              </Button>
              <Button
                type="primary"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(true)}
              >
                L??u
              </Button>
            </>
          )}
        </div>
      </Spin>
    </Main>
  );
};

export default Form.create({})(
  connect(
    (state) => ({
      isLoadingCreate: state.phieuThu.isLoadingCreate || false,
    }),
    ({
      phieuThu: {
        onCreate,
      }
    }) => ({
      onCreate,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalPhieuTraTruoc))
);
