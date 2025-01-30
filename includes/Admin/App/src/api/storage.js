import { TEXT_DOMAIN } from "./config";
export const getLocalStorage = (name, defaultValue) => {
  const storedValue = localStorage.getItem(TEXT_DOMAIN + "_" + name);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const setLocalStorage = (name, value) => {
  localStorage.setItem(TEXT_DOMAIN + "_" + name, JSON.stringify(value));
};
