import CardPatient from "@src/containers/CardPatient";
import { getListByHash } from "@src/service";
import { Web3 } from "@src/web3";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function DoctorManager() {
  const [data, setData] = useState([]);
  // const data = [
  //   {
  //     name: "Khám sức khỏe tổng quát",
  //     content: "Sức khỏe tốt",
  //   },
  //   {
  //     name: "Bệnh dạ dày",
  //     content: "Các triệu chứng về bệnh dạ dày",
  //   },
  // ];
  const history = useHistory();
  const onClick = (item) => (e) => {
    console.log(item, "item?");
    history.push("/user/detail/" + item.metadataId);
  };
  const getMetadatas = async () => {
    console.log("init??");
    const metadatas = await Web3.contract.metadataByOwner();
    console.log(metadatas, "metadatas");
    const mapId = {};
    getListByHash(
      metadatas.map((i) => {
        mapId[i.hash] = i.metadataId;
        return i.metadataId;
      })
    ).then((res) => {
      console.log(res, "res???");
      const newData = [...(res.data||[])].map((i) => ({
        ...i,
        metadataId: mapId[res.hash],
      }));
      setData(newData || []);
    });
  };
  useEffect(() => {
    getMetadatas();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">
            Shared
          </h6>
          <h1 className="mb-2">
            List of{" "}
            <span className="text-primary text-uppercase">Medical record</span>
          </h1>
          <Link
            // style={{ marginLeft: 60 }}
            className="btn btn-sm btn-dark rounded py-2 px-4"
            to="/user/create-record"
          >
            New Share
          </Link>
        </div>
        <div className="row g-4">
          {/* {[1, 2, 3, 4, 5].map((item) => (
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
              style={{ cursor: "pointer" }}
              onClick={onClick(item)}
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src={require("../../img/team-2.jpg")}
                    alt=""
                  />
                  <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                    <a className="btn btn-square btn-primary mx-1" href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a className="btn btn-square btn-primary mx-1" href>
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                </div>
                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">Full Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
          ))} */}
          <div className="row g-4">
            {data.map((item, idx) => (
              <CardPatient key={idx} {...item} isView onClick={onClick(item)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorManager;
