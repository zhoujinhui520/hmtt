<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 列表 -->
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      closeable
      :style="{ height: '98%', paddingTop: '1rem' }"
      close-icon-position="top-left"
    >
      <ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-active="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
import ArticleList from '@/components/ArticleList.vue'
import ChannelPanel from '@/views/Home/components/ChannelPanel.vue'
import { getItem } from '@/utils/storage.js'
const CHANNELS = 'CHANNELS'
export default {
  name: 'home',
  created () {
    this.getChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false // 弹出层变量
    }
  },
  methods: {
    // 三种情况/1.没有登录第一次安装好app,第一次打开的时候只能去ajax中拿You,
    // 2,没有登录，但是第二次打开，有可能频道被用编辑或删除过，这样的话，本地/存储就有值，从本地存储拿
    // 3.登录过直接从ajax拿
    async getChannels () {
      //! 匹配的是未登录,本地存储中没有频道数据的情况
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          console.log('res', res)
          this.channels = res.data.data.channels
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);

  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset; //!unset 把原本设置的属性去掉
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px; //!设置宽度无效,可以用最小宽度min-width
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px; //!fixed布局没有宽度,要加个宽度,才能显示全部
  position: fixed;
  top: 92px;
  z-index: 1; //!等级不够高,被盖住了,加这个
  border-bottom: 1px solid #edeff3;
}

/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
