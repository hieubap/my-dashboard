import { getListRandomWallet } from "@src/service";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "./style";

function Random() {
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
            <h2 style={{ alignSelf: "center" }}>
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
            {/* <div
              className="btn btn-primary rounded-0 px-md-2 d-lg-block"
              style={{ padding: 10 }}
              onClick={() => {}}
            >
              ADDRESS
            </div> */}
          </div>
        </div>
        <Table
          className="over-x-scroll"
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

export default Random;
