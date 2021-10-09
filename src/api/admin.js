import axios from "./axios";
import { syncToken } from "./axios";
export async function getUser({ page, per_page, keyword }) {
  console.log(per_page);
  let result = await axios.get(
    `/user?perpage=${per_page}&keywords=${keyword}&role=user&page=${page}`
  );

  return result.data;
}

export async function getAdmin() {
  let result = await axios.get(`/user?keyword=&role=admin`);

  return result.data;
}

export async function konfirmBukti(id) {
  let result = await axios.get(`/users/updateStatus/${id}`);

  return result.data;
}

export async function getNilai({ per_page, keyword }) {
  let result = await axios.get(
    `/listNilai?perpage=${per_page}&keywords=${keyword}`
  );

  return result.data;
}

export function getUserAll({ page, per_page, keyword }) {
  console.log(per_page);
  return axios.get(
    `/user?perpage=${per_page}&keywords=${keyword}&role=user&page=${page}`
  );
}

export async function getJadwal({ per_page, keyword }) {
  let result = await axios.get(
    `/getKel?perpage=${per_page}&keywords=${keyword}`
  );

  return result.data;
}

export async function updateStatusTes(values) {
  let result = await axios.post(`/updateStatus`, values);

  return result.data;
}

export async function updateJamTes(values) {
  let result = await axios.put(`/updateJamTes`, values);

  return result.data;
}


export async function updateStatusKelulusan(id, status) {
  let result = await axios.get(`/updateKelulusan/${id}?kelulusan=${status}`);

  return result.data;
}

export function getBuktiAll({ page, per_page, keyword }) {
  console.log(per_page);
  return axios.get(
    `/getBuktiAll?perpage=${per_page}&keywords=${keyword}&role=user&page=${page}`
  );
}

export async function getStatusBukti(id) {
  let result = await axios.get(`/getStatusBukti/${id}?status=1`);

  return result.data;
}

export async function deviceUpdate(id,token) {
  console.log(token);
  syncToken()
  try {
    let response = await axios.get(`/device-update/${id}?token=${token}`);
  return response.data;
  } catch (err) {
    return err;
  }
 
}
