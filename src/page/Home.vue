<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt=" homeTit + 'CRM系统' "></Header>
    <div class="clearfix dateSelect" @click="openByDialog1">
      <i class="fl ico-date"></i>
      <span class="fl text-date">{{ calendar1.display }}</span>
      <i class="fr ico-select"></i>
    </div>
    <div class="count newAdd">
      <ul class="dataList">
        <li class="clearfix dataItem">
          <span class="fl txtR lab">金牌代理新增：</span>
          <span class="fl">{{ homeData.a_count_new }}</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">银牌代理新增：</span>
          <span class="fl">{{ homeData.b_count_new }}</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">代理新增：</span>
          <span class="fl">{{ homeData.agent_count_new }}</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">用户新增：</span>
          <span class="fl">{{ homeData.user_count_new }}</span>
        </li>
        <li class="clearfix dataItem">
          <span class="fl txtR lab">贡献服务费：</span>
          <span class="fl">{{ homeData.fee_count_new }}</span>
        </li>
      </ul>
    </div>
    <div class="total">
      <ul class="data-tab">
        <li class="tab-item">
          <span class="lab">总金牌代理：</span>
          <span class="num">{{ homeData.a_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">总银牌代理：</span>
          <span class="num">{{ homeData.b_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">总代理：</span>
          <span class="num">{{ homeData.agent_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">总用户：</span>
          <span class="num">{{ homeData.user_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">总服务费：</span>
          <span class="num">{{ homeData.fee_count_total }}</span>
        </li>
        <!-- <li class="tab-item">
          <span class="lab">总充值：</span>
          <span class="num">{{ homeData.recharge }}</span>
        </li> -->
      </ul>
    </div>
    <div class="total" v-if="homeData.have_team === 1">
      <ul class="data-tab">
        <li class="tab-item">
          <span class="lab">团队总金牌代理：</span>
          <span class="num">{{ homeData.team_a_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">团队总银牌代理：</span>
          <span class="num">{{ homeData.team_b_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">团队总代理：</span>
          <span class="num">{{ homeData.team_agent_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">团队总用户：</span>
          <span class="num">{{ homeData.team_user_count_total }}</span>
        </li>
        <li class="tab-item">
          <span class="lab">团队总服务费：</span>
          <span class="num">{{ homeData.team_fee_count_total }}</span>
        </li>
        <!-- <li class="tab-item">
          <span class="lab">总充值：</span>
          <span class="num">{{ homeData.recharge }}</span>
        </li> -->
      </ul>
    </div>
    <Footer></Footer>
    <div class="dialog-mask" @click="closeByDialog1" v-if="calendar1.show"></div>
    <transition name="dialogAnim">
      <div class="dialog-body" v-if="calendar1.show">
        <div class="calendar-dialog">
          <calendar :range="calendar1.range" :zero="calendar1.zero" :lunar="calendar1.lunar" :value="calendar1.value" :end="calendar1.end"  @select="calendar1.select"></calendar>
        </div>
      </div>
    </transition>
    <div class="dialog-mask" @click="closeByDialog2" v-if="calendar2.show"></div>
    <transition name="dialogAnim">
      <div class="dialog-body" v-if="calendar2.show">
        <div class="calendar-dialog">
          <calendar :range="calendar2.range" :zero="calendar2.zero" :lunar="calendar2.lunar" :value="calendar2.value"  @select="calendar2.select"></calendar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
import Footer from '../components/footer'
import calendar from '../components/calendar'
export default {
  name: 'Home',
  components: {
    Loading,
    Header,
    Footer,
    calendar
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      homeTit: '',
      homeData: {
      },
      arr_curDate: [],
      calendar1: {
        display: '',
        show: false,
        zero: true,
        value: [], // 默认日期
        end: [],
        select: (value) => {
          this.calendar1.show = false
          this.calendar1.value = value
          this.calendar1.display = value.join('-')
          this.loading = true
          this.getHomeData()
        }
      },
      calendar2: {
        display: '',
        show: false,
        zero: true,
        value: [], // 默认日期
        select: (value) => {
          this.calendar2.show = false
          this.calendar2.value = value
          this.calendar2.display = value.join('-')
        }
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
    let date = new Date()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    this.calendar1.value = [date.getFullYear(), month, strDate]
    this.calendar1.end = [date.getFullYear(), month, strDate]
    this.calendar2.value = [date.getFullYear(), month, strDate]
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentdate = date.getFullYear() + '-' + month + '-' + strDate
    this.calendar1.display = '今日（' + currentdate + '）'
    this.calendar2.display = '今日（' + currentdate + '）'
    this.getHomeData()
  },
  mounted () {
    document.body.removeAttribute('class', 'loginbg')
  },
  methods: {
    openByDialog1 () {
      this.calendar1.show = true
    },
    closeByDialog1 () {
      this.calendar1.show = false
    },
    openByDialog2 () {
      this.calendar2.show = true
    },
    closeByDialog2 () {
      this.calendar2.show = false
    },
    getHomeData () {
      let self = this
      self.$api.get(
        'CrmInfo/crmInfo',
        {
          session: self.session,
          crm_id: self.crm_id,
          date_day: self.sel_date1
        },
        r => {
          // console.log(r)
          self.homeTit = r.data.system_name
          self.homeData = r.data
          self.$utils.set('crm_name', r.data.name)
          self.$utils.set('crm_entry_time', r.data.entry_time)
          this.loading = false
        },
        e => {
          // console.log(e)
          this.loading = false
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
body{
  background-color: #9b9b9b;
}
/* 业绩 */
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
  color: #666;
}
.ico-select{
  width: .28rem;
  height: .28rem;
  background-image: url(../assets/icon-down.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: .26rem;
}
.count{
  background: #fff;
  color: #666;
}
.newAdd{
  color: #fff;
  background-image: linear-gradient(-140deg, #2AA5F1 8%, #2790FF 100%);
}
.count .dataList{
  padding-top: .24rem;
  padding-bottom: .4rem;
}
.count .dataItem{
  padding-top: .16rem;
  font-size: .3rem;
  line-height: .4rem;
}
.count .dataItem .lab{
  width: 4.4rem;
  padding-right: .1rem;
}
.total{
  margin-top: .2rem;
  background: #fff;
  margin-bottom: .2rem;
}
.data-tab{
  width: 100%;
  overflow: hidden;
}
.tab-item{
  float: left;
  width: 50%;
  border-right: 1px solid #DCDDDD;
  border-bottom: 1px solid #DCDDDD;
  height: .88rem;
  line-height: .88rem;
  margin-right: -1px;
  margin-bottom: -1px;
  overflow: hidden;
}
.tab-item .lab{
  font-size: .26rem;
  padding-left: .2rem;
  color: #999;
}
.tab-item .num{
  font-size: .3rem;
  color: #333
}
/*弹出框*/
.calendar-dialog{
  padding: .2rem;
}
</style>
