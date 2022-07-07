<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="item in commentList"
        :key="item.com_id"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'ArticleComment',
  props: {
    type: {
      type: String,
      required: true,
      // props自定义校验函数
      validator (value) {
        return ['a', 'c'].includes(value)// 数据只能是a或者是c才能验证通过
      }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: { //! 2.把data变成props
      type: Array,
      required: true
    }
  },
  created () {
    this.getList()
  },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 5
      },
      // commentList: [],//!1.数据提升
      loading: false,
      finished: false
    }
  },
  methods: {
    async getList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res)
        // 若数据已全部加载完毕，则直接将 finished 设置成 true
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)//! 给父组件传值,count是评论的数量
        this.commentList.push(...res.data.data.results)// 保留每一页数据
        // 本次返回结果最后一个评论的id,作为请求下一页数据的offset参数,
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来,就把loading转圈效果关掉
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
