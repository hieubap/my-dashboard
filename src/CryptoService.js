// import * as bigInt from "big-integer";
import sodium from "libsodium-wrappers";
import { keccak256 } from "ethers/lib/utils.js";
import ellip from "elliptic";
import * as secp from "@noble/secp256k1";
import { hmac } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";
import { ethers } from "ethers";
import BigInt from "bignumber.js";

const EC = ellip.ec;
class CryptoService {
  static instance;
  ec;
  constructor() {
    // this.secp256k1 = new EC('secp256k1');
    this.ec = new EC("secp256k1");
  }

  static async init() {
    this.instance = new CryptoService();
    await sodium.ready;
    return this.instance;
  }
  getKeyPair(signature) {
    // console.log(this,'this');
    let keyHash = this.hashKeccak256(signature);
    let keypair = this.ec.genKeyPair({ entropy: keyHash });
    let privateKeyA = keypair.getPrivate().toString(16);
    let publicKeyA = this.byteArrayToHex(
      Uint8Array.from(keypair.getPublic().encode())
    );
    return [privateKeyA, publicKeyA];
  }
  hashKeccak256(data = String) {
    data = sodium.from_hex(data);
    return ethers.utils.keccak256(data).slice(2);
  }
  byteArrayToHex(bytesArray = Uint8Array) {
    return sodium.to_hex(bytesArray);
  }
  encode(m = String, k = String) {
    let len = m.length >= k.length ? m.length : k.length;
    m = BigInt("0x" + m);
    k = BigInt("0x" + k);
    return (m ^ k).toString(16).padStart(len, "0");
  }
  generateSymmetricKey() {
    let key = sodium.crypto_aead_xchacha20poly1305_ietf_keygen("hex");
    return key;
  }
  encrypt(message = Uint8Array, key = String) {
    key = sodium.from_hex(key);

    let nonce = sodium.randombytes_buf(
      sodium.crypto_aead_xchacha20poly1305_IETF_NPUBBYTES
    );
    let cipher = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
      message,
      null,
      null,
      nonce,
      key
    );
    let rs = new Uint8Array(nonce.length + cipher.length);
    rs.set(nonce);
    rs.set(cipher, nonce.length);
    return rs;
  }
  decrypt(cipher = Uint8Array, key = String) {
    key = sodium.from_hex(key);
    let nonce = cipher.subarray(0, 24);
    cipher = cipher.subarray(24);
    let messageDecrypted;
    try {
      messageDecrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
        null,
        cipher,
        null,
        nonce,
        key,
        "text"
      );
    } catch (err) {
      return new Uint8Array(32).fill(0);
    }

    return messageDecrypted;
  }

  //
  generateKeypair() {
    let privateKey = secp.utils.randomPrivateKey();
    let publicKey = secp.getPublicKey(privateKey);
    return [sodium.to_hex(privateKey), sodium.to_hex(publicKey)];
  }
  computeSharedKey(privateKey = String, publicKey = String) {
    let sharedKey = secp.getSharedSecret(privateKey, publicKey);
    sharedKey = sharedKey.subarray(1, 33);
    sharedKey = sodium.to_hex(sha256(sharedKey));
    return sharedKey;
  }
}

export default CryptoService;
