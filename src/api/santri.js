import { useMutation, useQueryClient } from "react-query";
import axios from "./axios";
import { syncToken } from "./axios";
import Swal from "sweetalert2";

export const uploadFileFoto = async (file, key) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", key);

  try {
    const response = await axios.post("/upload/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export async function getDetail() {
  try {
    let response = await axios.get("/detail");
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getDetailByAdmin(id) {
  try {
    let response = await axios.get(`users/detail/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getJumlahPendaftaran() {
  try {
    let response = await axios.get("/jumlah-pendaftaran");
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function updateProfile(payload) {
  try {
    let response = await axios.put("/update-profile", payload);
    return response.data;
  } catch (err) {
    return err;
  }
}

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
  form.append("nominal", parseFloat(values["nominal"]));
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
  console.log(respone);
  return respone.data;
}
export async function detailBuktiTransfer() {
  let respone = await axios.get("/uploadBukti/detail");
  console.log(respone);
  return respone.data;
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
  console.log(respone);
  return respone.data;
}

//tes umum

export async function postTesUmum(values) {
  syncToken();
  try {
    let response = await axios.post("/tesMasuk/save", values);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function putTesUmum(values) {
  syncToken();
  try {
    let response = await axios.post("/tesMasuk/update", values);
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function getTesUmum(kode) {
  syncToken();
  let respone = await axios.get(`/tesMasuk/${kode}`);
  console.log(respone);
  return respone.data;
}

export const fetchImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Konversi Blob ke File
    const file = new File([blob], "image.jpg", { type: blob.type });

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file); // Konversi ke Base64
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export async function postNilaiBerkas(values) {
  try {
    let response = await axios.post(`/berkas/${values.id}`, values);
    return response.data;
  } catch (err) {
   
    return err;
  }
}

export const useNilaiBerkas = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (values) => postNilaiBerkas(values),
    onSuccess: () => {
      queryClient.invalidateQueries("users/detail/id");
      Swal.fire({
        title: "Penilaian Berkas Berhasil",
        icon: "success",
        draggable: true,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    },
  });

  return mutate;
};

export async function createTes(id) {
 
 
    let response = await axios.post(`/tes/${id}`);
    console.log("tes berhalan", response)
   
    return response.data;
  
}

export const useCreateTes = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (id) => createTes(id),
    onSuccess: () => {
      queryClient.invalidateQueries("users/detail/id");
      Swal.fire({
        title: "Tes Berhasil dibuka",
        icon: "success",
        draggable: true,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    },
  });

  return mutate;
};


export async function updateTPA(values) {
 
 
  let response = await axios.put(`/nilai/tpa`, values);
  console.log("tes berhalan", response)
 
  return response.data;

}
export const useSimpanTPA = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (values) => updateTPA(values),
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
      Swal.fire({
        title: "Jawaban Berhasil Tersimpan",
        icon: "success",
        draggable: true,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    },
  });

  return mutate;
};


export async function updateStudi(values) {
 
 
  let response = await axios.put(`/nilai/studi`, values);
  console.log("tes berhalan", response)
 
  return response.data;

}
export const useSimpanStudi = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (values) => updateStudi(values),
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
      Swal.fire({
        title: "Jawaban Berhasil Tersimpan",
        icon: "success",
        draggable: true,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    },
  });

  return mutate;
};


export async function updateWawancara(values) {
 
 
  let response = await axios.put(`/nilai/wawancara`, values);
  console.log("tes berhalan", response)
 
  return response.data;

}
export const useSimpanWawancara = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (values) => updateWawancara(values),
    onSuccess: () => {
      queryClient.invalidateQueries("detail");
      Swal.fire({
        title: "Jawaban Berhasil Tersimpan",
        icon: "success",
        draggable: true,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    },
  });

  return mutate;
};