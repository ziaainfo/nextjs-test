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
    fieldName: "password",
    placeholder: "********",
    isRequired: true,
  },
];

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(()=>{
    localStorage.clear();
  },[])
   // Receive login form data object from form component
  
  const handleSubmit = async (loginFormInfo: any) => {
    let obj = loginFormInfo;
    obj = {
      ...obj,
        // password:await bcrypt.hash(obj.password, 4)
    };
    let _url = "login";

    let _response =await apiService(_url, "POST", obj);
    if(_response.status){
      if(_response.status){
        let _id = _response?.data?.user?.id
        let _token = _response?.data?.accessToken
        localStorage.setItem("loginId",_id );
        localStorage.setItem("token",_token );
        router.replace('/about')
      }
    }

  };
  return (
    <div className={`${styles.container} `}>
      <ToastContainer position={"top"}  />
      <div className={`container-fluid ${styles.backgroundClass}`}>
        <div className={`${styles.mainContainer} `}>
          <Form
            formTitle="Login"
            formFields={loginFormField}
            handleFormSubmit={handleSubmit}
            submitButtonTitle={"Login"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
