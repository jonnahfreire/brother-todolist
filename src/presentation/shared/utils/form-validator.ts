import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Informe um email válido')
        .required("Informe um email"),

    password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres")
        .required("Informe uma senha"),
});

export const registerValidationSchema = yup.object().shape({
    name: yup.string().required("Informe seu nome completo"),

    email: yup.string().email('Informe um email válido')
        .required("Informe um email"),

    password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres")
        .required("Informe uma senha"),

    passwordConfirmation: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres")
        .required("Informe uma senha"),
})
