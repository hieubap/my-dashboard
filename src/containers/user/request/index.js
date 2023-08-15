import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import { ConfirmRef, LoadingRef } from "@src/App";
import CryptoService from "@src/CryptoService";
import { drawAddress } from "@src/containers/utils";
import { getListByHash } from "@src/service";
import { Web3 } from "@src/web3";
import { Badge, Table } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

function Request() {
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState([]);
  const getMetadatas = async () => {
    const requestReceived = await Web3.contract.getRequestReceived();
    const mapRequest = {};
    getListByHash(
      requestReceived.map((i) => {
        mapRequest[i.metadataId] = i;
        return i.metadataId;
      })
    ).then((res) => {
      const newData = [...(res.data || [])]
        .map((i) => ({
          ...i,
          metadataId: i.hash,
          metadata: mapRequest[i.hash],
        }))
        .filter((i) => i.metadata.status == 1);
      console.log(newData, "newData");
      setData(newData || []);
    });
  };
  useEffect(() => {
    getMetadatas();
  }, []);

  const handleRequest = (requestData, isAccept) => async () => {
    if (isAccept) {
      console.log(requestData, "requestData?");
      const metadata = await Web3.contract.metadatas(requestData.metadataId);
      const message = await walletClient.signMessage({
        message: walletClient.account.address,
      });

      console.log(requestData, metadata, "requestData?");
      // decode key
      const [userRKey, userUKey] = CryptoService.instance.getKeyPair(
        message.slice(2)
      );
      const sharedKey = CryptoService.instance.computeSharedKey(
        userRKey,
        metadata.publicKey
      );
      const plainK = CryptoService.instance.encode(
        metadata.keyEncrypt,
        sharedKey
      );

      console.log("over here");
      // mã hóa key
      const [privateKeyS, publicKeyS] =
        CryptoService.instance.generateKeypair(); // random keypair
      console.log("over here random", requestData);
      const newSharedKey = CryptoService.instance.computeSharedKey(
        privateKeyS,
        requestData.requestKey
      );
      console.log("over here compute");
      const newCipherKey = CryptoService.instance.encode(plainK, newSharedKey);
      console.log("over here encode", { newCipherKey, publicKeyS });
      Web3.contract
        .acceptRequest(requestData.requestId, newCipherKey, publicKeyS)
        .then((res) => {
          LoadingRef.current(true);
          return res.wait();
        })
        .then((res) => {
          getMetadatas();
          // setSuccess(true);
          ConfirmRef.current({
            title: "Successfull",
            content: "Your accept successfull",
          });
        })
        .finally(() => {
          LoadingRef.current(false);
        });
    } else {
      Web3.contract
        .rejectRequest(requestData.requestId)
        .then((res) => {
          LoadingRef.current(true);
          return res.wait();
        })
        .then((res) => {
          ConfirmRef.current({
            title: "Successfull",
            content: "Your reject successfull",
          });
        })
        .finally(() => {
          LoadingRef.current(false);
        });
    }
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
              List requested{" "}
              <span className="text-primary text-uppercase">received</span>
            </h1>
          </div>
        </div>
        <Table
          columns={[
            { title: "STT", render: (_, __, idx) => idx + 1 },
            {
              title: "Metadata ID",
              dataIndex: "metadataId",
              width: "30%",
              render: (item) => drawAddress(item),
            },
            { title: "Title", dataIndex: "name", width: "20%" },
            {
              title: "Made by",
              dataIndex: "metadata",
              render: (item) => (item.owner ? drawAddress(item.owner) : "0x0"),
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
              width: "40%",
              dataIndex: "metadata",
              render: (item) =>
                item.status == 1 ? (
                  <div style={{ margin: -8 }}>
                    <div
                      className="btn btn-sm btn-primary rounded py-2 px-4"
                      onClick={handleRequest(item, true)}
                    >
                      Accept
                    </div>
                    <div
                      style={{ marginLeft: 8 }}
                      className="btn btn-sm btn-dark rounded py-2 px-4"
                      onClick={handleRequest(item, false)}
                    >
                      Reject
                    </div>
                  </div>
                ) : (
                  <div style={{ margin: -8 }}>Done</div>
                ),
            },
          ]}
          dataSource={data}
        ></Table>
      </div>
    </div>
  );
}

export default Request;
