<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'我的团队'" :isback="true"></Header>
    <div class="clearfix junior-queryBox">
      <div class="searchBox">
        <i class="ico-search"></i>
        <input class="ipt" type="text" placeholder="输入团队成员名称或手机号" v-model="searchVal">
      </div>
      <button class="btn query-btn" @click="fn_search(searchVal)">查询</button>
      <button class="btn reset-btn" onclick="location.reload()">重置</button>
    </div>
    <div class="teamer-list">
      <div class="clearfix labs">
        <span class="fl item">名字</span>
        <span class="fl item">ID</span>
        <span class="fl item">绑定用户</span>
        <span class="fl item">绑定用户</span>
      </div>
      <ul>
        <li class="clearfix member-item">
          <span class="fl item name">代理名字</span>
          <span class="fl item">19990</span>
          <span class="fl item">19990</span>
          <span class="fl item">19990</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'Myteam',
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
    fn_search (val) {
      alert(val)
    },
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
/* 我的团队 */
.junior-queryBox{
  background: #fff;
  padding: .2rem .3rem;
}
.searchBox{
  height: .6rem;
  line-height: .6rem;
  width: 4.4rem;
  border: 1px solid #DCDDDD;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
}
.searchBox .ico-search{
  width: .28rem;
  height: .28rem;
  display: inline-block;
  background-image: url(../assets/icon-search.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: .16rem;
  vertical-align: middle;
}
.searchBox .ipt{
  font-size: .26rem;
}
.junior-queryBox .btn{
  width: .96rem;
  height: .52rem;
  vertical-align: middle;
  margin-left: .15rem;
  border-radius: 3px;
  font-size: .24rem;
  border: 1px solid #3693DF;
}
.junior-queryBox .query-btn{
  background: #3693DF;
  color: #fff;
}
.junior-queryBox .reset-btn{
  background: #fff;
  color: #3693DF;
}

.teamer-list{
  margin-top: .2rem;
  background: #fff;
}
.teamer-list .labs{
  height: .8rem;
  line-height: .8rem;
  border-bottom: 1px solid #D3D8DC;
  font-size: .3rem;
}
.teamer-list .labs .item{
  width: 25%;
  color: #666;
  text-align: center;
}
.teamer-list .member-item{
  border-bottom: 1px solid #D3D8DC;
  padding: .4rem 0;
}
.teamer-list .member-item .item{
  width: 25%;
  overflow: hidden;
  padding: 0 .1rem;
  box-sizing: border-box;
  color: #333;
  font-size: .26rem;
  text-align: center;
}
.teamer-list .member-item .name{
  overflow: hidden;
  text-align: center;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
