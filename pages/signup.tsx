import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/signup.module.css'
import axios from 'axios'
import { apiService } from '../shared/apiService'
import { useRouter } from 'next/router'
import User from '../interface/user'
import Form from '../components/Form'
import { toast, ToastContainer } from 'react-nextjs-toast'
const bcrypt = require('bcryptjs'); 

const signUpFormField = [
  {
    type: "text",
    label: "Email address",
    fieldName: "email",
    placeholder: "********@*****.**",
    isRequired: true,
  },
  {
    type: "password",
    label: "Password",
    fieldName: "password",
    placeholder: "********",
    isRequired: true,
  },
  {
    type: "date",
    label: "Date of birth",
    fieldName: "dob",
    placeholder: "mm/dd/yy",
    isRequired: true,
  },
];

const Signup: NextPage =  () => {
  const router = useRouter()
  const handleSubmit = async (signupInfo: any) => {
    let obj = signupInfo as User;
    let _url = "signup";
    obj = {
      ...obj,
      // password: await bcrypt.hash(obj.password, 4),
    };
    let _response =await apiService(_url, "POST", obj);
    if(_response.status){
      let _id = _response?.data?.user?.id
      let _token = _response?.data?.accessToken
      localStorage.setItem("loginId",_id );
      localStorage.setItem("token",_token );
      router.replace('/about')
    }

  }
  return (
    <div className={`${styles.container} `}>
      <ToastContainer position={"top"} />
      <div className={`container-fluid ${styles.backgroundClass}`}>
        <div className={`${styles.mainContainer} `}>
          {/* Pass singup form fields */}
          <Form
            formTitle="SIGNUP"
            formFields={signUpFormField}
            handleFormSubmit={handleSubmit}
            submitButtonTitle={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
