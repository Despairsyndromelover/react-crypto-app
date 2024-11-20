import { cryptoData, cryptoAssets } from "./data";

export function fetchCryptoData() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoData);
    }, 1000);
  });
}

export function fetchCryptoAssets() {
  return new Promise((res) => {
    setTimeout(() => {
      res(cryptoAssets);
    }, 1000);
  });
}
