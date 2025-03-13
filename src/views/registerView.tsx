"use client"

import type React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"

import Link from "next/link"
import { register } from "@/helpers/auth.helper"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuth } from '@/context/AuthContext'
import Image from "next/image"
import { validateRegisterForm } from "@/helpers/validate"

const RegisterView: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modified function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Don't use router.push here - let the OAuth flow handle redirection
      await signInWithGoogle();
      // Don't navigate here - let the callback handle it
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Error al iniciar sesión con Google');
      setIsLoading(false);
    }
    // Note: We don't set isLoading(false) here because the page will redirect
  };

  return (
    <div className="flex flex-row justify-center items-center">

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Registrate en Valle de Paz</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          <Formik
            initialValues={{
              nombre: "",
              apellido: "",
              dni: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validate={validateRegisterForm}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await register(values);
                console.log("Registro exitoso", response);
                router.push("/login");
              } catch (error) {
                console.error("Error en el registro:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="apellido" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="dni"
                      placeholder="DNI"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage name="dni" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <Field
                      type="password"
                      name="passwordConfirm"
                      placeholder="Confirmar contraseña"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Registrarse
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting || isLoading}
                  className="w-full mt-3 py-2 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold rounded-md transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continuar con Google
                    </>
                  )}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                  ¿Ya tenés cuenta?{" "}
                  <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                    Iniciá sesión
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="top-0 right-0 w-full md:w-1/2 h-screen relative">
        <Image
          src="/images/fondo2.JPG"
          alt=""
          layout="fill" 
          objectFit="cover" 
          className="rounded-tl-2xl rounded-bl-2xl"
        />
        <Link href="/">
          <Image
            src="/images/logo.jpg"
            alt=""
            width={250}
            height={250}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-150"
          />
        </Link>
      </div>

    </div>
  )
}

export default RegisterView;