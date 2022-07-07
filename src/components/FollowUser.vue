<template>
  <van-button
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { delUser, addUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false// 点击关注节流的变量
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true//! 点击关注节流打开
      // 如果当前关注,调用取消接口
      if (this.value) {
        try {
          await delUser(this.target)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (error) {
          console.log(error)
        }
      }
      this.isAjax = false//! 点击关注节流关闭
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
