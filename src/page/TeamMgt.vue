<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'团队管理'" :isback="true"></Header>
    <div class="team-list">
      <ul>
        <li class="team-item" v-for="(item, index) in teamList" :key="index">
          <router-link class="teamlink" :to="'/teamMember/'+ item[0].id + '/' + item[0].department_id">{{ item[0].name }}<i class="fr arr"></i></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'TeamMgt',
  components: {
    Loading,
    Header
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      teamList: []
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
    this.getTeamlist()
  },
  mounted () {
  },
  methods: {
    getTeamlist () {
      let self = this
      self.$api.get(
        'CrmInfo/teamSystem',
        {
          session: self.session,
          crm_id: self.crm_id
        },
        r => {
          // console.log(r)
          self.teamList = r.data
        },
        e => {
          // console.log(e)
          self.loading = false
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
    }
  }
}
</script>

<style scoped>
/* 团队管理 */
.team-list{
  background: #fff;
}
.team-list .team-item{
  border-bottom: 1px solid #D3D8DC;
  padding: .4rem 0;
  width: 100%;
  overflow: hidden;
}
.teamlink{
  padding-left: .3rem;
  font-size: .3rem;
  color: #333;
}
.teamlink .arr{
  width: .28rem;
  height: .28rem;
  background-image: url(../assets/icon-down.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin: .06rem .3rem 0;
}

</style>
