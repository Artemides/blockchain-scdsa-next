import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
const generateKeys = () => {
  const privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
  const publicKey = secp.secp256k1.getPublicKey(privateKey);
  const address = getAddressFromPubKey(publicKey);
  console.log({ privateKey, address: `0x${address}` });
};

const getAddressFromPubKey = (publicKey: Uint8Array) => {
  return toHex(keccak256(publicKey.slice(1)).slice(-20));
};
generateKeys();
generateKeys();
generateKeys();
