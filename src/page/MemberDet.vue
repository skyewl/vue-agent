<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'队员详情'" :isback="true"></Header>
    <div class="juniorInfo">
      <ul class="infoList">
        <li class="info-item">
          <span class="fl">名字</span>
          <span class="fr dir">{{ juniorInfoData.name }}</span>
        </li>
        <li class="info-item">
          <span class="fl">ID</span>
          <span class="fr dir">{{ juniorInfoData.id }}</span>
        </li>
        <li class="info-item">
          <span class="fl">级别</span>
          <span class="fr dir">{{ juniorInfoData.system_name }}</span>
        </li>
        <li class="info-item">
          <span class="fl">加入时间</span>
          <span class="fr dir">{{ juniorInfoData.entry_time }}</span>
        </li>
        <li class="info-item">
          <span class="fl">开通时间</span>
          <span class="fr dir">{{ juniorInfoData.entry_day }}</span>
        </li>
      </ul>
      <div class="clearfix dateSelect">
        <span class="fl tit">按月查询：</span>
        <div class="fl">
          <vue-datepicker-local v-model="time" format="YYYY-MM" @confirm="confirm" show-buttons></vue-datepicker-local>
        </div>
      </div>
      <ul class="infoList">
        <li class="info-item">
          <span class="fl left">新增银牌代理：</span>
          <span class="fl right">{{ juniorInfoData.b_count_new }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">新增代理：</span>
          <span class="fl right">{{ juniorInfoData.agent_count_new }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">服务费：</span>
          <span class="fl right">{{ juniorInfoData.deduct_new }}</span>
        </li>
      </ul>
      <ul class="infoList">
        <li class="info-item">
          <span class="fl left">总银牌代理：</span>
          <span class="fl right">{{ juniorInfoData.b_count_total }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">总代理：</span>
          <span class="fl right">{{ juniorInfoData.agent_count_total }}</span>
        </li>
        <li class="info-item">
          <span class="fl left">总服务费：</span>
          <span class="fl right">{{ juniorInfoData.deduct_total }}</span>
        </li>
      </ul>
      <div class="botbtns">
        <button class="btn frozenBtn" v-if="juniorInfoData.status==='1'" @click="updateAgent('2')">冻结</button>
        <button class="btn brokenBtn" v-if="juniorInfoData.status==='2'" @click="updateAgent('1')">解除冻结</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
import VueDatepickerLocal from 'vue-datepicker-local'
export default {
  name: 'JuniorDetA',
  components: {
    Loading,
    Header,
    VueDatepickerLocal
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
      },
      time: new Date(),
      seaDate: ''
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
        'CrmInfo/teamCrmInfo',
        {
          session: self.session,
          crm_id: self.crm_id,
          id: self.juniorId,
          date_day: self.seaDate
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
      if (type === '2') {
        layermsg = '是否确认冻结此队员账户？'
      } else if (type === '1') {
        layermsg = '是否解除冻结此队员账户？'
      }
      self.$layer.open({
        className: 'frozenTip',
        content: layermsg,
        btn: ['确认', '取消'],
        yes: function (index) {
          self.$api.get(
            'CrmInfo/updateStatus',
            {
              session: self.session,
              crm_id: self.crm_id,
              id: self.juniorId,
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
    },
    confirm () {
      // alert(this.time)
      // alert(this.time.getFullYear() + '-' + (this.time.getMonth() + 1) + '-1')
      this.seaDate = this.time.getFullYear() + '-' + (this.time.getMonth() + 1) + '-1'
      this.loading = true
      this.getJuniorDet()
    }
  }
}
</script>

<style scoped>
/* 队员详情 */
.juniorInfo .infoList{
  background: #fff;
  padding: .1rem .3rem;
  border-bottom: 1px solid #dcdddd;
}
.juniorInfo .info-item{
  width: 100%;
  overflow: hidden;
  padding: .2rem 0;
  font-size: .26rem;
  color: #666;
  line-height: 100%;
}
.juniorInfo .info-item .dir{
  color: #333;
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
.dateSelect{
  margin-top: .2rem;
  background: #fff;
  padding: .1rem .3rem;
  border-bottom: 1px solid #dcdddd;
  font-size: .26rem;
  color: #898989;
}
.dateSelect .tit{
  line-height: 34px;
  padding-right: .2rem;
  color: #666;
}
</style>
