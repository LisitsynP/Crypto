import { createContext, useState, useEffect } from "react";
import { fakeFetchCrypto, FetchAssets } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    async function preloader() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await FetchAssets();

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            icon: coin.icon,
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: coin.price * asset.amount - asset.price * asset.amount,
            ...asset,
          };
        })
      );
      setCrypto(result);
      setLoading(false);
    }
    preloader();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}
export default CryptoContext;
