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
  isPayment : "belum_transfer",
  isLulus:"",
  isSudahTes : ""
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
      isPayment : action.isPayment,
      isLulus :action.isLulus,
      isSudahTes : action.isSudahTes
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
  if (action.type === "PAYMENT_UPDATE") {
    return {
      ...state,

      isPayment : false
    };
  }
  return state;
}
