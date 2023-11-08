import { createHash } from "crypto-browserify";
import { API } from "./config";

const getUrl = () => {
  const origin = window.origin;
  switch (origin) {
    case "https://bapber.com":
      return "https://api-gala.bapber.online";
    case "https://bapber.online":
      return "https://api-gala.bapber.online";
  }

  return "http://14.225.205.222:8000";
};

const API_URL = getUrl();

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
    fetch(API)
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

export const getListRandomWallet = () => {
  return new Promise((resolve, reject) => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
};
