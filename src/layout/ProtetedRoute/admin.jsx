import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../../redux/action/login";

import Cookies from "js-cookie";
export const AdminPageProtected = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  let dispatch = useDispatch();
  let history = useHistory();
  if (isAuth) {
    Cookies.set("url", history.location.pathname);
    var url = Cookies.get("url")
  }
  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));
    console.log(result);
    if(result.response?.status === 401){
      return history.push("/login")
    }
    console.log("jalan")
    if(result?.user?.roles[0].name === "user"){
      return history.push("/ppdb/salam")
    }
    return history.push(url)
   
 
   
  };

  React.useEffect(() => {
    if (!isAuth) {
     
      onLoaded();
    }
  }, []);

  if (Cookies.get("token-ppdb")) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AdminPageProtected;

{
  /* <Route {...rest}>{!isAuth ? <Redirect to="/login" /> : children}</Route> */
}
