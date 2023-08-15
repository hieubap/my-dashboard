import { Table } from "antd";
import React, { useEffect, useState } from "react";
import CardPatient from "@src/containers/CardPatient";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useWalletClient } from "wagmi";
import { Web3 } from "@src/web3";
import { getListByHash } from "@src/service";

function Granted() {
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
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

  const getMetadatas = async () => {
    console.log("init??");
    const requestReceived = await Web3.contract.getRequestSended();
    // setData(requestReceived);
    // console.log(metadatas, "metadatas");

    const mapRequest = {};
    getListByHash(
      requestReceived.map((i) => {
        mapRequest[i.metadataId] = i;
        return i.metadataId;
      })
    ).then((res) => {
      console.log(res, "res???");
      const newData = [...(res.data || [])]
        .map((i) => ({
          ...i,
          metadataId: i.hash,
          metadata: mapRequest[i.hash],
        }))
        .filter((i) => i.metadata.status == 2);
      console.log(newData, "newData");
      setData(newData || []);
    });
  };
  useEffect(() => {
    getMetadatas();
  }, []);
  const history = useHistory();
  const onClick = (item) => (e) => {
    console.log(item, "item?");
    history.push("/user/detail-accept/" + item.metadata.requestId);
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-2">
            Records <span className="text-primary text-uppercase">Granted</span>
          </h1>
        </div>
        <div className="row g-4">
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

export default Granted;
