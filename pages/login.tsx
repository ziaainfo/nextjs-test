import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/signup.module.css'
import axios from 'axios'
import Link from 'next/link'
import { useNavigate } from "react-router-dom";
const bcrypt = require('bcryptjs'); 

const Login: NextPage = () => {
    let navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    password: '',
    dob:''
  })

  const handleChange = (e, name) => {

    setSignupInfo({...signupInfo,[name]: e.target.value})

  }
  const handleSubmit = async() => {
    let obj=signupInfo
    obj={
      ...obj,
    //   password:await bcrypt.hash(obj.password, 4)
    }
    axios({
      method: 'GET',
      url: 'http://localhost:8000/posts',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        let _userInfo = response.data
        _userInfo.map(async (data) => {
            if(obj.email === data.email){
                let match = await bcrypt.compare(obj.password, data.password)
                if(match){
                    console.log("data.pass ==", data)
                    localStorage.setItem("loginId",data.id );
                    navigate(`/about`)
                }
            }
        })
    })
    .catch(error => {})

  }
  return (
    <div className={`${styles.container} `}>
    <div className={`container-fluid ${styles.backgroundClass}`}>
        <div className={`${styles.mainContainer} `}>
            <div className={`${styles.login} shadow shadow-blue-500/40`} >
                
                <div class="text-center mb-16">
                    <p class="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                        LOGIN
                    </p>
                    <h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Get In <span class="text-indigo-600">Touch</span>
                    </h3>
                </div>

                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Email Address
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                type="email" onChange={(e) => handleChange(e,'email')} placeholder="********@*****.**"/>
                </div>
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                type="password" onChange={(e) => handleChange(e,'password')} placeholder="**********"/>
                </div>

                <button class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded my-10" onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Login
