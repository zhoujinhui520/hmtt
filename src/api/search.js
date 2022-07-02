import http from '@/utils/http'

//! 获取搜索关键字
export const getSuggestList = (q) => {
  return http({
    url: 'suggestion',
    params: { q }
  })
}

//! 获取搜索结果列表   page是当前第几页,per_page每页数量,q是搜索关键字
// eslint-disable-next-line camelcase
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return http({
    url: 'search',
    params: { page, per_page, q }
  })
}
