import http from '@/utils/http'
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
