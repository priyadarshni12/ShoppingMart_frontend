import React, { useState, useEffect } from 'react';
import SignUp from '../SignUp/SignUp';
import axios from 'axios';
import Dashboard from '../Dashboard/Dashboard';
import { decrypt } from '../Utils/passwordUtils'
import './SignIn.scss';

export interface SignInProps {
  products: Product[];
  SignInSuccessful: CallableFunction
}

const defaultFieldData: fieldData = {
  value: '',
  error: ''
};

let validEmails: UserData[] = [];

const SignIn: React.FC<SignInProps> = ({ products, SignInSuccessful }) => {
  const [signUp, setSignUp] = useState(false);

  const [email, setEmail] = useState<fieldData>(defaultFieldData);
  const [password, setPassword] = useState<fieldData>(defaultFieldData);

  const signInButtonClick = (event: any): void => {
    event.preventDefault();
    if (validate()) {
      SignInSuccessful();
    }
  }

  const updateEmail = (event: any): void => {
    const emailObj = email;
    emailObj.value = event.target.value;
    if (emailObj.error) {
      emailObj.error = '';
    }
    setEmail({ ...emailObj });
  }
  const updatePassword = (event: any): void => {
    const passwordObj = password;
    passwordObj.value = event.target.value;
    if (passwordObj.error) {
      passwordObj.error = '';
    }
    setPassword({ ...passwordObj });
  }

  const validate = (): boolean => {
    const emailObj = email;
    const passwordObj = password;
    validEmails.filter(user => {
      return user.email === emailObj.value
    });
    if (emailObj.value === '') {
      emailObj.error = '*Enter Email';
    }
    else if (!validEmails.filter(user => user.email === emailObj.value).length) {
      emailObj.error = '*Email not registered';
    }
    else {
      emailObj.error = '';
    }

    setEmail({ ...emailObj });

    if (passwordObj.value === '') {
      passwordObj.error = '*Enter Password';
    }
    else {
      const userData = validEmails.filter(user => user.email === emailObj.value);
      if (userData.length && !decrypt(passwordObj.value, userData[0].password || '')) {
        passwordObj.error = "*Password incorrect";
      }
      else {
        passwordObj.error = '';
      }
    }

    setPassword({ ...passwordObj });

    if (!emailObj.error && !passwordObj.error) {
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    axios.get('/User/getValidEmails/true')
      .then(res => {
        validEmails = res.data;
      })
      .catch(err => console.log(err))
  });

  const signUpSuccessful= (): void => {
    setSignUp(false);
  }
  if (signUp) {
    return (
      <SignUp signUpSuccessful = {signUpSuccessful}/>
    );
  }
  else {
    return (
      <div className='container'>
        <div className='text-center'>

        </div>
        <div className='page_container'>
          <div className='sign_in_container'>
            <h4 >
              Sign-In
            </h4>
            <form>
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
              <br />
              <div className='form-group'>
                <button
                  className='btn btn-primary btn-sm'
                  style={{ width: '100%' }}
                  onClick={signInButtonClick}
                >
                  Sign-In
                </button>
              </div>
            </form>
          </div>
          <div className='sign_up_link_container'>
            <button
              className='btn btn-link'
              onClick={() => setSignUp(true)}
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SignIn;
