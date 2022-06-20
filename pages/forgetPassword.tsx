import type { NextPage } from "next";
import styles from "../styles/signup.module.scss";
const bcrypt = require("bcryptjs");
import { useRouter } from 'next/router'
import Form from "../components/Form";
import { handleToastMessage, removeToastMessage} from "../shared/handleToastMesssage";
import { ToastContainer } from 'react-nextjs-toast'
import { apiService } from "../shared/apiService";
import User from "../interface/user";
import { useEffect } from "react";

const loginFormField = [
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
    fieldName: "newpassword",
    placeholder: "********",
    isRequired: true,
  },
  {
    type: "password",
    label: "Confirm Password",
    fieldName: "cpassword",
    placeholder: "********",
    isRequired: true,
  },
];

const ForgetPassword: NextPage = () => {
  const router = useRouter()
  useEffect(()=>{
    localStorage.clear();
  },[])

  const handleSubmit = async (loginFormInfo: any) => {

            let url = `users/?email=${loginFormInfo?.email}`
            let _response =await apiService(url, "GET");
            let _obj = {
              ..._response.data[0],
                password:loginFormInfo.newpassword
            };

              if(_response.data.length){
                let urlId = `users/${_response?.data[0]?.id}`
                let _res =await apiService(urlId, "PUT", _obj);
                if(_res.status){
                  handleToastMessage('success','Password successfully updated')
                  // router.replace('/')
                }
              }else{
                handleToastMessage('error','User not exsist')
              }

   

  };

  return (
    <div className={`${styles.container} `}>
      <ToastContainer position={"top"}  />
      <div className={`container-fluid ${styles.backgroundClass}`}>
        <div className={`${styles.mainContainer} `}>
          <Form
            formTitle="Forget Password"
            formFields={loginFormField}
            handleFormSubmit={handleSubmit}
            submitButtonTitle={"Reset"}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
