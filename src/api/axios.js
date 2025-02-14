import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

 let headers = {
    Accept: "application/json",
    Authorization: "Bearer " + Cookies.get("token-ppdb"),
    "Content-Type": "application/json",
  }

let client = axios.create({
baseURL: `https://ppdb-api.man1kotasukabumi.web.id/api`,
// baseURL : 'http://localhost:8000/api',
  headers,
  paramsSerializer: function (params) {
    return qs.stringify(params, { encode: false, skipNulls: true });
  },
});

console.log(Cookies.get("token-ppdb"))
export const syncToken = () => {
  //auth
 
  console.log(client.defaults)
  client.defaults.headers.Authorization = `Bearer ${Cookies.get(
    "token-ppdb"
  )}`;
  console.log(client.defaults)

};
// export const clearToken = () => {
//   delete client.defaults.headers["X-Authorization"];
//   delete client.defaults.headers["X-Yakes-Authorization"];

// };
export default client;

// https://mysmk-be.herokuapp.com/api
// http://localhost:8000/api
//http://psb-online.herokuapp.com/api
//

// baseURL: `https://psb-api.smkmadinatulquran.sch.id/api

// baseURL: `http://localhost:8000/api`,