import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authMe } from "../../redux/action/login";

import Cookies from "js-cookie";
export const TesPageProtected = ({ children, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isPayment = useSelector((state) => state.auth.isPayment);

  let dispatch = useDispatch();
  let history = useHistory();

  if (isAuth) {
    Cookies.set("url", history.location.pathname);
    Cookies.set("exam", history.location.pathname);
    var url = Cookies.get("url");
   
  }

  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));

    return history.push(url);
   
    if (result?.pendaftaran == 0) {
      return history.push("/ppdb/konfirmasi-pembayaran-ppdb");
    }
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
        return history.push(url);
        return history.push("/identitas/data-sekolah-asal");
      } else if (identitas.length === 2) {
        return history.push("/identitas/data-ayah");
      } else if (identitas.length === 3) {
        return history.push("/identitas/data-ibu");
      } else {
       
      }
    }
  };

  React.useEffect(() => {
    if (!isAuth) {
      onLoaded();
    }

    var ex = Cookies.get("exam");
    // if(ex !== null) {
    //   return history.push(url)
    // }
  }, []);

  if (Cookies.get("token-ppdb")) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default TesPageProtected;

{
  /* <Route {...rest}>{!isAuth ? <Redirect to="/login" /> : children}</Route> */
}
