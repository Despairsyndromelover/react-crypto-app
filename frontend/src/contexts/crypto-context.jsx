import React, { useEffect, useState, createContext, useContext } from "react";
import { fetchCryptoData, fetchCryptoAssets } from "../api";
import { mathPercentDifference } from "../utils";
const CryptoContext = createContext({
  cryptoAssets: [],
  cryptoData: [],
  loading: false,
});

function mapAssets(cryptoAssets, result) {
  return cryptoAssets.map((asset) => {
    const activeCoin = result.find((coin) => coin.id === asset.id);
    return {
      value: asset.price < activeCoin.price, // true || false
      valuePercent: mathPercentDifference(asset.price, activeCoin.price),
      totalAmount: asset.amount * activeCoin.price,
      name: activeCoin.name,
      totalProfit:
        asset.amount * activeCoin.price -
        asset.amount * asset.price,
      ...asset,
    };
  });
}

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const [cryptoData, setCryptoData] = useState([]);
  const [cryptoAssets, setCryptoAssets] = useState([]);

  useEffect(() => {
    async function preloadCryptoInfo() {
      setLoading(true);

      const { result } = await fetchCryptoData();
      const cryptoAssets = await fetchCryptoAssets();

      setCryptoAssets(mapAssets(cryptoAssets, result));
      setCryptoData(result);

      setLoading(false);
    }
    preloadCryptoInfo();
  }, []);

  function addAsset(newAsset) {
    setCryptoAssets((prev) => mapAssets([...prev, newAsset], cryptoData));
  }
  return (
    <CryptoContext.Provider
      value={{ loading, cryptoData, cryptoAssets, addAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCryptoContext() {
  return useContext(CryptoContext);
}
