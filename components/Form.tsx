import { useEffect, useState } from "react";
import styles from "../styles/signup.module.scss";
import Input from "./Input";
import { useRouter } from 'next/router'
import { handleToastMessage } from "../shared/handleToastMesssage";
import { ToastContainer } from 'react-nextjs-toast'
const Form = ({
  formTitle,
  formFields,
  handleFormSubmit,
  submitButtonTitle,
}:any) => {
  const router = useRouter()
  const [formFieldsData, setFormFieldsData] = useState({});
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(()=>{
    if(formFieldsData.cpassword || formFieldsData.newpassword){
      handleMatch()
    }
  },[formFieldsData.cpassword, formFieldsData.newpassword])

  const handleChange = (e:any, name:any) => {
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    let _email = e.target.value
    if(name === 'email'){
      if(_email.match(pattern)){
        setIsValidEmail(true) 
      }else{
        setIsValidEmail(false)
      }
    }
    setFormFieldsData({ ...formFieldsData, [name]: _email });
  };
  const handleMatch = () => {
    const {newpassword,cpassword } = formFieldsData
      if(newpassword !== cpassword){
        setIsPasswordMatch(true)
      }else{
        setIsPasswordMatch(false)
      }
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(isValidEmail){
      handleFormSubmit?.(formFieldsData);
      e.target.reset();
    }else{
      handleToastMessage('error','invalid email')
    }
  };
  const forgetPassword = () => {
    router.replace('/forgetPassword')
  }
  const loginSignup = () => {
    router.pathname ==="/" ? router.replace('/signup') : router.replace('/')
  }
  return (
    <div
      className={`${styles.login} shadow shadow-blue-500/40 sx:w-4/5 md:w-96 `}
    >
      <ToastContainer position={"top"}  />
      <div className="text-center mb-10 mt-8">
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          <span className="text-indigo-600">{formTitle}</span>
        </h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`${styles.login}  sx:w-4/5 md:w-96 `}
      >
        {formFields.map((inputField:any) => {
          return (
            <div className="w-full px-3">
              <Input
                isRequired={inputField.isRequired}
                type={inputField.type}
                label={inputField.label}
                handleChange={handleChange}
                fieldName={inputField.fieldName}
                placeholder={inputField.placeholder}
                isPasswordMatch={isPasswordMatch}
              />
            </div>
          );
        })}
        <button
          disabled={isPasswordMatch}
          className={`shadow ${isPasswordMatch ? 'bg-indigo-400': 'bg-indigo-600'} hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded mt-10 mb-4`}
          type={"submit"}
        >
          {submitButtonTitle}
        </button>
      </form>
      <div className="flex justify-between md:w-96 mb-10">
        <p className="text-indigo-700 hover:text-pink-700 text-sm float-right cursor-pointer" onClick={loginSignup}>{router.pathname ==="/" ? `Create Account` :`Login Account` }</p>
        <p className={`text-indigo-700 hover:text-pink-700 text-sm float-left cursor-pointer ${submitButtonTitle === 'Reset' ? 'hidden' : 'block'}`} onClick={forgetPassword}>Forgot Password?</p>
      </div>
    </div>
  );
};

export default Form;
