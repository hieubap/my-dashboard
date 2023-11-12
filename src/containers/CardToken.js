import React, { useState } from "react";
import { formatPrice } from "./utils";

function CardToken({
  value,
  balance,
  content,
  imageUrl,
  onClick,
  isView,
  ignore,
}) {
  return (
    <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
      <div className="room-item shadow rounded overflow-hidden">
        <div
          className="position-relative"
          style={{ display: "flex", background: "var(--bs-gray-dark)" }}
        >
          <img
            className="img-fluid"
            style={{ height: 150, margin: "auto" }}
            src={imageUrl ? imageUrl : require("./img/medical-1.png")}
            alt=""
          />
          <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
            {value} BNBT
          </small>
        </div>
        <div className="p-4 mt-2" style={{ background: "white" }}>
          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">{formatPrice(balance) || 0} VND</h5>
            {/* <div className="ps-2">
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
              <small className="fa fa-star text-primary" />
            </div> */}
          </div>
          {/* <div className="d-flex mb-3">
            <small className="border-end me-3 pe-3">
              <i className="fa fa-bed text-primary me-2" />3 Bed
            </small>
            <small className="border-end me-3 pe-3">
              <i className="fa fa-bath text-primary me-2" />2 Bath
            </small>
            <small>
              <i className="fa fa-wifi text-primary me-2" />
              Wifi
            </small>
          </div> */}
          <p className="text-body mb-3 text-3" style={{ height: 70 }}>
            {content ||
              "Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem."}
          </p>
          <div className="d-flex justify-content-between">
            <div
              className="btn btn-sm btn-primary rounded py-2 px-4"
              onClick={onClick}
            >
              Buy now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardToken;
