/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "../../../shared/hooks/useAuth";
import { registerValidationSchema } from "../../../shared/utils/form-validator";

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
  SuccessContainer,
  SuccessMessageContainer,
  Wrapper,
} from "../components/styled";

import { Formik } from "formik";

export const RegisterPage = () => {
  const {
    register,
    setRegisterData,
    registrationError,
    registerSuccess,
    isLoading,
  } = useAuth();

  return (
    <Wrapper style={{ marginTop: 80 }}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validateOnChange={true}
        validateOnMount={true}
        onSubmit={async (values, { setFieldError }) => {
          setRegisterData({
            name: values.name,
            email: values.email,
            password: values.password,
          });

          if (values.password !== values.passwordConfirmation) {
            setFieldError("passwordConfirmation", "As senhas não conferem");
            return false;
          }

          await register();
        }}
        validateOnBlur={true}
        validationSchema={registerValidationSchema}
      >
        {({ handleChange, handleSubmit, touched, errors }) => (
          <FormItemWrapper>
            <FlexWrapper $alignment="flex-start">
              <LoginHeaderTitle>Cadastro</LoginHeaderTitle>
              <LoginHeaderSubtitle>
                Registre-se para começar a organizar suas tarefas
              </LoginHeaderSubtitle>
              {registrationError && (
                <ErrorContainer>
                  <ErrorMessageContainer>
                    <i
                      className="pi pi-exclamation-triangle"
                      style={{ fontSize: "1.2em" }}
                    ></i>
                    <div style={{ fontSize: 12 }}>
                      <p style={{ color: "white" }}>
                        {registrationError.message}
                      </p>
                    </div>
                  </ErrorMessageContainer>
                </ErrorContainer>
              )}
              {registerSuccess && (
                <SuccessContainer>
                  <SuccessMessageContainer>
                    <i className="pi pi-check" style={{ fontSize: "1em" }}></i>
                    <div style={{ fontSize: 12 }}>
                      <p style={{ color: "white" }}>
                        Cadastro realizado com successo!
                      </p>
                    </div>
                  </SuccessMessageContainer>
                </SuccessContainer>
              )}
            </FlexWrapper>

            <FormItemWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Nome"
                  onChange={handleChange("name")}
                  onKeyUp={(e) => e.key.includes("Enter") && handleSubmit()}
                />
                {errors.name && touched.name && (
                  <ErrorsWrapper>
                    <ErrorText>{errors.name}</ErrorText>
                  </ErrorsWrapper>
                )}
              </InputWrapper>
            </FormItemWrapper>
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
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="Confirmar senha"
                  onChange={handleChange("passwordConfirmation")}
                  onKeyUp={(e) => e.key.includes("Enter") && handleSubmit()}
                />
                {errors.passwordConfirmation &&
                  touched.passwordConfirmation && (
                    <ErrorsWrapper>
                      <ErrorText>{errors.passwordConfirmation}</ErrorText>
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
                  "Cadastrar"
                )}
              </SubmitButton>
            </FormItemWrapper>
            <FlexWrapper $type="row" $spacing="10px">
              Já tem cadastro?
              <RegisterLink to="/">fazer login</RegisterLink>
            </FlexWrapper>
          </FormItemWrapper>
        )}
      </Formik>
    </Wrapper>
  );
};
