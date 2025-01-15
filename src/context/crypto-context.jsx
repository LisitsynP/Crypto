import { createContext, useState, useEffect } from "react";
import { fakeFetchCrypto, FetchAssets } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
  drawer: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  const [drawer, setdDrawer] = useState(false);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        icon: coin.icon,
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: coin.price * asset.amount - asset.price * asset.amount,
        name: coin.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preloader() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      // const assets = await FetchAssets();
      const assets =
        JSON.parse(localStorage.getItem("Assets")) === null
          ? await FetchAssets()
          : JSON.parse(localStorage.getItem("Assets"));
      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preloader();
  }, []);

  function deleteAsset(v) {
    const currnetAssets = assets.filter((asset) => {
      if (asset.name !== v.name) {
        return asset;
      }
    });
    setAssets(currnetAssets);
    localStorage.setItem("Assets", JSON.stringify(currnetAssets));
  }

  function addAsset(newAsset, coin) {
    let update = false;
    const updatedAsset = assets.map((asset) => {
      if (asset.id === newAsset.id) {
        update = true;
        asset.price =
          (asset.price * asset.amount + newAsset.price * newAsset.amount) /
          (asset.amount + newAsset.amount);
        asset.amount = asset.amount + newAsset.amount;
        asset.date = newAsset.date;
        asset.grow = asset.price < coin.price;
        asset.growPercent = percentDifference(asset.price, coin.price);
        asset.totalAmount = asset.amount * coin.price;
        asset.totalProfit =
          coin.price * asset.amount - asset.price * asset.amount;
        return asset;
      }
      return asset;
    });

    setAssets(() => {
      if (update) return mapAssets([...updatedAsset], crypto);
      return mapAssets([...updatedAsset, newAsset], crypto);
    });
    localStorage.setItem(
      "Assets",
      JSON.stringify(
        update
          ? mapAssets([...updatedAsset], crypto)
          : mapAssets([...updatedAsset, newAsset], crypto)
      )
    );
  }

  function changeDrawer(bool) {
    setdDrawer(bool);
  }

  return (
    <CryptoContext.Provider
      value={{
        loading,
        crypto,
        assets,
        addAsset,
        drawer,
        changeDrawer,
        deleteAsset,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
