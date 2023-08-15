import { Button, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { BaseModalFooterWrapper, BaseModalTitleWrapper } from "./styled";

export default function BaseModal({
  openModal,
  setOpenModal,
  handleOpenModal,
  width,
  titleModal,
  buttonFooter,
  arrowBack,
  content,
  checkRequired,
  footerStake,
  footerClaim,
  // amount,
  // duration,
}) {
  const handleOk = async () => {
    setOpenModal(false);
  };
  const handleCancel = async () => {
    setOpenModal(false);
  };

  return (
    <Modal
      width={width}
      className="modalWrapper"
      title={
        <BaseModalTitleWrapper>
          {arrowBack && (
            <span onClick={handleCancel} className="arrow-back">
              <img src={require("@images/arrow-to-left.png")} />
            </span>
          )}
          <span className="title-modal">{titleModal}</span>
          {/* <span onClick={handleCancel} className="x-button">
            <img src={require("@images/x-button.png")} />
          </span> */}
        </BaseModalTitleWrapper>
      }
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <BaseModalFooterWrapper>
          {
            <button
              // disabled={!checkRequired}
              onClick={handleOpenModal ? handleOpenModal : handleCancel}
              // onClick={() => stake}
              className={"btn btn-primary"}
              style={{borderRadius: 50,width: 100}}
            >
              {buttonFooter}
            </button>
          }
        </BaseModalFooterWrapper>
      }
    >
      {content}
    </Modal>
  );
}
