import { IRegisterProps, IRegisterPropsErrors } from "@/types/IRegister";

function validateEmail(email: string): string | undefined {
  if (!email) return "El email es obligatorio";
  if (!/\S+@\S+\.\S+/.test(email))
    return "La dirección de correo electrónico debe ser válida";
}

function validatePassword(password: string): string | undefined {
  if (!password) return "La contraseña es obligatoria";
  if (password.length < 8)
    return "La contraseña debe tener al menos 8 caracteres";
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    )
  )
    return "La contraseña debe contener al menos un carácter en mayúsculas, un carácter en minúsculas, un número y un carácter especial";
}



function validateName(name: string): string | undefined {
  if (!name) return "El nombre es obligatorio";
  if (name.length < 2) return "El nombre debe tener al menos 2 caracteres";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(name))
    return "El nombre solo puede contener letras y espacios";
}

function validateLastName(lastname: string): string | undefined {
    if (!lastname) return "El apellido es obligatorio";
    if (lastname.length < 2) return "El nombre debe tener al menos 2 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(lastname))
      return "El nombre solo puede contener letras y espacios";
  }

  function validateDni(dni: string): string | undefined {
    if (!dni) return "El DNI es obligatorio";
    if (!/^\d+$/.test(dni)) return "El DNI debe contener sólo números";
    if (dni.length < 8) return "El DNI debe tener al menos 8 caracteres";
    if (!/^\d{8}$/.test(dni)) return "El DNI debe tener 8 números";
  }

export function validateRegisterForm(values: IRegisterProps) {
  const errors: IRegisterPropsErrors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const lastnameError = validateLastName(values.lastname);
  if (lastnameError) errors.lastname = lastnameError;

  const dniError = validateDni(values.dni);
  if (dniError) errors.dni = dniError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  
  if (!values.confirmPassword) {
    errors.confirmPassword = "La confirmación de contraseña es obligatoria";
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }



  return errors;
}
