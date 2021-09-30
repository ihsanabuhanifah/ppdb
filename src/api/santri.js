import axios from "./axios";
import {syncToken} from "./axios"
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

export async function uploadBuktiTransfer(values) {
  let form = new FormData();

  form.append("url_img", values["files"]);
  form.append("status", "0");
  form.append("nominal" , parseFloat(values["nominal"]))
  try {
    let response = await axios.post("/uploadBukti/save", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
}


export async function getBuktiTransfer() {
  let respone = await axios.get("/uploadBukti/user");
 console.log(respone)
  return respone.data
}
export async function detailBuktiTransfer() {
  let respone = await axios.get("/uploadBukti/detail");
 console.log(respone)
  return respone.data
}

//tes diniyah
export async function postTesDiniyyah(values) {
  try {
    let response = await axios.post("/tesDiniyah", values);
    return response.data;
  } catch (err) {
    return err;
  }
}


export async function getTesDiniyah() {
  let respone = await axios.get("/tesDiniyahSaya/tes-saya");
 console.log(respone)
  return respone.data
}

//tes umum

export async function postTesUmum(values) {
  syncToken()
  try {
    let response = await axios.post("/tesMasuk/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function putTesUmum(values) {
  syncToken()
  try {
    let response = await axios.post("/tesMasuk/update", values);
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function getTesUmum(kode) {
  syncToken()
  let respone = await axios.get(`/tesMasuk/${kode}`);
 console.log(respone)
  return respone.data
}