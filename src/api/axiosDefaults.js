import axios from "axios";

axios.defaults.baseURL = "https://connect-api-5644c52001aa.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
