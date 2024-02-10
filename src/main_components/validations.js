import { toastr } from "react-redux-toastr";

export const checkValue = (value) => {
  return value === "" || value === null || value === undefined;
};

export const checkMinValue = (value) => {
  const a = parseFloat(value);
  const b = parseFloat("0.001");
  return a > b;
};

export const checkBalance = (value) => {
  return value === "0" || value === 0 || value === undefined || value === null;
};

export const getCurrentPairBalance = (balances, currentAsset) => {
  let qty = "0";
  balances.forEach((x) => {
    if (currentAsset === x.asset) {
      qty = x.free;
    }
  });
  return qty;
};

export const toPercentage = (value) => {
  if (checkValue(value)) {
    return null;
  }
  return parseFloat(value) * 100;
};

export const percentageToFloat = (value) => {
  if (checkValue(value)) {
    return null;
  }
  return parseFloat(value) / 100;
};

export const dataHeaders = [
  "Date",
  "Symbol",
  "Side",
  "Type",
  "Price",
  "Original Quantity",
  "Executed Quantity",
];

export const replaceZeros = (value) => {
  return value.replace(/^0+/, "");
};

export const listCssColors = [
  "#51cbce",
  "#fbc658",
  "#ef8157",
  "#E3E3E3",
  "#51bcda",
  "#c178c1",
  "#dcb285",
  "#f96332",
  "#6bd098",
];

export const addNotification = (name, message, type = "success") => {
  toastr[type](name, message);
};

export const roundDecimals = (num, decimals = 2) => {
  return Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export const intervalOptions = [
  "1m",
  "3m",
  "5m",
  "15m",
  "30m",
  "1h",
  "2h",
  "4h",
  "6h",
  "8h",
  "12h",
  "1d",
  "3d",
  "1w",
];