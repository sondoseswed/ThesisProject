import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import DoctorContext from "../../context/DoctorContext";
import Axios from "axios";
// import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
//   const [error, setError] = useState();

  const { setDoctorData } = useContext(DoctorContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
   
      const loginDoctor = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:3000/doctors/login",
        loginDoctor
      );
      setDoctorData({
        token: loginRes.data.token,
        doctor: loginRes.data.doctor,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    
  };
  return (
    <div className="page">
      <h2>Log in</h2>
     
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
