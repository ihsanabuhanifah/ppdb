import axios from "axios";
import Cookies from "js-cookie";
// import qs from "qs";

 let headers = {
    Accept: "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
    "Content-Type": "application/json",
  }

let client = axios.create({
  baseURL: `http://psb-online.herokuapp.com/api`,
  headers,
  paramsSerializer: function (params) {
    return qs.stringify(params, { encode: false, skipNulls: true });
  },
});

// export const syncToken = () => {
//   //auth
//   client.defaults.headers["X-Authorization"] = `Bearer ${Cookies.get(
//     "X-Authorization"
//   )}`;
//   client.defaults.headers["X-Yakes-Authorization"] = Cookies.get(
//     "X-Yakes-Authorization"
//   );

// };
// export const clearToken = () => {
//   delete client.defaults.headers["X-Authorization"];
//   delete client.defaults.headers["X-Yakes-Authorization"];

// };
export default client;

// https://mysmk-be.herokuapp.com/api
// http://localhost:8000/api