//const getClient = async () => {
const getClient = () => {
  const client = localStorage.getItem("client");
  return JSON.parse(client);
};

const getToken = async () => {
  const token = localStorage.getItem("access_token");
  return JSON.parse(token);
};

const setClient = async (client) => {
  localStorage.setItem("client", JSON.stringify(client));
};

const setToken = async (token) => {
  localStorage.setItem("access_token", JSON.stringify(token));
};

const logOut = async (token) => {
  localStorage.removeItem("client");
  localStorage.removeItem("access_token");
};
localStorage.removeItem("mytime");

module.exports = {
  getClient,
  getToken,
  setClient,
  setToken,
  logOut,
};
