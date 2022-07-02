<template>
  <div>
    <form action="/">
      <van-search
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isSearch = false"
        autofocus
      />
    </form>
    <SearchHistory v-if="searchText === ''"  @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from '../Search/components/SearchHistory.vue'
import SearchResult from '../Search/components/SearchResult.vue'
import SearchSuggest from '../Search/components/SearchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false// 默认没有回车
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)//! 搜索建议一样的去重
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearchResult, SearchSuggest }
}
</script>

<style scoped lang='less'>
</style>
