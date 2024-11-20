import { TEXT_DOMAIN } from "./config";
export const getLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(TEXT_DOMAIN + "_" + key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(TEXT_DOMAIN + "_" + key, JSON.stringify(value));
};
