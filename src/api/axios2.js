import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";



let client = axios.create({
  // baseURL: `https://ppdb-api.man1kotasukabumi.web.id/api`,
 
  baseURL : 'http://localhost:8000/api'
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