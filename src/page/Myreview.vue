<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'我的审核'" :isback="true"></Header>
    <div class="rev-list">
      <ul>
        <li class="rev-item">
          <div class="fl">
            <p>2018-6-08</p>
            <p>哎哟不错哦</p>
          </div>
          <div class="fl">
            <p>业务员推荐该玩家成为金牌代理</p>
          </div>
          <div class="fl">
            <span>同意</span>
            <span>取消</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'Myreview',
  components: {
    Loading,
    Header
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      searchVal: ''
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
    // this.getJuniorData()
  },
  mounted () {
  },
  methods: {
    getJuniorData () {
      let self = this
      self.$api.get(
        'AgentInfo/agentInfo',
        {
          session: self.session,
          crm_id: self.crm_id
        },
        r => {
          console.log(r)
          self.loading = false
        },
        e => {
          console.log(e)
          self.loading = false
          self.$layer.open({
            content: e.msg,
            skin: 'msg',
            time: 2
          })
          self.$router.push({name: 'Login'})
        }
      )
    }
  }
}
</script>

<style scoped>
/* 我的审核 */
</style>
