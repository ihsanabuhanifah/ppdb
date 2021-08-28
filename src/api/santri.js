import axios from "./axios";

export async function postSantiBaru(values) {
  try {
    let response = await axios.post("/dataSiswa/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function postSekolahAsal(values) {
  try {
    let response = await axios.post("/dataPendidikan/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
 
}
export async function postDataAyah(values) {
  try {
    let response = await axios.post("/dataAyah/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
 
}
export async function postDataIbu(values) {
  try {
    let response = await axios.post("/dataIbu/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
 
}
export async function postDataWali(values) {
  try {
    let response = await axios.post("/dataWali/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
 
}
