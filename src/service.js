import { createHash } from "crypto-browserify";
import { API } from "./config";


export const getAll = (ids) => {
  return new Promise((resolve, reject) => {
    fetch(API + "/data/all")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getListByHash = (ids) => {
  return new Promise((resolve, reject) => {
    fetch(API + "/data?ids=" + ids)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};

export const getDetail = (hash) => {
  return new Promise((resolve, reject) => {
    fetch(API + "/data/" + hash)
      .then((res) => res.json())
      .then((e) => resolve(e.data))
      .catch(reject);
  });
};

export const saveData = (body) => {
  return new Promise((resolve, reject) => {
    fetch(API + "/data", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
