import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import moment from "moment";
import Infomation from "../components/Infomation";
import Content from "../components/Content";
import { Main } from "./styled";
import {
  Form,
  Spin,
  Button,
  Icon,
  message,
  Upload,
} from "antd";
import { HOST } from "client/request";
import { useHistory } from "react-router";

function SuKien({
  isUploadImage,
  isLoading,
  isLoadingCreate,
  currentItem,
  onImageUpload,
  content,
  onCreate,
  onUpdate,
  onSearchById,
  ...props
}) {
  const { push } = useHistory();
  const [state, _setState] = useState({});
  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { getFieldDecorator } = props.form;

  const onChange = (type) => (e) => {
    setState({
      [type]: e?.hasOwnProperty("target")
        ? e.target.value
        : e?.hasOwnProperty("_d")
          ? moment(e._d).format("YYYY-MM-DD HH:mm:ss")
          : e,
    });
  };

  const onSave = () => {
    props.form.validateFields((error, values) => {
      if (!error) {
        let payload = {
          title: props.form.getFieldValue("title"),
          desc: props.form.getFieldValue("desc"),
          content: content,
          image: state.image,
        };
        if (!state.id) {
          //TODO:create:
          onCreate(payload)
            .then(s => {
              push("/admin/su-kien");
            })
            .catch(e => {
              push("/admin/su-kien");
            })
        } else {
          //TODO: update
          onUpdate({
            id: state.id,
            payload,
          })
        }
        push("/admin/su-kien");
      }
    });
  };
  const uploadButton = (
    <div>
      {isUploadImage ? <Icon type="loading" /> : <Icon type="plus" />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChangeUploadImage = (data) => {
    if (data.file.status !== "uploading") {
      if (data.file.type.match('image.*') === null) {
        message.error("Vui l??ng nh???p ????ng ?????nh d???ng ???nh!")
        return;
      } else {
        onImageUpload({ file: data.file.originFileObj }).then((s) => {
          setState({
            image: s,
          });
        });
      }
    }
  };
  useEffect(() => {
    if (props.match.params.id == "tao-moi") {

    } else {
      //TODO: get room type by id
      onSearchById(props.match.params.id);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    setState({
      id: currentItem?.id,
      isReadOnly: mode == "view" ? true : false,
      image: currentItem?.image,
    });
  }, [currentItem]);

  useEffect(() => { }, []);

  const filterOption = (input, option) => {
    return (
      (option.props.name || option.props.children)
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  return (
    <Main>
      <AdminPage>
        <Panel
          title={`${props.match.params.id == "tao-moi"
            ? "TH??M M???I"
            : state.isReadOnly
              ? "XEM TH??NG TIN"
              : "CH???NH S???A"
            } B??I VI???T
          `}
          icon={[<i className="fal fa-window"></i>]}
          toolbar={
            <div className="panel-tag">
              {!state.isReadOnly && (
                <Button
                  style={{ minWidth: 100, marginRight: "10px" }}
                  type="primary"
                  onClick={onSave}
                >
                  L??u
                </Button>
              )}
            </div>
          }
        >
          <Spin spinning={isLoadingCreate}>
            <Form>
              <div className="view-main">
                <div className="view-main__field">
                  <Infomation
                    title="Th??ng tin b??i vi???t"
                    filterOption={filterOption}
                    form={props.form}
                  />
                  <Form.Item label="???nh">
                    {getFieldDecorator("image", {
                      rules: [
                        {
                          required: true,
                          message: "Vui l??ng upload ???nh!",
                        },
                      ],
                      initialValue: state.image,
                    })(
                      <Upload
                        accept="image/*"
                        disabled={state.isReadOnly}
                        showUploadList={false}
                        listType="picture-card"
                        className="avatar-uploader"
                        onChange={handleChangeUploadImage}

                      >
                        {state.image ? (
                          <img
                            src={HOST + `images/${state.image}`}
                            alt="???nh b??i vi???t"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    )}
                  </Form.Item>
                </div>
                <div className="view-main__field">
                  <Content
                    form={props.form}
                    title="N???i dung b??i vi???t"
                    filterOption={filterOption}
                  />
                </div>
              </div>
            </Form>
          </Spin>
        </Panel>
      </AdminPage>
    </Main >
  );
}
export default Form.create({})(
  connect(
    (state) => ({
      isLoading: state.suKien.isLoading || false,
      isLoadingCreate: state.suKien.isLoadingCreate || false,
      currentItem: state.suKien.currentItem,
      content: state.suKien.content,
      isUploadImage: state.image.isUploadImage || false,
    }),
    ({
      image: { onImageUpload },
      suKien: {
        onUpdate,
        onCreate,
        onSearchById,
        updateData,
      }
    }) => {
      return {
        onCreate,
        onUpdate,
        updateData,
        onSearchById,
        onImageUpload,
      };
    }
  )(SuKien)
);
