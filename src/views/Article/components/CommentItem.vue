<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformat }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('replay-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <!-- 如果大于0就显示数量,没有数量就显示赞 -->
    <van-loading v-if="isLoading" />
    <van-icon
      v-else
      slot="right-icon"
      :name="item.is_liking ? 'like' : 'like-o'"
      :color="item.is_liking ? 'red' : ''"
      @click="onClick"
      >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
    >
  </van-cell>
</template>

<script>
import { delLike, addLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.item.is_liking) {
        // 取消对评论或评论回复点赞
        try {
          await delLike(this.item.com_id)
          this.item.like_count--
        } catch (error) {
          console.log(error)
        }
      } else {
        // 对评论或评论回复点赞
        try {
          await addLike(this.item.com_id)
          this.item.like_count++
        } catch (error) {
          console.log(error)
        }
      }
      this.item.is_liking = !this.item.is_liking
      this.isLoading = false
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
