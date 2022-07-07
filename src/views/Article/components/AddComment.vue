<template>
  <div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      center
      ref="field"
    >
      <template #extra>
        <van-button
          type="default"
          :disabled="message.length === 0"
          @click="onClick"
          >发布</van-button
        >
        <!-- 当输入框没有内容时,发布按钮被禁用 -->
      </template>
    </van-field>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  // dom准备好 可以找到textarea
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
button {
  border: none;
}
</style>
