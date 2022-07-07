import http from '@/utils/http'

//! 根据id获取文章
export const getArticle = (article_id) => {
  return http({
    url: `articles/${article_id}`
  })
}
//! 添加关注用户
export const addUser = (target) => {
  return http({
    method: 'POST',
    url: 'user/followings',
    data: { target }
  })
}

//! 取消关注用户
export const delUser = (target) => {
  return http({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}
//! 收藏用户文章 收藏的目标文章id
export const addCollect = (target) => {
  return http({
    method: 'POST',
    url: '/article/collections',
    data: { target }
  })
}

//! 取消收藏用户文章  收藏的目标文章id
export const delCollect = (target) => {
  return http({
    method: 'DELETE',
    url: `/article/collections/${target}`
  })
}
