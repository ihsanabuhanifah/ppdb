import { login, authMeProcess } from "../../../api/login";
import Cookies from "js-cookie";
import { syncToken } from "../../../api/axios";
export function authLogin(payload) {
  return async (dispatch) => {
    dispatch(isLoading());
    try {
      let response = await login(payload);
      let data = response.data;
      dispatch(loginProcess(data));
      Cookies.set("token-ppdb", data.token);
      syncToken();
      dispatch(finish());
      return data;
    } catch (err) {
      dispatch(finish());
      return err;
    }
  };
}
export function authMe(payload) {
  return async (dispatch) => {
    try {
      let response = await authMeProcess(payload);
      console.log('authMe Berjasil 1')
      let data = response.data;
      console.log('data ' , data)
      dispatch(loginProcess(data));
    
      Cookies.set("token-ppdb", data.token);
      syncToken();
      return data;
    } catch (err) {
      return err;
    }
  };
}

export const loginProcess = (data) => {
  return {
    type: "LOGIN",
    message: data?.message,
    name: data?.user?.name,
    email: data?.user?.email,
    phone: data?.user?.phone,
    token: data?.token,
    role: data?.user?.roles[0].name,
    identitas : data?.identitas,
    isPayment : data?.pendaftaran === 0 ? false : data?.pendaftaran === 1 ? true : 'belum_transfer'  ,
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

  export const payment = () => {
    return {
      type: "PAYMENT_UPDATE",
    };
  }