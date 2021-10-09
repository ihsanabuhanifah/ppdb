import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

 let headers = {
    Accept: "application/json",
    Authorization: "key=AAAAIGSlrxA:APA91bHAvooaAwyg5xP-4AqC3xEv7o6o7uKbkqcN3_3I92Q-Fq9kNEGOa-mfJ1mtEZp_wTEsfQ0YJmgtO5tFG7GkS6p_Z3MqzW8CriQcOH5rajVfxE2QxPg-WowMdaRER8MNFsH1RAeo",
    "Content-Type": "application/json",
  }

let postfirebase= axios.create({
  baseURL: `https://fcm.googleapis.com/fcm`,
  headers,
  
});

// console.log(Cookies.get("token-ppdb"))
// export const syncToken = () => {
//   //auth
 
//   console.log(client.defaults)
//   client.defaults.headers.Authorization = `Bearer ${Cookies.get(
//     "token-ppdb"
//   )}`;
//   console.log(client.defaults)

// };
// export const clearToken = () => {
//   delete client.defaults.headers["X-Authorization"];
//   delete client.defaults.headers["X-Yakes-Authorization"];

// };
export default postfirebase;

// https://mysmk-be.herokuapp.com/api
// http://localhost:8000/api
//http://psb-online.herokuapp.com/api
//

// baseURL: `https://psb-api.smkmadinatulquran.sch.id/api

// baseURL: `http://localhost:8000/api`,

// baseURL: `https://fcm.googleapis.com//v1/projects/fir-psb-notif-1dd4e/`,