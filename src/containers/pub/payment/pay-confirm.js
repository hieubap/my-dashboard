import CardPatient from "@src/containers/CardPatient";
import { fetchBillById, fetchProductId, fetchQrBank } from "@src/service";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const bankInfo = {
  accountNo: 4400588734,
  accountName: "NGO QUANG HIEU",
  acqId: 970418,
  amount: 5000,
  addInfo: "thanh toan truc tuyen",
  format: "text",
  template: "qr_only",
  bankName: "BIDV",
};

function ConfirmPay() {
  const { id } = useParams();
  const [data, _setData] = useState({
    accountNo: bankInfo.accountNo,
    accountName: bankInfo.accountName,
    acqId: bankInfo.acqId,
    amount: 5000,
    // addInfo: "BNB01",
    status: "DONE",
  });
  const setData = (payload) => {
    _setData((pre) => ({ ...pre, ...payload }));
  };
  const onClick = () => () => {};
  const getQrCode = async () => {
    fetchQrBank({
      accountNo: bankInfo.accountNo,
      accountName: bankInfo.accountName,
      acqId: bankInfo.acqId,
      //   amount: 5000,
      addInfo: data.addInfo,
      format: "text",
      template: "qr_only",
    })
      .then((res) => {
        console.log(res, "res???");
        setData({ qr: res.data });
      })
      .catch((e) => {
        console.log(e, "e?");
      });
  };
  const interval = useRef();
  const refreshData = (callback) => {
    fetchBillById(id).then((res) => {
      setData(res.data);
      if (res.data.status == "DONE") {
        clearInterval(interval.current);
      }
      if (callback) {
        callback();
      }
    });
  };
  useEffect(() => {
    refreshData(getQrCode);
    interval.current = setInterval(() => {
      refreshData();
    }, 5000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-2">
            Transfer <span className="text-primary text-uppercase">Bank</span>
          </h1>
        </div>
        <div className="row g-3">
          <div className="col-1"></div>
          <div className="col-5" style={{ display: "flex" }}>
            <div
              style={{
                marginLeft: "auto",
                padding: 16,
                background: "white",
              }}
            >
              <img
                src={data.qr?.qrDataURL || require("../../img/qr-transfer.png")}
                style={{ width: "20vw" }}
              />
              <div style={{ marginTop: 8, width: "20vw" }}>
                <div>Trạng thái</div>
                {data.status == "DONE" ? (
                  <h6 style={{ color: "green" }}>Thành công</h6>
                ) : data.status == "BANKED" ? (
                  <h6 style={{ color: "#dc9b3e" }}>Đã nhận tiền</h6>
                ) : (
                  <h6 style={{ color: "blue" }}>Chờ thanh toán</h6>
                )}

                <div style={{ marginTop: 20 }}>
                  {data.status == "DONE" ? (
                    <i>
                      Token đã được chuyển thành công. Bạn có thể kiểm tra giao
                      dịch
                    </i>
                  ) : data.status == "BANKED" ? (
                    <i>
                      Chuyển khoản thành công. Token đang được chuyển tới ví của
                      bạn. Vui lòng chờ đợi trong giây lát
                    </i>
                  ) : (
                    <i>Hệ thống đang chờ bạn chuyển khoản</i>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 d-lg-block">
            <div style={{ padding: 16, background: "white" }}>
              <div>Ngân hàng</div>
              <h5>{bankInfo.bankName}</h5>
              <div>Chủ tài khoản</div>
              <h5>{bankInfo.accountName}</h5>
              <div>Số tài khoản</div>
              <h5>{bankInfo.accountNo}</h5>
              <div>Số tiền</div>
              <h5>{data.balance}</h5>
              <div>Nội dung giao dịch</div>
              <h5>{data.addInfo}</h5>

              <div style={{ marginTop: 28 }}>
                {data.status == "DONE" ? (
                  <a
                    href={"https://testnet.bscscan.com/tx/" + data.txHash}
                    target="blank"
                  >
                    Xem lịch sử giao dịch
                  </a>
                ) : (
                  <i>Vui lòng điền đúng nội dung giao dịch.</i>
                )}
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

export default ConfirmPay;
