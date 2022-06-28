import http from '@/utils/http'
import store from '@/store' // 只有组件里面才有this.store,再js没有this
//! 获取短信验证码
export const getSmsCode = (mobile) => {
  return http({
    url: `/sms/codes/${mobile}`
  })
}

//! 登录
export const login = ({ mobile, code }) => {
  return http({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile, code
    }
  })
}
//! 获取用户的个人资料
export const getUserInfo = () => {
  return http({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}