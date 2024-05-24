/* eslint-disable @typescript-eslint/no-explicit-any */
import "primeicons/primeicons.css";

import {
  ErrorContainer,
  ErrorMessageContainer,
  ErrorText,
  ErrorsWrapper,
  FlexWrapper,
  FormItemWrapper,
  Input,
  InputWrapper,
  LoginHeaderSubtitle,
  LoginHeaderTitle,
  RegisterLink,
  SubmitButton,
  Wrapper,
} from "../components/styled";

import { Formik } from "formik";
import { useAuth } from "../../../shared/hooks/useAuth";
import { loginValidationSchema } from "../../../shared/utils/form-validator";

export const LoginPage = () => {
  const { authenticate, setLoginData, authenticationError, isLoading } =
    useAuth();

  return (
    <Wrapper style={{ marginTop: 80 }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={async (values) => {
          setLoginData({ email: values.email, password: values.password });
          await authenticate();
        }}
        validateOnBlur={true}
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleSubmit, touched, errors }) => (
          <FormItemWrapper>
            <FlexWrapper $alignment="flex-start">
              <LoginHeaderTitle>Login</LoginHeaderTitle>
              <LoginHeaderSubtitle>
                Faça login para visualizar suas tarefas
              </LoginHeaderSubtitle>
              {authenticationError && (
                <ErrorContainer>
                  <ErrorMessageContainer>
                    <i
                      className="pi pi-exclamation-triangle"
                      style={{ fontSize: "1.2em" }}
                    ></i>
                    <div style={{ fontSize: 12 }}>
                      <p style={{ color: "white" }}>
                        {authenticationError.message}
                      </p>
                    </div>
                  </ErrorMessageContainer>
                </ErrorContainer>
              )}
            </FlexWrapper>

            <FormItemWrapper>
              <InputWrapper>
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  onKeyUp={(e) => e.key.includes("Enter") && handleSubmit()}
                />
                {errors.email && touched.email && (
                  <ErrorsWrapper>
                    <ErrorText>{errors.email}</ErrorText>
                  </ErrorsWrapper>
                )}
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="Senha"
                  onChange={handleChange("password")}
                  onKeyUp={(e) => e.key.includes("Enter") && handleSubmit()}
                />
                {errors.password && touched.password && (
                  <ErrorsWrapper>
                    <ErrorText>{errors.password}</ErrorText>
                  </ErrorsWrapper>
                )}
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <SubmitButton type="submit" onClick={() => handleSubmit()}>
                {isLoading ? (
                  <i
                    className="pi pi-spin pi-spinner"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                ) : (
                  "Entrar"
                )}
              </SubmitButton>
            </FormItemWrapper>
            <FlexWrapper $type="row" $spacing="10px">
              Ainda não tem cadastro?
              <RegisterLink to="register">cadastre-se</RegisterLink>
            </FlexWrapper>
          </FormItemWrapper>
        )}
      </Formik>
    </Wrapper>
  );
};
