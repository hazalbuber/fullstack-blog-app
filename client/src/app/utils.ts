export const getToken = () => {
  return localStorage.getItem("APP_ACCESS_TOKEN");
};

export const removeToken = () => {
  return localStorage.removeItem("APP_ACCESS_TOKEN");
};

export const setToken = (token: string) => {
  return localStorage.setItem("APP_ACCESS_TOKEN", token);
};
