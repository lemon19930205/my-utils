import Axios from './axios';

import { formData } from "../utils/index";


//登录页
export function login(userName,password) { 
  return Axios({
    url:'/login',
    data:formData({...arguments})
  })
 }