<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="showInput">
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="profile.photo"
        width="0.9rem"
        height="0.9rem"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="profile.name"
      is-link
      @click="isNameShow = true"
    />
    <van-cell
      title="性别"
      :value="profile.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      :value="profile.birthday"
      is-link
      @click="isBirthdayShow = true"
    />
    <van-popup v-model="isNameShow" position="bottom" style="height: 100%">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onNameCancel"
        @click-right="onNameSave"
      />
      <van-field
        v-model="name"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
    </van-popup>
    <input
      type="file"
      style="display: none"
      accept="image/png,image/jpeg,image/gif"
      ref="file"
      @change="onChange"
    />
    <van-popup v-model="isAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar :imgSrc.sync='imgSrc' @close="isAvatarShow=false"></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfile, updateUserProfile } from '@/api/user'
export default {
  async created () {
    try {
      const res = await getUserProfile()
      // console.log(res)
      this.profile = res.data.data
      this.name = this.profile.name
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      profile: {},
      isNameShow: false,
      name: '',
      isBirthdayShow: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      birthday1: '',
      isAvatarShow: false,
      imgSrc: ''
    }
  },
  methods: {
    onNameCancel () {
      this.isNameShow = false
    },
    async onNameSave () {
      this.profile.name = this.name
      await this.save()
      this.isNameShow = false
    },
    async save () {
      try {
        const res = await updateUserProfile(this.profile)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onConfirm () {
      this.profile.birthday = this.birthday1
      this.save()
      this.isBirthdayShow = false
    },
    showInput () {
      this.$refs.file.click()
    },
    onChange () {
      const url = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(url)
      this.imgSrc = url
      // this.profile.photo = url
      this.isAvatarShow = true
    }
  },
  computed: {
    currentDate: {
      get () {
        return new Date(this.profile.birthday)
      },
      set (newVal) {
        this.birthday1 = newVal.getFullYear() + '-' + (newVal.getMonth() + 1) + '-' + newVal.getDate()
      }
    }
  },
  watch: {},
  filters: {},
  components: { UpdateAvatar }
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__text {
  color: #fff;
}
</style>
