import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import { LoadingRef } from "@src/App";
import CryptoService from "@src/CryptoService";
import { drawAddress } from "@src/containers/utils";
import { saveData } from "@src/service";
import { Web3 } from "@src/web3";
import { Checkbox, Collapse } from "antd";
import { createHash } from "crypto-browserify";
import { ethers } from "ethers";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useWalletClient } from "wagmi";

export const listGroup = [
  "Danh sách dịch vụ",
  "Thông tin hành chính",
  "Tóm tắt bệnh án",
];
export const listDichVu = [
  "Siêu âm tuyến giáp",
  // "Xét nghiệm Papsmear chẩn đoán tế bào cổ tử cung – âm đạo",
  "Chụp CLVT phổi liều thấp (từ 64- 128 dãy) (không tiêm thuốc cản quang)",
  "Siêu âm tuyến vú hai bên",
  "Khám Nội gói khám sức khỏe",
  "Siêu âm ổ bụng tổng quát",
  "Tổng phân tích nước tiểu (Bằng máy tự động)",
  "Khám Sản Phụ Khoa",
  "Đo hoạt độ GGT [Máu]",
  "Định lượng Urê [Máu]",
  "Định lượng Triglycerid [Máu]",
  "Định lượng Cholesterol toàn phần [Máu]",
  "Định lượng LDL - C [Máu]",
  "Đo hoạt độ ALT (GPT) [Máu]",
  "Định lượng Glucose[Máu] Ngoại viện",
  "Điện tim thường",
  "Định lượng Creatinin [Máu]",
  "Định lượng Acid Uric [Máu]",
  "Định lượng HDL-C [Máu]",
  "Đo hoạt độ AST (GOT) [Máu]",
  "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",
];
export const listKetLuanKham = [
  "Tuần hoàn",
  "Tiêu hóa",
  "Cơ xương khớp",
  "Thần kinh",
  "Tâm thần",
  "Hô hấp",
  "Thận tiết niệu",
  "Nội tiết",
];
export const listCDHA = [
  "Siêu âm tuyến giáp",
  "Siêu âm ổ bụng tổng quát",
  "Siêu âm tuyến vú hai bên",
  "Chụp CLVT phổi liều thấp (từ 64- 128 dãy) (không tiêm thuốc cản quang)",
  "Điện tim thường",
];
function ConvertPrivateKey() {
  const data = useRef({}).current;
  const [state, _setState] = useState({
    privateKey: "",
    secretPhrase: "",
    walletAddress: "",
    secretPhraseIn: "",
    privateKeyIn: "",
    histories: [],
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  return (
    <div className="container-xxl py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          {/* <h6 className="section-title text-center text-primary text-uppercase">
            Medical record
          </h6> */}
          <div className="mb-5">
            <h1>
              Convert{" "}
              <span className="text-primary text-uppercase">Private key</span>
            </h1>
            <h5 className="text-danger text-uppercase">{state.error}</h5>
          </div>
        </div>
        <div className="row row-custom g-5">
          <div className="col-lg-4">
            <h3>Form</h3>
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <div>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder=""
                        id="message"
                        style={{ height: "100px" }}
                        onChange={(e) => {
                          data.secretPhraseIn = e.target.value;
                        }}
                      />
                      <label htmlFor="message">Secret phrase</label>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>OR</div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder=""
                        id="message"
                        style={{ height: "100px" }}
                        onChange={(e) => {
                          data.privateKeyIn = e.target.value;
                        }}
                      />
                      <label htmlFor="message">Private key</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      onClick={() => {
                        console.log(data, "data?");
                        try {
                          const wallet = data.privateKeyIn
                            ? new ethers.Wallet(data.privateKeyIn)
                            : ethers.Wallet.fromMnemonic(data.secretPhraseIn);

                          console.log(wallet, "wallet");

                          const addWallet = {
                            privateKey: wallet.privateKey,
                            secretPhrase: wallet.mnemonic?.phrase || "Unknown",
                            walletAddress: wallet.address,
                          };
                          setState({
                            ...addWallet,
                            histories: [addWallet, ...state.histories],
                          });
                        } catch (e) {
                          setState({ error: e?.toString() });
                        }
                      }}
                    >
                      Convert
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>Result</h3>
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-floating">
                  <textarea
                    type="text"
                    className="form-control"
                    id="secretPhraseId"
                    style={{ height: "100px" }}
                    value={state.secretPhrase}
                  />
                  <label htmlFor="secretPhraseId">Secret phrase</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="privateKeyId"
                    value={state.privateKey}
                    style={{ height: "100px" }}
                  />
                  <label htmlFor="privateKeyId">Private key</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="walletAddressId"
                    style={{ height: "100px" }}
                    value={state.walletAddress}
                  />
                  <label htmlFor="walletAddressId">Address</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h3>History</h3>
            <Collapse defaultActiveKey={"1"}>
              {state.histories.map((wallet, index) => (
                <Collapse.Panel
                  header={drawAddress(wallet.walletAddress, 12)}
                  key={index}
                >
                  <div className="col-md-12">
                    <div className="form-floating">
                      <textarea
                        type="text"
                        className="form-control"
                        id="secretPhraseId"
                        style={{ height: "80px" }}
                        value={wallet.secretPhrase}
                      />
                      <label htmlFor="secretPhraseId">Secret phrase</label>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="privateKeyId"
                        value={wallet.privateKey}
                        style={{ height: "80px" }}
                      />
                      <label htmlFor="privateKeyId">Private key</label>
                    </div>
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertPrivateKey;
