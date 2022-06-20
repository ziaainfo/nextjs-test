import axios from "axios";
import environment from "../environment";
import { handleToastMessage } from "./handleToastMesssage";
// handle for HTTPs call
export const apiService = async (
  url,
  method = "POST",
  data,
  isNavigate = true,
  isShowErrorMessage = true,
  contentType = "application/json"
) => {
  const _headers = {
    "Content-Type": contentType,
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  };

  let _response = {
    status: false,
    data,
  };
  await axios(environment.serverUrl + url, {
    method: method,
    data: data,
    headers: _headers,
  })
    .then((response) => {
      _response.data = response.data;
      _response.status = true;
    })
    .catch((error) => {
      let _error = error?.response?.data
      if (isShowErrorMessage) {
        handleToastMessage("error", _error);
      }
      _response.status = false;
      if (error.response.status === 401 && isNavigate) {
        window.location.replace("/");
        localStorage.clear();
      }
    });

  return _response;
};
