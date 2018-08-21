<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'个人详情'" :isback="true"></Header>
    <div class="juniorInfo">
      <ul class="infoList">
        <li class="info-item">
          <span class="fl">级别</span>
          <span class="fr" v-if="juniorInfoData.sign_id==='1'">介绍人</span>
          <span class="fr" v-if="juniorInfoData.sign_id==='2'">金牌</span>
          <span class="fr" v-if="juniorInfoData.sign_id==='3'">银牌</span>
          <span class="fr" v-if="juniorInfoData.sign_id==='4'">代理</span>
        </li>
        <li class="info-item">
          <span class="fl">手机号</span>
          <span class="fr">{{ juniorInfoData.account_phone }}</span>
        </li>
        <li class="info-item">
          <span class="fl">代理ID</span>
          <span class="fr">{{ juniorInfoData.agent_id }}</span>
        </li>
        <li class="info-item">
          <span class="fl">姓名</span>
          <span class="fr">{{ juniorInfoData.name }}</span>
        </li>
        <li class="info-item">
          <span class="fl">用户ID</span>
          <span class="fr">{{ juniorInfoData.user_id }}</span>
        </li>
        <li class="info-item">
          <span class="fl">昵称</span>
          <span class="fr">{{ juniorInfoData.nickname }}</span>
        </li>
        <li class="info-item">
          <span class="fl">加入时间</span>
          <span class="fr">{{ juniorInfoData.entry_time }}</span>
        </li>
      </ul>
      <ul class="infoList mt">
        <li class="info-item">
          <span class="fl left">金币数：</span>
          <span class="fl right">{{ juniorInfoData.money }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">消耗数：</span>
          <span class="fl right">{{ juniorInfoData.usemoney }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">总用户数：</span>
          <span class="fl right">{{ juniorInfoData.usecount }}</span>
        </li>
      </ul>
      <div class="botbtns">
        <button class="btn frozenBtn" v-if="juniorInfoData.status==='2'" @click="updateAgent('5')">冻结</button>
        <button class="btn brokenBtn" v-if="juniorInfoData.status==='5'" @click="updateAgent('2')">解除冻结</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'JuniorDetA',
  components: {
    Loading,
    Header
  },
  data () {
    return {
      loading: true,
      session: '',
      crm_id: '',
      juniorId: '',
      juniorInfoData: {
        agent_id: '',
        sign_id: '',
        account_phone: '',
        entry_time: '',
        status: '',
        user_id: '',
        name: '',
        nickname: '',
        regtime: '',
        money: '',
        usemoney: '',
        usecount: ''
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
    this.juniorId = this.$route.params.id
    this.getJuniorDet()
  },
  mounted () {
  },
  methods: {
    getJuniorDet (type) {
      let self = this
      self.$api.get(
        'LowerLevel/myAgentInfo',
        {
          session: self.session,
          crm_id: self.crm_id,
          myagent_id: self.juniorId
        },
        r => {
          // console.log(r)
          self.juniorInfoData = r.data
          self.loading = false
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
    },
    updateAgent (type) {
      let self = this
      let layermsg = ''
      if (type === '5') {
        layermsg = '是否确认冻结此代理账户？'
      } else if (type === '2') {
        layermsg = '是否解除冻结此代理账户？'
      }
      self.$layer.open({
        className: 'frozenTip',
        content: layermsg,
        btn: ['确认', '取消'],
        yes: function (index) {
          self.$api.get(
            'CrmInfo/updateAgent',
            {
              session: self.session,
              crm_id: self.crm_id,
              myagent_id: self.juniorId,
              type: type
            },
            r => {
              // console.log(r)
              self.$layer.close(index)
              location.reload()
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
        }
      })
    }
  }
}
</script>

<style scoped>
/* 下级详情 */
.juniorInfo .infoList{
  background: #fff;
  padding: .1rem .3rem
}
.juniorInfo .info-item{
  width: 100%;
  overflow: hidden;
  padding: .2rem 0;
  font-size: .26rem;
  color: #898989;
  line-height: 100%;
}
.juniorInfo .mt{
  margin-top: .2rem;
}
.juniorInfo .info-item .left{
  width: 50%;
  text-align: right;
}
.juniorInfo .botbtns{
  padding-top: .3rem;
  text-align: center;
}
.juniorInfo .botbtns .btn{
  width: 2rem;
  height: .8rem;
  border-radius: 3px;
  font-size: .28rem;
}
.juniorInfo .botbtns .frozenBtn{
  border: 1px solid #3693DF;
  color: #3693DF;
  background: none;
}
.juniorInfo .botbtns .brokenBtn{
  background: #2FA38C;
  color: #fff;
}
</style>
