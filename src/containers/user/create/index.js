import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import { LoadingRef } from "@src/App";
import CryptoService from "@src/CryptoService";
import { saveData } from "@src/service";
import { Web3 } from "@src/web3";
import { Checkbox, Collapse } from "antd";
import { createHash } from "crypto-browserify";
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
function CreateRecord() {
  const { data: walletClient } = useWalletClient();
  const [openModal, setOpenModal] = useState(false);
  const data = useRef({
    thongTin: {},
    dsDichVu: [],
    ketQua: [],
    cdha: [],
  }).current;
  const history = useHistory();

  return (
    <div className="container-xxl py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          {/* <h6 className="section-title text-center text-primary text-uppercase">
            Medical record
          </h6> */}
          <div className="mb-5">
            <h1>
              Create new{" "}
              <span className="text-primary text-uppercase">Record</span>
            </h1>
            <div
              className="btn btn-sm btn-dark rounded py-2 px-4"
              onClick={() => {
                const body = {
                  ...data,
                  thongTin: data.thongTin,
                  dsDichVu: data.dsDichVu.map((i) => i || false),
                  ketQua: data.ketQua.map((i) => i || ""),
                  cdha: data.cdha.map((i) => i || {}),
                };
                walletClient
                  .signMessage({ message: walletClient.account.address })
                  .then((res) => {
                    // mã hóa data
                    const keyE = CryptoService.instance.generateSymmetricKey();
                    const plainData = JSON.stringify(body);
                    const cipherData = [
                      ...CryptoService.instance.encrypt(plainData, keyE),
                    ]
                      .map((i) => (i + "").padStart(3, "0"))
                      .join("");
                    const hashedValue = createHash("sha256")
                      .update(plainData)
                      .digest("hex");

                    // mã hóa key
                    const [, publicKeyA] = CryptoService.instance.getKeyPair(
                      res.slice(2)
                    );
                    const [privateKeyS, publicKeyS] =
                      CryptoService.instance.generateKeypair(); // random keypair
                    const sharedKey = CryptoService.instance.computeSharedKey(
                      privateKeyS,
                      publicKeyA
                    );
                    const cipherKeyE = CryptoService.instance.encode(
                      keyE,
                      sharedKey
                    );

                    // gọi contract
                    Web3.contract
                      .migrateData(hashedValue, cipherKeyE, publicKeyS)
                      .then((res) => {
                        LoadingRef.current(true);
                        return res.wait();
                      })
                      .then((res) => {
                        saveData({
                          value: cipherData,
                          hash: hashedValue,
                          name: data.ten,
                          content: data.moTa,
                        })
                          .then((res) => {
                            // console.log(res, "res???");
                            if (res && res.data) {
                              setOpenModal(true);
                            }
                          })
                          .catch((e) => {
                            console.log(e, "error???");
                          })
                          .finally(() => {
                            LoadingRef.current(false);
                          });
                      })
                      .catch((e) => {
                        console.log(e, "error?");
                        LoadingRef.current(false);
                      });
                  });
              }}
            >
              Submit
            </div>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    onChange={(e) => {
                      data.ten = e.target.value;
                    }}
                  />
                  <label htmlFor="name">Tên</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                    onChange={(e) => {
                      data.moTa = e.target.value;
                    }}
                  />
                  <label htmlFor="email">Mô tả</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <Collapse defaultActiveKey={"1"}>
                <Collapse.Panel header={<h6>Thông tin</h6>} key={"7"}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          class="form-select"
                          onChange={(e) => {
                            const thongTin = {
                              ...data.thongTin,
                              gioiTinh: e.target.value,
                            };
                            data.thongTin = thongTin;
                          }}
                        >
                          <option value="1">Nam</option>
                          <option value="2">Nữ</option>
                        </select>
                        <label htmlFor="email">Giới tính</label>
                      </div>
                      {/* <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Giới tính</label> */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          onChange={(e) => {
                            const thongTin = {
                              ...data.thongTin,
                              tuoi: e.target.value,
                            };
                            data.thongTin = thongTin;
                          }}
                        />
                        <label htmlFor="email">Tuổi</label>
                      </div>
                    </div>
                  </div>
                </Collapse.Panel>
                <Collapse.Panel header={<h6>Dịch vụ</h6>} key={"2"}>
                  {listDichVu.map((i, idx) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "15px 20px",
                        borderBottom: "1px solid #c0c0c0",
                      }}
                    >
                      <label>{i}</label>
                      <Checkbox
                        onChange={(e) => {
                          const newDv = [...data.dsDichVu];
                          newDv[idx] = e.target.checked;
                          data.dsDichVu = newDv;
                        }}
                      />
                    </div>
                  ))}
                </Collapse.Panel>
                <Collapse.Panel header={<h6>Kết quả khám</h6>} key={"3"}>
                  <div className="row g-3">
                    {listKetLuanKham.map((i, idx) => (
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Special Request"
                            id="message"
                            style={{ height: "100px" }}
                            defaultValue={""}
                            onChange={(e) => {
                              const ketQua = [...data.ketQua];
                              ketQua[idx] = e.target.value;
                              data.ketQua = ketQua;
                            }}
                          />
                          <label htmlFor="message">{i}</label>
                        </div>
                      </div>
                      // <div
                      //   style={{
                      //     display: "flex",
                      //     justifyContent: "space-between",
                      //     margin: "10px 20px",
                      //     borderBottom: "1px solid",
                      //   }}
                      // >

                      // </div>
                    ))}
                  </div>
                </Collapse.Panel>
                <Collapse.Panel header={<h6>Chuẩn đoán hình ảnh</h6>} key={"4"}>
                  {listCDHA.map((i, idx) => (
                    <div
                      style={{
                        // display: "flex",
                        // justifyContent: "space-between",
                        margin: "10px 20px",
                        // borderBottom: "1px solid",
                      }}
                    >
                      <header
                        // style={{ textDecorationStyle: "dotted" }}
                        className="mt-3"
                      >
                        {i}
                      </header>
                      {/* <div>{i}</div> */}
                      <div style={{ border: "0px solid" }}>
                        <div className="row g-3">
                          <div className="col-12">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Special Request"
                                id="message"
                                style={{ height: "100px" }}
                                defaultValue={""}
                                onChange={(e) => {
                                  const cdha = [...data.cdha];
                                  cdha[idx] = {
                                    ...cdha[idx],
                                    moTa: e.target?.value,
                                  };
                                  data.cdha = cdha;
                                }}
                              />
                              <label htmlFor="message">Mô tả</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-floating">
                              <textarea
                                className="form-control"
                                placeholder="Special Request"
                                id="message"
                                style={{ height: "100px" }}
                                defaultValue={""}
                                onChange={(e) => {
                                  const cdha = [...data.cdha];
                                  cdha[idx] = {
                                    ...cdha[idx],
                                    ketLuan: e.target?.value,
                                  };
                                  data.cdha = cdha;
                                }}
                              />
                              <label htmlFor="message">Kết luận</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Collapse.Panel>
              </Collapse>
              {/* <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date3"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        id="checkin"
                        placeholder="Check In"
                        data-target="#date3"
                        data-toggle="datetimepicker"
                      />
                      <label htmlFor="checkin">Check In</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date4"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        id="checkout"
                        placeholder="Check Out"
                        data-target="#date4"
                        data-toggle="datetimepicker"
                      />
                      <label htmlFor="checkout">Check Out</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select1">
                        {listDichVu.map((i, idx) => (
                          <option value={idx}>{i}</option>
                        ))}
                      </select>
                      <label htmlFor="select1">Danh sách dịch vụ</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select2">
                        <option value={1}>Child 1</option>
                        <option value={2}>Child 2</option>
                        <option value={3}>Child 3</option>
                      </select>
                      <label htmlFor="select2">Select Child</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select className="form-select" id="select3">
                        <option value={1}>Room 1</option>
                        <option value={2}>Room 2</option>
                        <option value={3}>Room 3</option>
                      </select>
                      <label htmlFor="select3">Select A Room</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{ height: "100px" }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        title="Migrate successfull"
        openSuccessModal={openModal}
        setOpenSuccessModal={setOpenModal}
        content="You migrate successfull"
        handleConfirm={() => {
          history.back();
        }}
      ></SuccessModal>
    </div>
  );
}

export default CreateRecord;
