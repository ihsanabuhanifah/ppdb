import React from "react";
import Layout from "../../layout/auth";
import {Link} from "react-router-dom"
export default function Login() {
  return (
      <Layout page="login">
          <h3>Login</h3>
          <Link to="/register">Daftar</Link>
      </Layout>
  )
}
