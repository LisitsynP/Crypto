import { cryptoAssets } from "./data";

export function fakeFetchCrypto() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "XINIicRGNvgumakBWTHopNDbkhpEFDpi71UKOOrLCaA=",
    },
  };

  return fetch("https://openapiv1.coinstats.app/coins?limit=100", options)
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.error(err));
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(cryptoData);
  //   }, 1);
  // }); заглушка на запрос данных о монетах
}

export function FetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
