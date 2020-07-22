import axios from 'axios';

import Vue from 'vue'

//url地址
const server = {
  dev: '/local',
  test: '',
  stage: '',
  prod: '',
  dev_lurenjia: '',
}

//创建axios实例(子类)
const Axios = axios.create({
  baseURL: server.dev,
  methods: 'post',
  headers: {}
})

//返回拦截器
//创建一个提示消息的Vue实例
let msg = new Vue()
Axios.interceptors.response.use(res => {
  var sOption = [401, 404]
  /* if (res.data.status === 0) {
    //router.replace('/login')
    if (sOption[res.status]) {
      msg.$message.error('请求失败')
    } else {
      return res
    }
  } else {
    msg.$message.error('请求失败')
  } */
  return res
}, err => {
  msg.$message.error('服务器错误')
})

export default Axios