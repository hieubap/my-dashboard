import CryptoService from "@src/CryptoService";
import { useWeb3Modal } from "@web3modal/react";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useWalletClient } from "wagmi";
import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import { Web3 } from "@src/web3";
import { ErrorRef, LoadingRef } from "@src/App";
function Register() {
  const { data } = useWalletClient();
  const { open } = useWeb3Modal();
  const [openModal, setOpenModal] = useState(false);
  const onRegister = async () => {
    const web3Provider = new ethers.providers.Web3Provider(data);
    // const network = await web3Provider.getNetwork();
    // const currentNetworkName = network?.name.toLowerCase();
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    console.log(address, "address??");
    const signMess = await signer.signMessage(address);
    console.log(signMess, "signMess?");

    let crypto = await CryptoService.init();
    const keyPair = await crypto.getKeyPair(signMess.slice(2));
    console.log(keyPair, "keyPair");
    const user = await Web3.contract.users(data.account.address);
    console.log(user, "user???");
    if (user.account == 0) {
      Web3.contract
        .registerUser(keyPair[1])
        .then((res) => {
          LoadingRef.current(true);
          return res.wait();
        })
        .then((res) => {
          console.log(res, "res_register");
          setOpenModal(true);
        })
        .catch((e) => {
          console.log(e, "error?");
        })
        .finally(() => {
          LoadingRef.current(false);
        });
    } else {
      ErrorRef.current(data.account.address + " has been register");
    }
  };
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">
            Register Account
          </h6>
          <h1 className="mb-5">
            Register{" "}
            <span className="text-primary text-uppercase">Account</span>
          </h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="row g-3">
              {/* <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.1s"
                  src={require("../img/medical-1.png")}
                  style={{ marginTop: "25%" }}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.3s"
                  src={require("../img/medical-2.png")}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-50 wow zoomIn"
                  data-wow-delay="0.5s"
                  src={require("../img/medical-3.png")}
                />
              </div> */}
              <div className="col-12 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.7s"
                  src={require("../img/medical-4.png")}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <div className="row g-3">
                {/* <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div> */}

                {/* <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{ height: "100px" }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div> */}
                {!data ? (
                  <div className="col-12 pt-5">
                    <button
                      className="btn btn-primary w-100 py-3"
                      //   type="submit"
                      onClick={() => {
                        open();
                      }}
                    >
                      Connect wallet
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <div
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          style={{ paddingTop: 5 }}
                          // readOnly
                        >
                          <div>Address</div>
                          {data
                            ? data?.account?.address
                            : "Address (connect wallet)"}
                        </div>
                        {/* <label htmlFor="email"></label> */}
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        //   type="submit"
                        onClick={onRegister}
                      >
                        Register
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal
        title="Register successfull"
        openSuccessModal={openModal}
        setOpenSuccessModal={setOpenModal}
      ></SuccessModal>
    </div>
  );
}

export default Register;
