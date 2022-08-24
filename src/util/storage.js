const storage = window.sessionStorage;

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
}

export const getItem = (key, defualtValue) => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defualtValue;
  } catch (e) {
    return defualtValue;
  }
}
