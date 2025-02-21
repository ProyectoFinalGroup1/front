"use client";
import { login } from '@/helpers/auth.helper';
import { validateLoginForm } from '@/helpers/validate';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';

const LoginView = () => {
    return (
      <div className=''>
        <div className="flex flex-row justify-center items-center
                        mt-20">
          <div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-2" >
                Iniciá Sesión
              </h1>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={validateLoginForm}
              onSubmit={async (values) => {
                const response = await login(values)   //login es la funcion que hace la peticion al BACK, se crea en auth.helper.ts
                console.log(response);
                
                console.log("Submit exitoso");
  
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className='pr-16 py-5'>
                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-3 py-2
                                  border border-gray-300 rounded-md
                                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="email" component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className='py-5'>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        className="w-full px-3 py-2
                                  border border-gray-300 rounded-md
                                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <ErrorMessage name="password" component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className='pt-2'>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4
                        bg-green-700 hover:bg-green-800 text-white font-bold
                        rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        Ingresar
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div>
            <Image
              src="/images/Login.png"
              alt=""
              width={300}
              height={300}
              className="box-border"
            />
          </div>
        </div>
      </div>
    );
}

export default LoginView;