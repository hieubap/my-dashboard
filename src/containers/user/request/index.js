import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import { ConfirmRef, LoadingRef } from "@src/App";
import CryptoService from "@src/CryptoService";
import { drawAddress } from "@src/containers/utils";
import { getListByHash, getListRandomWallet } from "@src/service";
import { Web3 } from "@src/web3";
import { Badge, Button, Table } from "antd";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { Container } from "./style";

function Request() {
  const { data: walletClient } = useWalletClient();
  const [data, setData] = useState([]);
  const [dataDefault, setDataDefault] = useState([]);
  const getMetadatas = async () => {
    getListRandomWallet()
      .then((res) => {
        const listWallet = (res || []).sort((a, b) => b.balance - a.balance);
        setData(listWallet);
        setDataDefault(listWallet);
      })
      .catch((e) => {
        console.log(e, "e?");
      });
  };
  useEffect(() => {
    getMetadatas();
  }, []);

  const handleRequest = (requestData, isAccept) => async () => {};

  return (
    <Container className="container-xxl py-3">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          {/* <h6 className="section-title text-center text-primary text-uppercase">
            Medical record
          </h6> */}
          <div className="mb-2" style={{ display: "flex" }}>
            <h2>
              List Wallet ({dataDefault.length})
              {/* <span className="text-primary text-uppercase">received</span> */}
            </h2>
            <div className="input-search" style={{ marginLeft: "auto" }}>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="search-address"
                  placeholder="Your Name"
                  onChange={(e) => {
                    if (e.target?.value) {
                      setData(
                        [...dataDefault].filter(
                          (i) =>
                            (i.address + "")
                              .toLowerCase()
                              .indexOf(e.target.value?.toLowerCase()) > -1
                        )
                      );
                    } else {
                      setData(dataDefault);
                    }
                  }}
                />
                <label htmlFor="search-address">Your Name</label>
              </div>
            </div>
            <div
              className="btn btn-primary rounded-0 px-md-2 d-lg-block"
              style={{ padding: 10 }}
              onClick={() => {
                
              }}
            >
              ADDRESS
            </div>
          </div>
        </div>
        <Table
          columns={[
            { title: "STT", render: (_, __, idx) => idx + 1 },
            {
              title: "Balance",
              dataIndex: "balance",
              width: "15%",
            },
            {
              title: "Address",
              dataIndex: "address",
            },
            {
              title: "Private key",
              dataIndex: "privateKey",
            },
          ]}
          dataSource={data}
        ></Table>
      </div>
    </Container>
  );
}

export default Request;
