"use client";
import { useAuth } from '@/context/AuthContext';
import { login } from '@/helpers/auth.helper';
import { validateLoginForm } from '@/helpers/validate';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'


const LoginView = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
    return (
      
        <div className="flex flex-row justify-center items-center
                        mt-20">
          <div className="w-full md:w-1/2">

            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center" >
                Iniciá Sesión
              </h1>        
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              validate={validateLoginForm}
              onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await login(values)  
                console.log("Inicio de Sesión Exitoso",response);
                setUserData({ token: response.token, user: response.userExisting })
                Cookies.set("userData", JSON.stringify({token: response.token, user: response.userExisting}))
                router.push("/");
              } catch (error) {
                console.log("Error al Iniciar Sesión:", error); 
              } finally {
                setSubmitting(false);
              }
  
              }}
            >
              {({ isSubmitting }) => (
                <Form>

                  <div className='px-28 py-5'>
                    
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

          <div className="w-full md:w-1/2
                          ">
            <Image
              src="/images/fondo2.JPG"
              alt=""
              width={768}
              height={768}
              className="box-border rounded-tl-2xl rounded-bl-2xl"
            />
          </div>

        </div>
      
    );
}

export default LoginView;