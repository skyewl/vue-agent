<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'我的信息'"></Header>
        <div class="personal-cont">
      <ul class="perlist">
        <li class="peritem item-tit">
          <i class="vertical fl"></i>
          基本信息
        </li>
        <li class="peritem">
          <span class="fl tag">姓名：{{ perInfo.name }}</span>
          <span class="fr des time">加入时间：{{ perInfo.entry_time }}</span>
        </li>
        <li class="peritem">
          <span class="fl tag">ID：</span>
          <span class="fr des">{{ crm_id }}</span>
        </li>
        <!-- <li v-if="perInfo.have_team===1" class="peritem" @click="$router.push({path: '/myteam'})">
          <span class="fl tag">我的团队</span>
          <i class="fr arr"></i>
        </li> -->
        <li v-if="perInfo.have_team===1" class="peritem" @click="$router.push({path: '/teamMgt'})">
          <span class="fl tag">团队管理</span>
          <i class="fr arr"></i>
        </li>
      </ul>
      <ul class="perlist perlist-mt">
        <!-- <li class="peritem item-tit">
          <i class="vertical fl"></i>
          业务管理
        </li>
        <li class="peritem" @click="$router.push({path: '/myreview'})">
          <span class="fl tag">我的审核</span>
          <i class="fr arr"></i>
        </li>
        <li class="peritem" @click="$router.push({path: '/myassess'})">
          <span class="fl tag">我的考核</span>
          <i class="fr arr"></i>
        </li> -->
      </ul>
      <ul class="perlist perlist-mt">
        <li class="peritem item-tit">
          <i class="vertical fl"></i>
          账户设置
        </li>
        <li class="peritem" @click="$router.push({path: '/resetPwd'})">
          <span class="fl tag">密码修改</span>
          <i class="fr arr"></i>
        </li>
      </ul>
      <div class="signout" @click="signOut">退出</div>
    </div>
    <Footer :isActive="'personal'"></Footer>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  name: 'Personal',
  components: {
    Loading,
    Header,
    Footer
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      perInfo: {
        entry_time: '',
        name: '',
        have_team: 0
      }
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
    this.getPersonalInfo()
  },
  mounted () {
    document.body.removeAttribute('class', 'loginbg')
  },
  methods: {
    getPersonalInfo () {
      var self = this
      self.$api.get(
        'CrmInfo/personal',
        {
          session: self.session,
          crm_id: self.crm_id
        },
        r => {
          // console.log(r)
          self.perInfo = r.data
        },
        e => {
          // console.log(e)
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
    signOut () {
      var self = this
      self.$layer.open({
        className: 'layer-logout',
        title: '注意',
        content: '你确定要退出吗？',
        btn: ['暂时不退出了', '朕要退朝'],
        no: function (index) {
          self.$api.get(
            'Login/logout',
            {},
            r => {
              // console.log(r)
              self.$utils.remove('crm_session')
              self.$utils.remove('crm_id')
              self.$utils.remove('crm_name')
              self.$utils.remove('crm_entry_time')
              self.$layer.open({
                content: r.msg,
                skin: 'msg',
                time: 2
              })
              self.$router.push({name: 'Login'})
            },
            e => {
              // console.log(e)
              self.$layer.open({
                content: e.msg,
                skin: 'msg',
                time: 2
              })
            }
          )
        }
      })
    }
  }
}
</script>

<style scoped>
/* 个人中心 */
.personal-cont{
  color: #333;
}
.perlist{
  padding-left: .3rem;
  background: #fff;
  font-size: .3rem;
}
.perlist .peritem{
  border-bottom: 1px solid #DCDDDD;
  height: .88rem;
  line-height: .88rem;
  width: 100%;
  overflow: hidden;
}
.perlist .peritem:last-child{
  border: 0;
}
.perlist .item-tit{
  font-size: .26rem;
}
.perlist .item-tit .vertical{
  width: .06rem;
  height: .32rem;
  background: #3693DF;;
  margin-top: .28rem;
  margin-right: .1rem;
}
.perlist .peritem .tag{
  padding-left: .1rem;
  font-size: .3rem;
}
.perlist .peritem .des{
  padding-right: .3rem;
}
.perlist .peritem .time{
  font-size: .26rem;
  color: #999;
}
.perlist-mt{
  margin-top: .2rem;
}
.perlist .peritem .arr{
  width: .28rem;
  height: .28rem;
  background-image: url(../assets/icon-down.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin: .32rem .3rem 0;
}
.signout{
  margin-top: .2rem;
  width: 100%;
  height: .88rem;
  background: #fff;
  text-align: center;
  line-height: .88rem;
  font-size: .3rem;
  color: #3693DF;
}
</style>
