<template>
  <div>
    <van-nav-bar :title="title" left-arrow fixed @click-left="$emit('close')">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- 给回复进行评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
        v-if="isAddCommentShow"
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
import AddComment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 9999,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)
        this.list.push(...res.data.data.results)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

    AddComment
<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
