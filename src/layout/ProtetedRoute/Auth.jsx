import React, { useMemo } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../../redux/action/login";

import Cookies from "js-cookie";
export const AuthProtected = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  let dispatch = useDispatch();
  let history = useHistory();
  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));
  
    if(result.response?.status === 401){
      history.push("/login")
    }else{
        history.goBack()
    }

    
  };

  React.useEffect(() => {
    if (!isAuth) {
      console.log("ok");
      onLoaded();
    }
  }, []);

  if (Cookies.get("token-ppdb")) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthProtected;

{
  /* <Route {...rest}>{!isAuth ? <Redirect to="/login" /> : children}</Route> */
}
