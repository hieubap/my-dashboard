import { CorrectLine } from "@assets/animation";
import React from "react";
import BaseModal from "../../BaseModal";
import { SuccessModalWrapper } from "./styled";

export default function SuccessModal({
  openSuccessModal,
  setOpenSuccessModal,
  type,
  content,
}) {
  return (
    <>
      <BaseModal
        width={450}
        openModal={openSuccessModal}
        setOpenModal={setOpenSuccessModal}
        // handleOpenModal={setOpenSuccessModal}
        titleModal={
          type === "stake"
            ? "Stake successfully"
            : type === "redeem"
            ? "Redeem successfully"
            : "Claimed successfully"
        }
        buttonFooter={"OK"}
        arrowBack={false}
        content={
          <SuccessModalWrapper>
            <>
              <CorrectLine />
              {<div className="container">{content}</div>}
            </>
          </SuccessModalWrapper>
        }
      />
    </>
  );
}
