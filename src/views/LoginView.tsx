"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginView = () => {
    return (
        <div>
        <h1>Iniciar Sesión</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={}
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
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
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