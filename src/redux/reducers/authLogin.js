const initialState = {
  username: "",
  email: "",
  token: "",
  message : "",
  role:"",
  status : 0,
  identitas:"",
  isLoading: false,

};

export default function authLogin(state = initialState, action) {
  if (action.type === "LOGIN") {
    return {
      ...state,
      username: action.username,
      email : action.email,
      token :action.token,
      message : action.message,
      role:action.role,
      status : action.status,
      identitas:action.identitas,
      isLoading: action.isLoading,
    };
  }
  if (action.type === "PROCESS") {
    return {
      ...state,

      isLoading: true,
    };
  }
  return state;
}
