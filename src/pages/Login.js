import React, { useState } from "react";
import Star from "../assets/Image/stars.png";
import { Input, Button, Form } from "antd";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const { email, password } = login;
  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    useMutationSubmit.mutate(login);
  };

  const useMutationSubmit = useMutation(
    ["submitCache"],
    async (body) => {
      console.log(body);
      const response = await axios.post(`http://localhost:3000/users`, body);

      return response.data;
    },
    {
      onSuccess: async (data) => {
        navigate("/home");
      },
      onError: (err) => {
        const { message } = err.response.data;
        setError(true);
        setErrorMessage(message);
      },
    }
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: " column",
      }}
    >
      <img src={Star} height="100" />
      <h1>AWARD</h1>
      <span>Enter your email address</span>
      <span> to sign in and continue</span>
      <Form style={{ display: "flex", flexDirection: "column" }}>
        <Form.Item
          validateStatus={`${error ? "error" : ""}`}
          style={{ marginBottom: "10px" }}
        >
          <Input
            placeholder="Enter E-mail"
            name="email"
            value={email}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          validateStatus={`${error ? "error" : ""}`}
          help={errorMessage}
          style={{ color: `${error ? "red" : "black"}` }}
        >
          <Input
            onChange={onChange}
            placeholder="Enter Password"
            name="password"
            value={password}
            type="password"
          />
        </Form.Item>
        <Button
          style={{
            backgroundColor: "#002329",
            color: "white",
            marginTop: "10px",
            borderRadius: "10px",
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
