"use client"

import type React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { validateRegisterForm } from "@/helpers/registerValidate"
import Link from "next/link"

const RegisterView: React.FC = () => {
  return (
    <div className="flex w-full h-screen">
    
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Registrate en Valle de Paz</h1>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              dni: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={validateRegisterForm}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1" />
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
                      name="confirmPassword"
                      placeholder="Confirmar contraseña"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Registrarse
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                  ¿Ya tenés cuenta?{" "}
                  <Link href="#" className="text-green-600 hover:text-green-700 font-medium">
                    Iniciá sesión
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

     
      <div
        className="hidden lg:block w-1/2 h-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('/flores.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/logo.png" alt="Valle de Paz" className="w-64" />
        </div>
      </div>
    </div>
  )
}

export default RegisterView

