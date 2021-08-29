import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../../redux/action/login";

import Cookies from "js-cookie";
export const SiswaPageProtected = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  let dispatch = useDispatch();
  let history = useHistory();
  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));
    console.log(result);
    if(result.response?.status === 401){
      history.push("/login")
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
        return history.push("/ppdb/salam");
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
