import React, { createRef, useState } from "react";
import Header from "./containers/header";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import DoctorManager from "./containers/user/management";
import PatientPatient from "./containers/user/patient";
import Register from "./containers/register";
import Home from "./containers/home";
import CreateRecord from "./containers/user/create";
import Granted from "./containers/user/granted";
import Request from "./containers/user/request";
import Response from "./containers/user/response";
import Detail from "./containers/user/detail";
import { LoadingCampaign } from "@assets/animation";
import SuccessModal from "@pages/trade/staking/Model/ResultModal/SuccessModal";
import ModalError from "@src/containers/ModalError";
import ConvertPrivateKey from "./containers/pub/convertPrivateKey";
import ListProduct from "./containers/pub/payment/list-product";
import ConfirmPay from "./containers/pub/payment/pay-confirm";
import BillInfo from "./containers/pub/payment/bill-info";
import Footer from "./containers/footer";

export const LoadingRef = createRef();
export const ConfirmRef = createRef();
export const ErrorRef = createRef();
function App() {
  const [dataConfirm, setDataConfirm] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [loading, setLoading] = useState(false);

  LoadingRef.current = setLoading;
  ConfirmRef.current = setDataConfirm;
  ErrorRef.current = setErrorData;
  return (
    <div style={{ height: "calc(100vh - 80px)", overflowY: "scroll" }}>
      <Header />
      {/* {loading && <LoadingCampaign />} */}
      <Switch>
        <Route path="/user/detail-accept/:requestId" component={Detail}></Route>
        <Route path="/user/detail/:id" component={Detail}></Route>
        <Route path="/user/create-record" component={CreateRecord}></Route>
        <Route
          path="/user/convert-private-key"
          component={ConvertPrivateKey}
        ></Route>
        <Route path="/market/bill/:code" component={BillInfo}></Route>
        <Route path="/market/list" component={ListProduct}></Route>
        <Route path="/market/confirm/:id" component={ConfirmPay}></Route>

        <Route path="/user/shared" component={DoctorManager}></Route>
        <Route path="/user/random" component={Request}></Route>
        <Route path="/user/response" component={Response}></Route>
        <Route path="/user/granted" component={Granted}></Route>
        <Route path="/user/patient/:id" component={PatientPatient}></Route>
        <Route path="/register" component={Register} exact={true}></Route>
        <Route path="/" component={Home}></Route>
      </Switch>
      <Footer />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            paddingTop: "5%",
            background: "rgba(0, 0, 0, 0.6)",
            height: "100vh",
            zIndex: 10,
          }}
        >
          <LoadingCampaign />
        </div>
      )}
      <SuccessModal
        title={dataConfirm?.title || "successfull"}
        openSuccessModal={dataConfirm}
        setOpenSuccessModal={setDataConfirm}
        content={dataConfirm?.content || "successfull"}
      ></SuccessModal>
      <ModalError
        visible={errorData}
        content={errorData}
        onCancel={() => {
          setErrorData(false);
        }}
        footerFlex="footer-between "
      />
    </div>
  );
}

export default App;
