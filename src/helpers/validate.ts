import { ILoginProps, ILoginPropsErrors } from "@/types";

export function validateLoginForm(values: ILoginProps) {
    const errors: ILoginPropsErrors = {};

    // validación email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
        errors.email = "Ingrese email";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "El email no tiene un formato válido";
    }

    // Validación contraseña
    if (!values.password) {
        errors.password = "Ingrese contraseña";
    } else if (values.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "La contraseña debe incluir al menos una letra mayúscula";
    } else if (!/[a-z]/.test(values.password)) {
        errors.password = "La contraseña debe incluir al menos una letra minúscula";
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = "La contraseña debe incluir al menos un número";
    }

    return errors;
}