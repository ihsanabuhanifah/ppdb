
import axios from "./axios";
export async function getUser({page, per_page , keyword}) {
  console.log(per_page)
    let result = await axios.get(`/user?perpage=${per_page}&keywords=${keyword}&role=user&page=${page}`);
   
    return result.data
  }

  export async function getAdmin() {
    let result = await axios.get(`/user?keyword=&role=admin`);
   
    return result.data
  }


  export async function konfirmBukti(id) {
    let result = await axios.get(`/users/updateStatus/${id}`);
   
    return result.data
  }