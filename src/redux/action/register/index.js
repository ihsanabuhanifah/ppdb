import { register } from "../../../api/register";
import Cookies from "js-cookie";
export function authRegister(payload) {

  return async (dispatch) => {
    dispatch(isLoading());
    try {
      let response = await register(payload);
      let data = response.data;
     console.log(data)
      dispatch(registerAuth(data));
      Cookies.set("token-ppdb", data.token);
      localStorage.setItem('data' , JSON.stringify([{
        name : data?.user?.name,
        email : data?.user?.email,
        phone : data?.user?.phone
      }]))
      return data;
    } catch (err) {
        dispatch(finish());
      return err;
    }
  };
}

export const registerAuth = (data) => {
  return {
    type: "REGISTER",
    message: data?.message,
    name: data?.user?.name,
    email: data?.user?.email,
    phone: data?.user?.phone,
    token: data?.token,
    role: data?.role,
    identitas : "belum lengkap",
    isLoading: false,
  };
};

export const isLoading = () => {
  return {
    type: "PROCESS",
  };
};
export const finish = () => {
    return {
      type: "FINISH",
    };
  };
