import http from '@/utils/http'

//! 获取我的频道
export const getMyChannels = () => {
  return http({
    url: 'user/channels'
  })
}
//! 获取文章列表
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return http({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}
//! 获取所有的列表
export const getAllArticleList = () => {
  return http({
    url: 'channels'
  })
}

//! 频道数据持久化
export const saveChannels = (channels) => {
  return http({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
