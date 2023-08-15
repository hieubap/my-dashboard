import { drawAddress } from "@src/containers/utils";
import { getListByHash } from "@src/service";
import { Web3 } from "@src/web3";
import { Badge, Table } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

function Response() {
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  // const data = [
  //   {
  //     metadataId: 1,
  //     requestBy: "0x53bFEbAFEF3581EB3169b149D99F50a527f32cB1",
  //     timestamp: "01/01/2023",
  //     title: "Bệnh tuyến giáp",
  //     status: 1,
  //   },
  //   {
  //     metadataId: 2,
  //     requestBy: "0x53bFEbAFEF3581EB3169b149D99F50a527f32cB1",
  //     timestamp: "01/01/2023",
  //     title: "Các chỉ số thông thường",
  //     status: 2,
  //   },
  //   {
  //     metadataId: 3,
  //     requestBy: "0x53bFEbAFEF3581EB3169b149D99F50a527f32cB1",
  //     timestamp: "01/01/2023",
  //     title: "Bệnh đường ruột",
  //     status: 3,
  //   },
  // ];
  const getMetadatas = async () => {
    const requestReceived = await Web3.contract.getRequestSended();
    console.log("init??", requestReceived);
    // setData(requestReceived);
    // console.log(metadatas, "metadatas");

    getListByHash(requestReceived.map((i) => i.metadataId)).then((res) => {
      console.log(res, "res???");
      const newData = [...(requestReceived || [])].map((i) => ({
        ...res.data.find((j) => j.hash == i.metadataId),
        metadataId: i.metadataId,
        metadata: i,
      }));
      console.log(newData, "newData");
      setData(newData || []);
    });
  };
  useEffect(() => {
    getMetadatas();
  }, []);

  return (
    <div className="container-xxl py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          {/* <h6 className="section-title text-center text-primary text-uppercase">
            Medical record
          </h6> */}
          <div className="mb-5">
            <h1>
              List requested{" "}
              <span className="text-primary text-uppercase">made</span>
            </h1>
          </div>
        </div>
        <Table
          columns={[
            { title: "STT", render: (_, __, idx) => idx + 1 },
            {
              title: "Metadata ID",
              dataIndex: "metadataId",
              width: "20%",
              render: (item) => drawAddress(item),
            },
            { title: "Title", dataIndex: "name", width: "20%" },
            {
              title: "Owner",
              dataIndex: "metadata",
              render: (item) => (item.owner ? drawAddress(item.owner) : ""),
            },
            {
              title: "Timestamp",
              dataIndex: "metadata",
              width: "20%",
              render: (item) => {
                return moment(
                  new Date(ethers.utils.formatUnits(item?.timestamp, 0) * 1000)
                ).format("HH:mm:ss DD/MM/YYYY");
              },
            },
            {
              title: "Status",
              dataIndex: "metadata",
              render: ({ status } = {}) => (
                <Badge
                  count={
                    status == 1 ? "Waiting" : status == 2 ? "Accept" : "Reject"
                  }
                  color={
                    status == 1
                      ? "var(--bs-orange)"
                      : status == 2
                      ? "var(--bs-success)"
                      : "var(--bs-red)"
                  }
                ></Badge>
              ),
            },
          ]}
          dataSource={data}
        ></Table>
      </div>
    </div>
  );
}

export default Response;
