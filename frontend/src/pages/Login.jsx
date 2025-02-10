import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "../index.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/user/google";
  };

    const handleSignup = async () => {
    const res = await axios.post("http://localhost:5000/signup", { email, username });
    setUserId(res.data.userId);
    setWaiting(true);
  };

  

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      
      setIsLoggedIn(true);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ElderlyCare+
          </Typography>
        </Toolbar>
      </AppBar>
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        <MDBCol col="4" md="5">
          {error && <p className="text-danger">{error}</p>}
          {message && <p className="text-success">{message}</p>}

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="email"
            type="email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleSignIn}>
            Sign in
          </MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

         

          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: "#55acee" }} onClick={handleGoogleLogin}>
            <FaGoogle className="mx-2" /> Continue with Google
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
