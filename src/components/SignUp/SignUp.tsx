import React, { useEffect, useState } from 'react';
import SignIn from '../SignIn/SignIn';
import axios from 'axios';
import { encrypt } from '../Utils/passwordUtils';
import './SignUp.scss';

export interface SignUpProps {
  signUpSuccessful: CallableFunction
}

const defaultFieldData: fieldData = {
  value: '',
  error: ''
}

let validEmails: UserData[] = [];
const SignUp: React.FC<SignUpProps> = ({ signUpSuccessful }) => {

  const [name, setName] = useState<fieldData>(defaultFieldData);
  const [email, setEmail] = useState<fieldData>(defaultFieldData);
  const [password, setPassword] = useState<fieldData>(defaultFieldData);
  const [confirmPassword, setConfirmPassword] = useState<fieldData>(defaultFieldData);

  const signUpButtonClick = (event: any): void => {
    event.preventDefault();
    if (validate()) {
      const user = {
        name: name.value,
        email: email.value,
        password: encrypt(password.value)
      }
      axios.post('/User/addNewUser', user)
        .then(res => {
          signUpSuccessful()
        })
        .catch(err => console.log(err))
    }
  }

  const updateName = (event: any): void => {
    const nameObj = name;
    nameObj.value = event.target.value;
    if (nameObj.error) {
      nameObj.error = '';
    }
    setName({ ...nameObj });
  };

  const updateEmail = (event: any): void => {
    const emailObj = email;
    emailObj.value = event.target.value;
    if (emailObj.error) {
      emailObj.error = '';
    }
    setEmail({ ...emailObj });
  };

  const updatePassword = (event: any): void => {
    const passwordObj = password;
    passwordObj.value = event.target.value;
    if (passwordObj.error) {
      passwordObj.error = '';
    }
    setPassword({ ...passwordObj });
  };

  const updateConfirmPassword = (event: any): void => {
    const confirmPasswordObj = confirmPassword;
    confirmPasswordObj.value = event.target.value;
    if (confirmPasswordObj.error) {
      confirmPasswordObj.error = '';
    }
    setConfirmPassword({ ...confirmPasswordObj });
  };

  const validate = (): boolean => {
    const nameObj = name;
    const emailObj = email;
    const passwordObj = password;
    const confirmPasswordObj = confirmPassword;

    if (nameObj.value === '') {
      nameObj.error = '*Enter Name';
    }
    else {
      nameObj.error = '';
    }

    setName({ ...nameObj });

    if (emailObj.value === '') {
      emailObj.error = '*Enter Email';
    }
    else if (validEmails.filter(user => user.email === emailObj.value).length) {
      emailObj.error = '*Email alredy registered';
    }
    else {
      emailObj.error = '';
    }

    setEmail({ ...emailObj });

    if (passwordObj.value === '') {
      passwordObj.error = '*Enter Password';
    }
    // else if (!passwordObj.value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*(_)]).*$/)) {
    //   passwordObj.error = "*Password should contain minimum 8 letters with atleast 1 Lowercase 1 uppercase 1 number and 1 special symbol";
    // }
    else {
      passwordObj.error = '';
    }

    setPassword({ ...passwordObj });

    if (confirmPasswordObj.value === '') {
      confirmPasswordObj.error = '*Re-Enter Password';
    }
    else if (confirmPasswordObj.value !== passwordObj.value) {
      confirmPasswordObj.error = '*Password does not match';
    }
    else {
      confirmPasswordObj.error = '';
    }

    setConfirmPassword({ ...confirmPasswordObj });

    if (
      !nameObj.error
      && !emailObj.error
      && !passwordObj.error
      && !confirmPasswordObj.error
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    axios.get('/User/getValidEmails/')
      .then(res => {
        validEmails = res.data;
      })
      .catch(err => console.log(err))
  });

  // if (signIn) {
  //   return (
  //     <SignIn />
  //   );
  // }
  // else {
  return (
    <div className='container'>
      <div className='text-center'>

      </div>
      <div className='page_container'>
        <div className='sign_in_container'>
          <h4 >
            Create account
          </h4>
          <form>
            <div className='form-group'
              style={{ marginTop: 10 }}
            >
              <label>
                Name
              </label>
              <input
                id='name'
                className='form-control'
                type='text'
                onChange={updateName}
              >
              </input>
              <span
                className='help-block text-danger'>
                {name.error}
              </span>
            </div>
            <div className='form-group'
              style={{ marginTop: 10 }}
            >
              <label>
                Email
              </label>
              <input
                id='email'
                className='form-control'
                type='text'
                onChange={updateEmail}
              >
              </input>
              <span
                className='help-block text-danger'>
                {email.error}
              </span>
            </div>
            <div className='form-group'
              style={{ marginTop: 10 }}
            >
              <label>
                Password
              </label>
              <input
                id='password'
                className='form-control'
                type='password'
                onChange={updatePassword}
              >
              </input>
              <span className='help-block text-danger'>
                {password.error}
              </span>
            </div>
            <div className='form-group'
              style={{ marginTop: 10 }}
            >
              <label>
                Re-Enter Password
              </label>
              <input
                id='confirmPassword'
                className='form-control'
                type='password'
                onChange={updateConfirmPassword}
              >
              </input>
              <span className='help-block text-danger'>
                {confirmPassword.error}
              </span>
            </div>
            <br />
            <div className='form-group'>
              <button
                className='btn btn-primary btn-sm'
                style={{ width: '100%' }}
                onClick={signUpButtonClick}
              >
                Create your account
              </button>
            </div>
          </form>
        </div>
        <div className='sign_up_link_container'>
          <button
            className='btn btn-link'
            onClick={() => signUpSuccessful()}
          >
            Already have an account? Sign-In
          </button>
        </div>
      </div>
    </div>
  )
  // }
};

export default SignUp;
