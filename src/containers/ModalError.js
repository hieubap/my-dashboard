import { forwardRef, useImperativeHandle, useState } from "react";
import ModalTrade from "@components/ModalTrade";
import TradeButton from "@components/TradeButton";
import { BackIcon } from "@assets/svg";

const ModalError = (props, ref) => {
  const { content, visible, onCancel } = props;

  return (
    <ModalTrade
      title={
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center hovered hover-pointer"
            style={{ marginRight: "4px" }}
            onClick={onCancel}
          >
            <BackIcon />
          </div>
          <span>Error</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      closable={true}
      footer={
        <TradeButton
          style={{ marginLeft: "auto" }}
          content={"OK"}
          type="gradient"
          onClick={onCancel}
        />
      }
      {...props}
    >
      <div className="install-wallet-modal d-flex">
        {/* <div className="p-2">
          <img
            alt="metamask"
            src={require("@images/trade/modal_metamask.png")}
            width={84}
            height={84}
          />
        </div> */}
        <div className="p-2">
          {/* <h1 style={{ fontSize: "16px", fontWeight: "700" }}>MetaMask</h1> */}
          <p className="text-justify" fontSize="16px">
            {content}
          </p>
        </div>
      </div>
    </ModalTrade>
  );
};
export default forwardRef(ModalError);
