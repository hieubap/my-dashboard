/* global BigInt */
import "antd/dist/antd.min.css";
import "./containers/css/style.css";
import "./containers/css/bootstrap.min.css";
import "./index.scss";
import "mainam-react-native-string-utils";
// const BigInt = require("bignumber.js");

// Object.assign(global, {
//   BigInt: BigInt,
// });

if (typeof BigInt === "undefined") global.BigInt = require("bignumber.js");
