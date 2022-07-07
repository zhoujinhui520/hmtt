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
//! 获取用户的个人资料
export const getUserInfo = () => {
  return http({
    url: 'user'

  })
}

//! 获取个人信息
export const getUserProfile = () => {
  return http({
    url: 'user/profile'
  })
}

/**
  *
  * @param {更改用户信息} profile
  * @returns
  */
export const updateUserProfile = profile => {
  return http({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
  *
  * @param {更改头像信息} data
  * @returns
  */
export const updateAvatar = data => {
  return http({
    method: 'PATCH',
    url: 'user/photo',
    data
  })
}
