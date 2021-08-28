const initialState = {
  message: "",
  name: "",
  email : "",
  phone: "",
  token: "",
  role: "",
  identitas : "",
  isLoading: false,
  isAuth:false,
};

export default function authLogin(state = initialState, action) {
  if (action.type === "LOGIN") {
    return {
      ...state,
      email: action.email,
      token: action.token,
      message: action.message,
      role: action.role,
      name:action.name,
      phone:action.phone,
      identitas:action.identitas,
      isAuth:true,
      isLoading: action.isLoading,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,

      email: action.email,
      token: action.token,
      message: action.message,
      role: action.role,
      name:action.name,
      phone:action.phone,
      identitas:action.identitas,
      isAuth:true,
      isLoading: action.isLoading,
    };
  }
  if (action.type === "PROCESS") {
    return {
      ...state,

      isLoading: true,
    };
  }
  if (action.type === "FINISH") {
    return {
      ...state,

      isLoading: false,
    };
  }
  return state;
}
