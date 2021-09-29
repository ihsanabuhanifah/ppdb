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
    const identitas = result.identitas;

    if (identitas !== undefined) {
      if (identitas.length === 0) {
        return history.push("/identitas");
      } else if (identitas.length === 1) {
       
        return history.push("/identitas/data-sekolah-asal");
      } else if (identitas.length === 2) {
        return history.push("/identitas/data-ayah");
      } else if (identitas.length === 3) {
        return history.push("/identitas/data-ibu");
      } else {
        return history.push(url);
      }
    }
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
