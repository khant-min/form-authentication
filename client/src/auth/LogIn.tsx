import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const LogIn = () => {
  const LOGIN_URL = "/auth  ";
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);

      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized!");
      } else {
        setErrMsg("Login Failed!");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are Log in</h1>
          <br />
          <span>
            <a href="#">Go to Home</a>
          </span>
        </section>
      ) : (
        <section className="bg-gray-300 w-[400px] rounded-sm">
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="header">Sign In</h1>
          <form onSubmit={handleSubmit} className="login">
            <label htmlFor="email">Email:</label>
            <input
              ref={emailRef}
              required
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setEmail(e.target.value)
              }
            />

            <label htmlFor="password">Password:</label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
            />

            <button>Log In</button>
          </form>
          <p className="p-2 text-lg">
            You don't have an account?
            <button className="bg-teal-400 py-1 px-2 rounded-sm ml-4 hover:bg-teal-300 transition-all">
              <Link to="/">Sign Up</Link>
            </button>
          </p>
        </section>
      )}
    </>
  );
};

export default LogIn;
