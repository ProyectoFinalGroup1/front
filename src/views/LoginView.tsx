"use client";
import { validateLoginForm } from '@/helpers/validate';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';

const LoginView = () => {
    return (
      <div className="flex flex-row ">
        <div>
          <h1>Iniciar Sesión</h1>
          <p>Ingrese sus datos para acceder</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validateLoginForm}
            onSubmit={(values, { setSubmitting }) => {
              console.log("Submit exitoso");
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>

                  <div>
                    <div>Email: </div>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                  </div>

                  <div>
                    <div>Contraseña: </div>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                  
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <Image
          src='/images/Login.png'
          alt=''
          width={300}
          height={300}
          className="box-border"
          />
        </div>
      </div>
    );
}

export default LoginView;