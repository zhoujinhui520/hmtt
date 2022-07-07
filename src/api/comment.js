import http from '@/utils/http'

/**
 *
 * @param type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param source 源id，文章id或评论id
 * @param offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param limit 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
 * @returns
 */
//! 获取评论列表
export const getCommentList = ({ type, source, offset, limit }) => {
  return http({
    url: 'comments',
    params: { type, source, offset, limit }
  })
}

/**
 *
 * @param {点赞的文章id} target
 * @returns
 */
//! 对评论或评论回复点赞
export const addLike = (target) => {
  return http({
    method: 'POST',
    url: 'comment/likings',
    data: { target }
  })
}

/**
 *
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
//! 取消对评论或评论回复点赞
export const delLike = (target) => {
  return http({
    method: 'DELETE',
    url: `comment/likings/${{ target }}`
  })
}

/**
 *target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 *content 评论内容
 *art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @param {*} data
 * @returns
 */
//! 对文章或者评论进行评论
export const addComment = (data) => {
  return http({
    method: 'POST',
    url: 'comments',
    data
  })
}
