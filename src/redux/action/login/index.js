import { Login, AuthMe } from "../../../api/auth";
import Cookies from "js-cookie";
export function authLogin(payload) {
  return async (dispatch) => {
    try {
      let response = await Login(payload);
      let data = response.data;
      dispatch(login(data));
      Cookies.set("token", data.token, { expires: 7 });
      return data;
    } catch (err) {
      return err;
    }
  };
}
export function authMe(payload) {
  return async (dispatch) => {
    try {
      let response = await AuthMe(payload);
      let data = response.data;
      dispatch(login(data));
      Cookies.set("token", data.token, { expires: 7 });
      return data;
    } catch (err) {
      return err;
    }
  };
}

export const login = (data) => {
  return {
    type: "LOGIN",
    identitas : data.identitas,
    username: data.user.nama_user,
    email: data.user.email,
    token: data.token,
    message: data.message,
    role: data.user.roles,
    status: data.user.status,
   
    isLoading: false,
  };
};
