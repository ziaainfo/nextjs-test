const Input = ({
  type = "text",
  placeholder,
  handleChange,
  fieldName,
  label,
  isRequired = false,
  isPasswordMatch = false
}: any) => {
  const handleInputChange = (e, name) => {
    handleChange?.(e, name);
  };

  return (
    <>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="grid-password"
      >
        {label}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${(fieldName === 'cpassword' && isPasswordMatch) ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 `}
        type={type}
        // required={isRequired}
        onChange={(e) => handleInputChange(e, fieldName)}
        placeholder={placeholder}
      />
      {(fieldName === 'cpassword' && isPasswordMatch) && <span className={`text-red-600 text-xs relative bottom-4 `}>Password not match</span>}
    </>
  );
};
export default Input;
