import * as Yup from 'yup';

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

const password = Yup.string()
  .matches(
    passwordRegExr,
    'Password must contain at least 5 characters, including Upper/lower case and numbers',
  )
  .required('Please enter your password')
  .min(8, 'Password must be at least 8 characters long')
  .label('Password');

const email = Yup.string()
  .required('Please enter your email')
  .email('Email is invalid')
  .label('Email');

const name = Yup.string()
  .required('Please input your legal full name')
  .min(2, 'Name must be at least 2 digits long')
  .label('Name');

export const loginValidationSchema = Yup.object().shape({
  email,
  password,
});

export const signUpValidationSchema = Yup.object().shape({
  email,
  name,
  password,
});
