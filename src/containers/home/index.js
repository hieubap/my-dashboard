import React, { useEffect, useMemo, useState } from "react";
import CardPatient from "../CardPatient";
// import SuccessModal from "@containers/SuccessModal";
import { useWalletClient } from "wagmi";
import { getAll } from "@src/service";
import { useWeb3Modal } from "@web3modal/react";
import { Web3 } from "@src/web3";
import { LoadingCampaign } from "@assets/animation";
import { ConfirmRef, ErrorRef, LoadingRef } from "@src/App";
import SuccessModal from "../SuccessModal";

function Home() {
  const { data: dataWallet } = useWalletClient();
  const { open } = useWeb3Modal();
  const [selectData, setSelectData] = useState(false);
  const [data, setData] = useState([]);
  const [requested, setRequested] = useState([]);
  const [metadatas, setMetadatas] = useState([]);

  console.log(requested);

  const onClick = (item) => () => {
    if (dataWallet) {
      setSelectData(item);
    } else {
      open();
    }
  };
  const onSubmit = () => {
    console.log("Submit");
    Web3.contract.users(dataWallet.account.address).then((res) => {
      console.log(res, "res???");
      if (res.publicKey) {
        Web3.contract
          .requestCId(selectData.hash, res.publicKey)
          .then((res) => {
            LoadingRef.current(true);
            return res.wait();
          })
          .then(() => {
            ConfirmRef.current({
              title: "Successfull",
              content: "Request successfull",
            });
            Web3.contract.getRequestSended().then((res) => {
              setRequested(res);
            });
          })
          .finally(() => {
            LoadingRef.current(false);
          });
      } else {
        ErrorRef.current(
          "You have not registered an account, please disconnect and register"
        );
      }
    });

    setSelectData(false);
  };
  console.log(requested, "requetsd");
  useEffect(() => {
    if (dataWallet && Web3.contract) {
      Web3.contract.getRequestSended().then((res) => {
        setRequested(res);
      });
      Web3.contract.metadataByOwner().then((ownerMetadata) => {
        setMetadatas(ownerMetadata);
      });
    }
  }, [!!dataWallet]);
  useEffect(() => {
    getAll().then((res) => {
      setData(res.data);
    });
  }, []);

  const dataCustom = useMemo(() => {
    const mapReq = {};
    for (let i = 0; i < requested.length; i++) {
      mapReq[requested[i].metadataId] = requested[i];
    }
    for (let i = 0; i < metadatas.length; i++) {
      mapReq[metadatas[i].metadataId] = metadatas[i];
    }
    console.log({ data, mapReq }, "mapReq");

    return data.filter((i) => {
      console.log(i.hash, !mapReq[i.hash]);
      return (
        !mapReq[i.hash] ||
        (mapReq[i.hash]?.status && mapReq[i.hash]?.status == 3)
      );
    });
  }, [data, requested, metadatas]);
  return (
    <div className="container-xxl bg-white p-0">
      {/* Header End */}
      {/* Carousel Start */}
      <div className="container-fluid p-0 mb-5"></div>
      <div
        className="container-fluid booking pb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container"></div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Data marketplace
            </h6>
            <h1 className="mb-5">
              Share, Connect{" "}
              <span className="text-primary text-uppercase">securely</span>
            </h1>
          </div>
          <div className="row g-4">
            {dataCustom && dataCustom.length ? (
              dataCustom.map((item, idx) => (
                <CardPatient
                  {...item}
                  onClick={onClick(item)}
                  ignore={!dataWallet}
                />
              ))
            ) : (
              <div style={{ textAlign: "center" }}>No data</div>
            )}
          </div>
        </div>
      </div>

      {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up" />
      </a> */}
      <SuccessModal
        title="Request data"
        openSuccessModal={selectData}
        setOpenSuccessModal={setSelectData}
        handleConfirm={onSubmit}
        showCorrect={false}
        buttonName={"Submit"}
        // content={selectData.name}
        container={() => (
          <div className="info-container" style={{ marginTop: 0 }}>
            <div>Are you sure to submit a request ?</div>
            <div
              className="container"
              style={{
                marginTop: 0,
                paddingTop: 5,
                paddingBottom: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {selectData.name}
            </div>
          </div>
        )}
      ></SuccessModal>
    </div>
  );
}

export default Home;
