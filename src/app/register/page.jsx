"use client";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
})

const Register = () => {
    const router = useRouter();
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    role: 'user',
                    remember: true,
                    skills: [],
                    avatar: null
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    console.log(values);
                    Cookies.set('user', JSON.stringify(values));
                    router.push('/');
                }}
            >
                {({ errors, touched, values }) => (
                    <Form className='flex flex-col items-center gap-5'>
                        <Field name='email' className="h-10 border" />
                        <ErrorMessage name="email" />
                        <Field className="h-10 border" name="username"
                        />
                        {errors.name && touched.username ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <ErrorMessage name="username" />
                        <Field className="h-10 border" name="password" type="password" />
                        <Field component="select" name="role">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Field>
                        <Field component="select" name="skills" multiple={true}>
                            <option value="react">React</option>
                            <option value="angular">Angular</option>
                            <option value="vue">Vue</option>
                        </Field>
                        {values.skills.length}
                        <Field type="checkbox" name="remember" />
                        {values.avatar ? 'Dosya seçildi' : <Field type="file" name="avatar" />}
                        <button disabled={!values.remember} className='py-3 px-5 rounded-lg bg-black text-white' type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register