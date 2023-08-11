import { ACCESS_KEY, BASE_URL } from './config.js';

export const getSymbols = async () => {
  const resp = await fetch(`${BASE_URL}/symbols?` + new URLSearchParams({
    access_key: ACCESS_KEY,
  }));

  return await resp.json();
};

export const getCurrencies = async () => {
  const resp = await fetch(`${BASE_URL}/latest?` + new URLSearchParams({
    access_key: ACCESS_KEY,
  }));

  return await resp.json();
};