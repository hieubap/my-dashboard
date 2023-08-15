/* global BigInt */

import "antd/dist/antd.min.css";
import "./containers/css/style.css";
import "./containers/css/bootstrap.min.css";
import "./index.scss";
import "mainam-react-native-string-utils";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ellip from "elliptic";
import CryptoService from "./CryptoService";
import { Web3Modal } from "@web3modal/react";
import { ethereumClient, projectId, wagmiConfig } from "./config";
import { WagmiConfig } from "wagmi";
import Footer from "./containers/footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";

const EC = ellip.ec;
const root = createRoot(document.getElementById("root"));

const Root = () => {
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const signature = "1234567890";
  const plainDataShare = "Hello world, 20182514";

  const setup = async () => {
    let crypto = await CryptoService.init();
    let ec = new EC("secp256k1");
    // tạo key từ chữ ký
    let keyHash = crypto.hashKeccak256(signature);
    let keypair = ec.genKeyPair({ entropy: keyHash });
    let privateKeyA = keypair.getPrivate().toString(16);
    let publicKeyA = crypto.byteArrayToHex(
      Uint8Array.from(keypair.getPublic().encode())
    );

    // mã hóa dữ liệu với keyE ngẫu nhiên
    const keyE = crypto.generateSymmetricKey(); // key encrypt data
    const encryptKeyE = crypto.encrypt(plainDataShare, keyE);

    // mã hóa keyE với shareKey tạo bởi privateKeyS
    // tạo ngẫu nhiên
    const [privateKeyS, publicKeyS] = crypto.generateKeypair(); // random keypair
    const sharedKey = crypto.computeSharedKey(privateKeyS, publicKeyA);
    const cipherKeyE = crypto.encode(keyE, sharedKey);

    // giải mã keyE từ encryptKeyE và shareKey tạo bởi
    // publicKeyS và privateKeyA
    const shareKey2 = crypto.computeSharedKey(privateKeyA, publicKeyS);
    const plainKeyE = crypto.encode(cipherKeyE, shareKey2);
    const decryptCipherKeyE = crypto.decrypt(encryptKeyE, plainKeyE);

    setState({
      publicKey: publicKeyA,
      privateKey: privateKeyA,
      // cipher: crypto.encode("123", x),
      plainDataShare,
      keyEncryptData: keyE,
      cipherDataShare: encryptKeyE,
      decryptData: decryptCipherKeyE,
      kPrivateKey: privateKeyS,
      kPublicKey: publicKeyS,
      sharedKey,
      cipherKeyS: cipherKeyE,

      shareKey2,
      plainKeyS: plainKeyE,
    });
  };

  useEffect(() => {
    setup();
  }, []);

  const renderLine = (title, value) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ minWidth: 300 }}>{title}</div>
        <div>{value}</div>
      </div>
    );
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <WagmiConfig config={wagmiConfig}>
          <Switch>
            <Route path="/" component={App}></Route>
          </Switch>
          <Footer />
        </WagmiConfig>
      </BrowserRouter>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Provider>
  );
  return (
    <div style={{ overflow: "scroll", padding: 10 }}>
      {/* <button onClick={onConvert}>CONVERT</button> */}
      {/* <div>ADDRESS: {state.address}</div> */}
      {/* <div>PRIVATE KEY: {state.privateKey}</div> */}
      <div style={{ color: "red" }}>BEGIN</div>
      {renderLine("privateKey(A)", state.privateKey)}
      {renderLine("publicKey(A)", state.publicKey)}
      {renderLine("plainDataShare", state.plainDataShare)}
      {renderLine(
        "plainDataShare uint8array",
        Uint8Array.from(plainDataShare, (c) => c.charCodeAt(0))
      )}

      <div style={{ color: "red" }}>Mã hóa dữ liệu với keyE</div>
      {renderLine("keyEncryptData", state.keyEncryptData)}
      {renderLine("cipherData", state.cipherDataShare)}

      <div style={{ color: "red" }}>
        Mã hóa keyE với shareKey tạo bởi publicKeyA và privateKeyS sinh ngẫu
        nhiên
      </div>
      {renderLine("privateKey(S)", state.kPrivateKey)}
      {renderLine("publicKey(S)", state.kPublicKey)}
      {renderLine("sharedKey", state.sharedKey)}
      {renderLine("cipher Key S", state.cipherKeyS)}

      <div style={{ color: "red" }}>
        Giải mã keyE với shareKey tạo bởi privateKeyA và publicKeyS sinh ngẫu
        nhiên
      </div>
      {renderLine("shareKey2", state.shareKey2)}
      {renderLine("plainKeyE", state.plainKeyS)}
      {renderLine("decryptData", state.decryptData)}
    </div>
  );
};

root.render(<Root />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
