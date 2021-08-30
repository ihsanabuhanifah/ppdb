
import axios from "./axios";
export async function getUser() {
    let result = await axios.get(`/user`);
   
    return result.data
  }