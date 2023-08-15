import { CorrectLine } from "@assets/animation";
import React from "react";
// import BaseModal from "../../BaseModal";
import { SuccessModalWrapper } from "./styled";
import BaseModal from "../BaseModal";

const defaultContainer = ({ content }) => (
  <>
    <CorrectLine />
    <div className="info-container">
      <div
        className="container"
        style={{ marginTop: 0, paddingTop: 5, paddingBottom: 15 }}
      >
        {content || "You register successfull"}
      </div>
    </div>
  </>
);

export default function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
  type,
  title,
  handleConfirm,
  content,
  buttonName,
  container = defaultContainer,
}) {
  return (
    <>
      <BaseModal
        width={450}
        openModal={openSuccessModal}
        setOpenModal={setOpenSuccessModal}
        handleOpenModal={handleConfirm}
        titleModal={title}
        buttonFooter={buttonName || "OK"}
        arrowBack={false}
        content={
          <SuccessModalWrapper>{container({ content })}</SuccessModalWrapper>
        }
      />
    </>
  );
}
