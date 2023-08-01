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
import { handleUserLogin } from "../../redux/action/auth";

const LogInPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [resErr, setResErr] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
  }, [isLoggedIn]);

  const LogInSchema = yup.object().shape({
    email: yup.string().email().trim().required().label("Email"),
    password: yup.string().trim().min(6).max(15).required().label("Password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onFormSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      setResErr("");

      const logInRes = await handleUserLogin(data);
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
          <h3>Log In</h3>
          {resErr && (
            <div className="alert alert-danger" role="alert">
              {resErr}
            </div>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={LogInSchema}
            onSubmit={onFormSubmit}
            validateOnChange={true}
            validateOnMount={false}
          >
            {({ errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    as={Input}
                    invalid={!!errors.email}
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
                    invalid={!!errors.password}
                  />
                  <ErrorMessage name="password" component={FormFeedback} />
                </FormGroup>

                <div className="d-grid">
                  <Button type="submit" color="primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner size={"sm"} /> ...Loading
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-3 w-100 text-center">
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
