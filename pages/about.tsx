import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import User from '../interface/user'
import { apiService } from '../shared/apiService'

const About: NextPage = () => {
  const [userDetail, setUserDetail] = useState({}as User)
  const router = useRouter()
  useEffect(() => {
    const id =  localStorage.getItem("loginId");
    if(id){
      getUserDetail(id)
    }else{
      router.replace('/')
    }
  },[])

  const getUserDetail = async (id:any) => {
  let _url = `users/${id}`;
  let _response =await apiService(_url, "GET");
  setUserDetail(_response?.data)
  }
  const onLogout = () => {
    router.replace('/')
  }
  return (
    <div className={`${styles.container} bg-blue-100 h-screen`}>
      <div className="p-20  flex justify-center">
        <div className="bg-white py-6 px-2 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h3 className="text-blue-300 mb-4 text-sm font-bold">
            My Profile
          </h3>
          <h3 className="text-red-500 mb-4 text-sm font-bold cursor-pointer" onClick={onLogout}>
            Log out
          </h3>
        </div>
          <img src={'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'}/>
          <p className="text-xl font-bold mb-2 text-gray-800">{(userDetail?.email) && 'Email : '+userDetail?.email}</p>
          <p className="text-gray-700">{(userDetail?.dob) && 'Date of Birth : '+ userDetail?.dob}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
