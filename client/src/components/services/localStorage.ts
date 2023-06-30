export const SetItemInLocalStorage = (key: string, data: string): void => {
  return localStorage.setItem(key, data);
};

export const DeleteItemInLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

export const GetItemInLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
