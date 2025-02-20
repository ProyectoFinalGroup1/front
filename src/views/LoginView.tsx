"use client";
import { validateLoginForm } from '@/helpers/validate';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginView = () => {
    return (
        <div>
        <h1>Iniciar Sesión</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validateLoginForm}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Submit exitoso")
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
                <label>Email: </label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <label>Contraseña: </label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
}

export default LoginView;