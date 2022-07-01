<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null// 定义全局的变量
let scrollTop = 0 // 定义一个位置,初始值为0
export default {
  name: 'ArticelList',
  props: {
    id: {
      type: Number,
      required: true // 从父组件home接受参数
    }

  },
  created () {
    this.getList()// 调用
  },
  mounted () { // 给有滚动条绑定滚动事件,在滚动的时候,记住最新滚动的值
    //! 记住阅读的位置.切换回来还是在阅读的地方
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop//! 把获取到的值,给一个变量,
    })
  },
  activated () {
    ele.scrollTop = scrollTop //! 页面切换回来,马上把记住的值给scrollTop
  },
  data () {
    return {
      timestamp: Date.now(), // 第一次传的时间戳
      articleList: [], // 获取列表的数据
      loading: false,
      finished: false,
      refreshing: false// 下拉刷新变量
    }
  },
  methods: {
    async getList () {
      if (this.refreshing) { // 如果有下拉的动作
        this.articleList = []// 数据清空,把请求回来的数据覆盖掉以前的数据
        this.refreshing = false// 结束下拉刷新的效果
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp// 更新时间戳
        // 数据更新完毕后，将 loading 设置成 false
        if (this.timestamp === null || this.timestamp < 0) {
          this.finished = true
        }
        // this.articeList = res.data.data.results 这样写更新的数据会覆盖以前的数据
        this.articleList.push(...res.data.data.results)// 这样写,数据不会覆盖
        // 数据已全部加载完毕，则直接将 finished 设置成 true
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.getList()//! 滑到底就去请求数据,加载更多
    },
    onRefresh () {
      // 清空列表数据,防止用户吧加载更多搞结束了
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 更新时间戳,重新开始
      this.timestamp = Date.now()
      // 重新请求数据
      this.getList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
