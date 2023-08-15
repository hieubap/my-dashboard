import { ethers } from "ethers";
import { ABIShareContract } from "./ABI";
import { ADDRESS_CONTRACT } from "./config";

export const Web3 = {
  address: ADDRESS_CONTRACT,
  contract: null,
};

export const initWeb3 = async (wallet) => {
  const web3Provider = new ethers.providers.Web3Provider(wallet, "any");
  const signer = await web3Provider.getSigner();
  const contract = new ethers.Contract(Web3.address, ABIShareContract, signer);
  contract.connect(signer);
  Web3.contract = contract;
};
