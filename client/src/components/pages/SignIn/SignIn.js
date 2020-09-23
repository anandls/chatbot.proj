import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../../../formik/TextInput";
import StyledHeading from "../../../styles/StyledHeading";
import RoundedButton from "../../../styles/RoundedButton";
import { tapAnimation, hoverAnimation } from "../../../framer";

import HeroSection from "../../HeroSection";
import { homeObjOne } from "./Data";

import api from "../../../services/api";
import { setClient, setToken } from "../../../services/localstorage";

const StyledUserLogin = styled.div`
  width: 20%;
  margin: 2em auto;
  padding: 2em;
  background: ${(props) => props.theme.white};
  box-shadow: ${(props) => props.theme.bs2};
  border-radius: 6px;

  @media (max-width: 500px) {
    width: 90%;
  }

  input {
    border: 1px solid ${(props) => props.theme.violet};
  }

  button.user-login {
    background-color: ${(props) => props.theme.primaryBtn};
    color: ${(props) => props.theme.white};
    box-shadow: ${(props) => props.theme.bs2};
  }

  p {
    letter-spacing: 0.1em;
  }

  p span {
    border-bottom: 2px solid ${(props) => props.theme.violet};
    text-transform: uppercase;
    font-weight: bold;
  }
`;

const SignIn = () => {
  const history = useHistory();
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState(initialState);
  return (
    <>
      <HeroSection {...homeObjOne} />

      <Fragment>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).max(6).required(),
          })}
          onSubmit={(values) => {
            console.log(values);

            const doSignIn = async (e) => {
              try {
                //lkool@gmail.com
                //const newState = { account, ...values };
                setState({ ...state, values });
                //console.log(state);
                let response = await api.user.signIn(state);

                if (response) {
                  setClient(response.client);
                  setToken(response.token);
                  history.push("/client-area");
                }
              } catch (error) {
                console.log(error);
              }
            };

            doSignIn();
          }}
        >
          {(values) => {
            return (
              <StyledUserLogin>
                <StyledHeading>
                  <span>Login to your Account</span>
                </StyledHeading>
                <Form autoComplete="off">
                  <TextInput
                    autoComplete="off"
                    type="email"
                    name="email"
                    placeholder="johnjoe@gmail.com"
                  />
                  <br />

                  <TextInput
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="password"
                  />
                  <br />

                  <RoundedButton
                    whileHover={hoverAnimation}
                    whileTap={tapAnimation}
                    className="user-login"
                    type="submit"
                  >
                    Login
                  </RoundedButton>
                </Form>
                <p>
                  Don't have an Account?{" "}
                  <Link to="./sign-up">
                    <span>Sign Up Here</span>
                  </Link>
                </p>
              </StyledUserLogin>
            );
          }}
        </Formik>
      </Fragment>
    </>
  );
};

export default SignIn;
