import CryptoService from "@src/CryptoService";
import { getDetail } from "@src/service";
import { Web3 } from "@src/web3";
import { Checkbox, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useWalletClient } from "wagmi";
import { listCDHA, listDichVu, listKetLuanKham } from "../create";

function Detail() {
  const { id, requestId } = useParams();
  console.log(id, requestId, "id,requestId");
  const { data: walletClient } = useWalletClient();
  const [data, setValue] = useState({});
  const [record, setRecord] = useState({});

  const init = async () => {
    let metadataId = id;
    let requestData;
    if (!metadataId) {
      requestData = await Web3.contract.requests(requestId);
      metadataId = requestData.metadataId;
    }

    console.log(metadataId, "metadataId");

    const metadata = await Web3.contract.metadatas(metadataId);
    const record = await getDetail(metadata.metadataId);

    setRecord(record);

    walletClient
      .signMessage({ message: walletClient.account.address })
      .then((res) => {
        const [privateKey] = CryptoService.instance.getKeyPair(res.slice(2));
        console.log({ requestData, metadata }, "metadata");
        const sharedKey = CryptoService.instance.computeSharedKey(
          privateKey,
          requestData?.publicKey || metadata.publicKey
        );
        console.log(metadata.encryptKey, sharedKey, "DATA", {
          metadata,
          requestData,
        });
        const plainKeyE = CryptoService.instance.encode(
          requestData?.encryptKey || metadata.keyEncrypt,
          sharedKey
        );
        const plainData = CryptoService.instance.decrypt(
          Uint8Array.from(record.value?.match(/.{1,3}/g).map((i) => Number(i))),
          plainKeyE
        );

        setValue(JSON.parse(plainData));
      });
  };
  useEffect(() => {
    if (id || requestId) {
      setTimeout(() => {
        init();
      }, 1000);
    }
  }, [!!walletClient]);
  return (
    <div className="container-xxl py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          {/* <h6 className="section-title text-center text-primary text-uppercase">
        Medical record
      </h6> */}
          <h1 className="section-title text-center text-primary text-uppercase">
            {record?.name}
            {/* <span className="text-primary text-uppercase">Record</span> */}
          </h1>
          <div className="mb-5">
            <h6 class="text-center text-uppercase">{record?.content}</h6>
          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="row g-3">
              <img
                class="img-fluid rounded w-75 wow zoomIn"
                style={{ margin: "0 auto" }}
                data-wow-delay="0.3s"
                src={require("../../img/medical-1.png")}
              />
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
                          value={data.thongTin?.gioiTinh}
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
                          value={data.thongTin?.tuoi}
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
                      <Checkbox checked={data.dsDichVu?.[idx]} />
                    </div>
                  ))}
                </Collapse.Panel>
                <Collapse.Panel header={<h6>Kết quả khám</h6>} key={"3"}>
                  <div className="row g-3">
                    {listKetLuanKham.map((i, idx) => (
                      <div className="col-12">
                        <div className="form-floating">
                          <p
                            className="form-control"
                            placeholder="Special Request"
                            id="message"
                            style={{ height: "auto" }}
                            // value=
                          >
                            {data.ketQua?.[idx] || "_"}
                          </p>
                          <label htmlFor="message">{i}</label>
                        </div>
                      </div>
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
                              <p
                                className="form-control"
                                placeholder="Special Request"
                                id="message"
                                style={{ height: "auto" }}
                                // value=
                              >
                                {data.cdha?.[idx]?.moTa || "_"}
                              </p>
                              <label htmlFor="message">Mô tả</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-floating">
                              <p
                                className="form-control"
                                placeholder="Special Request"
                                id="message"
                                // style={{ height: "100px" }}
                              >
                                {data.cdha?.[idx]?.ketLuan || "_"}
                              </p>
                              <label htmlFor="message">Kết luận</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
