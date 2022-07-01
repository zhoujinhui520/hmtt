<template>
  <div>
    <div class="channel_container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          size="small"
          round
          type="danger"
          @click="isColseShow = !isColseShow"
          >{{ isColseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <!-- v-if="index !==0" 让推荐上的叉默认没有 -->
            <van-icon name="close" v-if="index !== 0" v-show="isColseShow" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel_container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <!--van-ellipsis 文字自动...省略  -->
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log('res', res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isColseShow: false
    }
  },
  methods: {
    add (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)// 根据id找索引
      this.channels.push(this.recommendChannels[index])// 然后根据索引添加
      this.recommendChannels.splice(index, 1)// 添加之后根据索引删除已经添加的对象
    },
    onClick (index) {
      if (this.isColseShow) {
        if (index === 0) return// 推荐选项不能删除,把它排除掉
        // 删除
        const obj = this.channels[index]// 根据索引找到对象
        this.channels.splice(index, 1)// 根据索引删除
        this.recommendChannels.push(obj)// 添加
        if (index < this.active) { //! bug 删除前面的,索引没变,
          this.$emit('del-active', this.active - 1)
        }
      } else {
        //! 切换高亮active 点谁谁亮,弹窗下也跟着亮
        this.$emit('change-active', index)// 子像父传index
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      // 登录过 把持久化放在后台服务器(用ajax)  未登录 放在本地存储
      async handler (newValue) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newValue.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNELS, newValue)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel_container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      line-height: 36px;
      color: #333333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    position: relative;
    width: 160px;
    height: 86px;
    line-height: 86px;
    text-align: center;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: normal;
    color: #222222;
    margin-left: 14px;
    margin-bottom: 22px;
  }
  .van-icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
