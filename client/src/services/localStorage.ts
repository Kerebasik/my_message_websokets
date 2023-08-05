export const setItemInLocalStorage = (key: string, data: string): void => {
  return localStorage.setItem(key, data);
};

export const deleteItemFromLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

export const getItemFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
