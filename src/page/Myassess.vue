<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'我的考核'" :isback="true"></Header>
    <div class="clearfix dateSelect">
      <i class="fl ico-date"></i>
      <span class="fl text-date">6月贡献服务费</span>
    </div>
    <div class="newAdded teamAdd">
      <ul class="dataList">
        <li class="clearfix dataItem">
          <span class="fl txtR lab">金牌代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">银牌代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">用户：</span>
          <span class="fl">999</span>
        </li>
      </ul>
    </div>
    <div class="clearfix dateSelect mt">
      <i class="fl ico-date"></i>
      <span class="fl text-date">6月贡献服务费</span>
    </div>
    <div class="newAdded teamAdd">
      <ul class="dataList">
        <li class="clearfix dataItem">
          <span class="fl txtR lab">金牌代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">银牌代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">代理：</span>
          <span class="fl">999</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">本月新增用户：</span>
          <span class="fl">999</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'Myassess',
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
/* 我的考核 */
.dateSelect{
  padding: 0 .3rem;
  height: .72rem;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.ico-date{
  width: .4rem;
  height: .4rem;
  background-image: url(../assets/icon-time.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: .16rem;
}
.text-date{
  padding-left: .16rem;
  line-height: .72rem;
  font-size: .26rem;
  color: #3693DF;
}
.newAdded{
  background: #fff;
  color: #666;
}
.newAdded .dataList{
  padding-top: .24rem;
  padding-bottom: .4rem;
}
.newAdded .dataItem{
  padding-top: .16rem;
  font-size: .3rem;
  line-height: .4rem;
}
.newAdded .dataItem .lab{
  width: 4rem;
  padding-right: .1rem;
}
.mt{
  margin-top: .2rem;
}
</style>
