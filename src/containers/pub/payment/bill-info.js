import CardPatient from "@src/containers/CardPatient";
import { formatPrice } from "@src/containers/utils";
import { fetchNewBill, fetchProductId } from "@src/service";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function BillInfo() {
  const { code } = useParams();
  const [data, _setData] = useState({});
  const setData = (payload) => {
    _setData((pre) => ({ ...pre, ...payload }));
  };
  const history = useHistory();
  const onClick = () => {
    if (!data.address || !data.name) return;
    fetchNewBill({
      address: data.address,
      name: data.name,
      amount: data.value,
      balance: data.balance,
      code: code,
    })
      .then((res) => {
        history.replace("/market/confirm/" + res.data.id);
      })
      .catch((e) => {});
  };
  const getListProduct = async () => {
    fetchProductId(code)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e, "e?");
      });
  };
  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-2">
            <span className="text-primary text-uppercase">Token</span>
          </h1>
        </div>
        <div className="row g-3">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="room-item shadow rounded overflow-hidden">
              <div
                className="position-relative"
                style={{ display: "flex", background: "var(--bs-gray-dark)" }}
              >
                <img
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
                  src={
                    data.imageUrl
                      ? data.imageUrl
                      : require("../../img/medical-1.png")
                  }
                  alt=""
                />
                <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                  {data.value} BNBT
                </small>
              </div>
              <div className="p-4 mt-2" style={{ background: "white" }}>
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">{formatPrice(data.balance) || 0} VND</h5>
                </div>
                <p className="text-body mb-3 text-3" style={{ height: 70 }}>
                  {data.content ||
                    "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem."}
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                onChange={(e) => {
                  setData({ name: e.target.value });
                }}
              />
              <label htmlFor="name">Enter your name</label>
            </div>
            <div className="form-floating" style={{ marginTop: 24 }}>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                onChange={(e) => {
                  setData({ address: e.target.value });
                }}
              />
              <label htmlFor="name">
                Enter your address wallet to received token
              </label>
            </div>
            <h6 style={{ marginTop: 20 }}>
              <i>Vui lòng điền đúng địa chỉ ví nhận token.</i>
            </h6>
            <div className="d-flex justify-content-between">
              <div
                className="btn btn-sm btn-primary rounded py-2 px-4"
                onClick={onClick}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 28,
                }}
              >
                Payment
              </div>
            </div>
          </div>
          {/* {data.map((item, idx) => (
            <CardPatient key={idx} {...item} isView onClick={onClick(item)} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default BillInfo;
