<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'已邀玩家'" :isback="true"></Header>
    <div class="playerList">
      <ul>
        <li class="player-item" v-for="item in playerList" :key="item.userid">
          <div class="fl">
            <p class="name">{{ item.nickname }}</p>
            <p class="inv-date">邀请时间： {{ item.stattime }}</p>
          </div>
          <div class="fr">
            <router-link class="checkDet" :to="'/juniorDet_u/' + item.userid">查看详情</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header.vue'
export default {
  name: 'InvitedPlayers',
  components: {
    Loading,
    Header
  },
  data () {
    return {
      loading: true,
      session: '',
      crm_id: '',
      page: 1,
      playerList: [],
      nodata: false
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
    this.getPlayerList()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getPlayerList () {
      let self = this
      self.$api.get(
        'Invite/UserWeekList',
        {
          session: self.session,
          crm_id: self.crm_id,
          p: self.page
        },
        r => {
          // console.log(r)
          self.loading = false
          for (let i = 0; i < r.data.length; i++) {
            self.playerList.push(r.data[i])
          }
          if (r.data === 10) {
            self.errmsg = '上拉加载更多数据'
          } else {
            self.flag = false
            self.dataTip = true
            self.tipmsg = '暂无更多数据'
          }
        },
        e => {
          // console.log(e)
          self.loading = false
          self.flag = false
          self.dataTip = false
          self.errmsg = ''
          self.$layer.open({
            content: e.msg,
            skin: 'msg',
            time: 2
          })
          if (e.msg === '登录消息已过期') {
            self.$router.push({name: 'Login'})
          }
        }
      )
    },
    handleScroll () {
      let h1 = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop
      let h2 = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight
      let h3 = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight
      if ((h1 + h2) >= h3 && this.flag) {
        this.loading = true
        this.page++
        this.getPlayerList()
      }
    }
  }
}
</script>

<style scoped>
/* 已邀玩家 */
.playerList{
  background: #fff;
  padding-left: .3rem;
}
.playerList .player-item{
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  height: 1.2rem;
}
.playerList .player-item:last-child{
  border: 0;
}
.playerList .player-item .name{
  font-size: .3rem;
  padding-top: .2rem;
  width: 3rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.playerList .player-item .inv-date{
  font-size: .24rem;
  color: #898989;
}
.playerList .player-item .checkDet{
  padding: .1rem .2rem;
  border: 1px solid #3693DF;
  color: #3693DF;
  font-size: .26rem;
  border-radius: 3px;
  display: inline-block;
  margin-top: .3rem;
  margin-right: .2rem;
}
</style>
