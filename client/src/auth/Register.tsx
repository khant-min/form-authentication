import React, { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState<string>("");
  const [validUsername, setValidUsername] = useState<boolean>();
  const [userFocus, setUserFocus] = useState<boolean>();

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>();
  const [emailFocus, setEmailFocus] = useState<boolean>();

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>();
  const [passwordFocus, setPasswordFocus] = useState<boolean>();

  const [confirm_pwd, setConfirm_pwd] = useState<string>("");
  const [validConfirm_pwd, setValidConfirm_pwd] = useState<boolean>();
  const [confirm_pwdFocus, setConfirm_pwdFocus] = useState<boolean>();

  const [errMsg, setErrMsg] = useState<any>("");
  const [success, setSuccess] = useState<boolean>();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    const valid = password === confirm_pwd;
    setValidConfirm_pwd(valid);
  }, [password, confirm_pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, confirm_pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
        }
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm_pwd("");
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success</h1>
          <a href="#">Sign In</a>
        </section>
      ) : (
        <section className=" bg-gray-300 w-[400px] rounded-sm">
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1 className="header">Register</h1>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validUsername ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validUsername || !username ? "hide" : "invalid"}
              />
            </label>
            <input
              required
              ref={userRef}
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="off"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setUsername(e.target.value)
              }
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={
                !validUsername && !userFocus && username
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setEmail(e.target.value)
              }
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              className={
                !validEmail && !emailFocus && email
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Warning: Please ensure the email address is in the correct format
              of "example@domain.com".
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setPassword(e.target.value)
              }
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              className={
                !validPassword && !passwordFocus && password
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validConfirm_pwd && confirm_pwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validConfirm_pwd || !confirm_pwd ? "hide" : "invalid"
                }
              />
            </label>
            <input
              required
              type="password"
              id="confirm_pwd"
              placeholder="Enter your password again"
              value={confirm_pwd}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setConfirm_pwd(e.target.value)
              }
              onFocus={() => setConfirm_pwdFocus(true)}
              onBlur={() => setConfirm_pwdFocus(false)}
            />
            <p
              className={
                !validConfirm_pwd && !confirm_pwdFocus && confirm_pwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button>Register</button>
          </form>
          <p className="p-2 text-lg">
            Already have an account?
            <button className="bg-teal-400 py-1 px-2 rounded-sm ml-4 hover:bg-teal-300 transition-all">
              <Link to="login">Log In</Link>
            </button>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
