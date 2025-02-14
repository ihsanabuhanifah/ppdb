import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../../redux/action/login";

import Cookies from "js-cookie";
export const SiswaPageProtected = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  let dispatch = useDispatch();
  let history = useHistory();
 
 
  if (isAuth) {
    Cookies.set("url", history.location.pathname);
    var url = Cookies.get("url")
    let exam = Cookies.get("exam");
  
    if (exam !== undefined) {
      history.push(exam);
    }
   
  }
  
 
  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));

    if (result.response?.status === 401) {
      return history.push("/login");
    }
    if (result?.user?.roles[0].name === "admin") {
      return history.push("/admin/dashboard");
    }
    if (result?.user?.roles[0].name === "user") {
      return history.push("/ppdb/dashboard");
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

export default SiswaPageProtected;

{
  /* <Route {...rest}>{!isAuth ? <Redirect to="/login" /> : children}</Route> */
}
