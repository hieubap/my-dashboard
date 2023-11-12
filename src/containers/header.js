import { useWeb3Modal } from "@web3modal/react";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useWalletClient } from "wagmi";
import { drawAddress } from "./utils";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { disconnect as disconnectWeb3 } from "@wagmi/core";
import { initWeb3 } from "@src/web3";

const routes = [
  {
    title: "Home",
    path: "/",
  },
  // {
  //   title: "Shared",
  //   path: "/user/shared",
  //   isAuth: true,
  // },
  // {
  //   title: "Granted",
  //   path: "/user/granted",
  //   isAuth: true,
  // },
  {
    title: "Random",
    path: "/user/random",
    isAuth: false,
  },
  {
    title: "Private Key",
    path: "/user/convert-private-key",
    isAuth: false,
  },
  {
    title: "Market",
    path: "/market/list",
    isAuth: false,
  },
];

function Header() {
  const { data: walletClient } = useWalletClient();
  const { open } = useWeb3Modal();
  const { updateData } = useDispatch().application;
  const history = useHistory();
  const connectWallet = () => {
    open();
    // const web3Provider = new ethers.providers.Web3Provider(walletClient);
    // web3Provider.getNetwork().then((network) => {});
  };
  useEffect(() => {
    // if (walletClient) {
    //   initWeb3(walletClient);
    //   updateData({ account: walletClient });
    // }
    // if (
    //   !walletClient &&
    //   routes
    //     .filter((i) => i.isAuth)
    //     .map((i) => i.path)
    //     .includes(window.location.pathname)
    // ) {
    //   window.location.href = "/";
    // }
  }, [walletClient]);
  console.log(walletClient, "walletClient?");
  return (
    <div className="container-fluid bg-dark px-0">
      <div className="row gx-0">
        <div className="col-3 bg-dark d-lg-block">
          <a
            href="index.html"
            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
          >
            <h1 className="m-0 text-primary">Hello</h1>
          </a>
        </div>
        <div className="col-9">
          <nav className="navbar navbar-expand bg-dark navbar-dark p-3 p-lg-0">
            {/* <a href="index.html" className="navbar-brand d-block d-lg-none">
              <h1 className="m-0 text-primary text-uppercase">Hotelier</h1>
            </a> */}
            {/* <button
              type="button"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button> */}
            <div
              className="navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div style={{ zIndex: 2 }} className="navbar-nav mr-auto py-0">
                {routes
                  .filter(
                    (i) =>
                      !i.isAuth ||
                      (walletClient && window.location.pathname != "/register")
                  )
                  .map((i, idx) => (
                    <Link
                      to={i.path}
                      className={
                        "nav-item nav-link " +
                        (window.location.pathname == i.path ? "active" : "")
                      }
                    >
                      {i.title}
                    </Link>
                  ))}
                {/* <Link to="collected" className="nav-item nav-link">
                  Collected
                </Link> */}
                {/* <a href="service.html" className="nav-item nav-link">
                  Services
                </a>
                <a href="room.html" className="nav-item nav-link">
                  Rooms
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu rounded-0 m-0">
                    <a href="booking.html" className="dropdown-item">
                      Booking
                    </a>
                    <a href="team.html" className="dropdown-item">
                      Our Team
                    </a>
                    <a href="testimonial.html" className="dropdown-item">
                      Testimonial
                    </a>
                  </div>
                </div>
                <a href="contact.html" className="nav-item nav-link">
                  Contact
                </a> */}
              </div>
              {!walletClient && window.location.pathname != "/register" && (
                <div
                  //   href="https://htmlcodex.com/hotel-html-template-pro"
                  style={{ zIndex: 2, marginLeft: "auto", marginRight: 10 }}
                  className="btn btn-primary rounded-0 d-lg-block"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register
                  {/* <i className="fa fa-arrow-right ms-3" /> */}
                </div>
              )}
              {/* {walletClient && (
                <div
                  //   href="https://htmlcodex.com/hotel-html-template-pro"
                  style={{ zIndex: 2, marginLeft: "auto", marginRight: 10 }}
                  className="btn btn-dark rounded-0 d-lg-block"
                  onClick={() => {
                    disconnectWeb3();
                    window.location.reload();
                  }}
                >
                  Disconnect
                </div>
              )} */}

              {/* {walletClient ? (
                <div
                  style={{
                    zIndex: 2,
                    background: "var(--primary)",
                    color: "white",
                  }}
                  className="rounded-0 py-4 px-md-5 d-lg-block"
                >
                  {drawAddress(walletClient.account?.address)}
                </div>
              ) : (
                <div
                  //   href="https://htmlcodex.com/hotel-html-template-pro"
                  style={{ zIndex: 2, marginRight: 30 }}
                  className="btn btn-primary rounded-0 px-md-2 d-lg-block"
                  onClick={connectWallet}
                >
                  Connect wallet
                </div>
              )} */}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
