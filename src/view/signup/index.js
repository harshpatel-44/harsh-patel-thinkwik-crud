import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import * as yup from "yup";

import Swal from "sweetalert2";
import { handleUserRegistration } from "../../redux/action/authActions";

const SignUpPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [resErr, setResErr] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    } // Redirect User to home page if he/she already logged in
  }, [isLoggedIn]);

  const SignUpSchema = yup.object().shape({
    email: yup.string().email().trim().required().label("Email"),
    password: yup.string().trim().min(6).max(15).required().label("Password"),
    confirmPassword: yup
      .string()
      .trim()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .label("Confirm Password"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onFormSubmit = async (data) => {
    const { email, password } = data;

    try {
      setLoading(true);
      setResErr("");
      const apiData = { email, password };

      const signUpRes = await handleUserRegistration(apiData);

      if (signUpRes.user) {
        Swal.fire({
          title: "User created successfully!",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (e) {
      const errMsg = e?.split("/")[1];
      setResErr(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Sign Up</h3>
          {resErr && (
            <div className="alert alert-danger" role="alert">
              {resErr}
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={onFormSubmit}
            validateOnChange={true}
            validateOnMount={false}
          >
            {({ touched, errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    as={Input}
                    invalid={touched.email && !!errors.email}
                  />
                  <ErrorMessage name="email" component={FormFeedback} />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    as={Input}
                    invalid={touched.password && !!errors.password}
                  />
                  <ErrorMessage name="password" component={FormFeedback} />
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    as={Input}
                    invalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormFeedback}
                  />
                </FormGroup>
                <div className="d-grid">
                  <Button type="submit" color="primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner size={"sm"} /> ...Loading
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-3 w-100 text-center">
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
