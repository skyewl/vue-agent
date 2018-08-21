<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'个人详情'" :isback="true"></Header>
    <div class="juniorInfo">
      <ul class="infoList">
        <li class="info-item">
          <span class="fl">级别</span>
          <span class="fr">用户</span>
        </li>
        <li class="info-item">
          <span class="fl">用户ID</span>
          <span class="fr">{{ juniorInfoData.userid }}</span>
        </li>
        <li class="info-item">
          <span class="fl">昵称</span>
          <span class="fr">{{ juniorInfoData.nickname }}</span>
        </li>
        <li class="info-item">
          <span class="fl">加入时间</span>
          <span class="fr">{{ juniorInfoData.regtime }}</span>
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
      </ul>
      <div class="botbtns">
        <button class="btn authBtn" @click="openAuthPop('2')">授权为金牌</button>
        <button class="btn authBtn" @click="openAuthPop('3')">授权为银牌</button>
        <button class="btn authBtn" @click="openAuthPop('4')">授权为代理</button>
      </div>
    </div>
    <div class="dialog-mask" v-if="popShow" @click="colseAuthPop()"></div>
    <transition name="dialogAnim">
      <div class="dialog-body openBox-content" v-if="popShow">
        <h3 class="poptit">填写用户信息</h3>
        <div class="popitem">
          <label for="sign_name">
            <span class="lab">姓名：</span>
            <input id="sign_name" class="ipt" type="text" placeholder="请输入用户真实姓名" v-model="signName">
          </label>
        </div>
        <div class="popitem">
          <label for="sign_phonenum">
            <span class="lab">手机号码：</span>
            <input id="sign_phonenum" class="ipt" type="tel" placeholder="请输入用户手机号" v-model="signPhone" maxlength="11">
          </label>
        </div>
        <div class="openBox-btn">
          <span class="popbtn" @click="colseAuthPop()">
            取消
          </span>
          <span class="popbtn popbtn-sub" @click="authUser()">
            确认
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'JuniorDetU',
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
        userid: '',
        usemoney: '',
        money: '',
        nickname: '',
        regtime: ''
      },
      popShow: false,
      authCode: '',
      signName: '',
      signPhone: ''
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({ name: 'Login' })
      return false
    }
    this.juniorId = this.$route.params.id
    this.getJuniorDet()
  },
  mounted () {},
  methods: {
    getJuniorDet (type) {
      let self = this
      self.$api.get(
        'UserInfo/userInfo',
        {
          session: self.session,
          crm_id: self.crm_id,
          user_id: self.juniorId
        },
        r => {
          // console.log(r)
          if (r.data) {
            self.juniorInfoData = r.data
          }
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
            self.$router.push({ name: 'Login' })
          }
        }
      )
    },
    openAuthPop (code) {
      this.popShow = !this.popShow
      this.authCode = code
    },
    colseAuthPop () {
      this.popShow = !this.popShow
      this.authCode = ''
      this.signName = ''
      this.signPhone = ''
    },
    authUser () {
      let self = this
      if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,}$/.test(self.signName)) {
        self.$layer.open({
          content: '请输入正确的姓名',
          skin: 'msg',
          time: 2
        })
        return
      }
      if (!/^1\d{10}$/.test(self.signPhone)) {
        self.$layer.open({
          content: '请输入正确的手机号',
          skin: 'msg',
          time: 2
        })
        return
      }
      self.$api.get(
        'CrmInfo/addAgent',
        {
          session: self.session,
          crm_id: self.crm_id,
          user_id: self.juniorId,
          set_sign_id: self.authCode,
          account_phone: self.signPhone,
          name: self.signName
        },
        r => {
          // console.log(r)
          self.$layer.open({
            content: r.msg,
            skin: 'msg',
            time: 2,
            end: function () {
              self.$router.go(-1)
            }
          })
        },
        e => {
          // console.log(e)
          self.$layer.open({
            content: e.msg,
            skin: 'msg',
            time: 2
          })
          if (e.msg === '登录消息已过期') {
            self.$router.push({ name: 'Login' })
          }
        }
      )
    }
  }
}
</script>

<style scoped>
/* 下级详情 */
.juniorInfo .infoList {
  background: #fff;
  padding: 0.1rem 0.3rem;
}
.juniorInfo .info-item {
  width: 100%;
  overflow: hidden;
  padding: 0.2rem 0;
  font-size: 0.26rem;
  color: #898989;
  line-height: 100%;
}
.juniorInfo .mt {
  margin-top: 0.2rem;
}
.juniorInfo .info-item .left {
  width: 50%;
  text-align: right;
}
.juniorInfo .botbtns {
  padding-top: 0.3rem;
  text-align: center;
}
.juniorInfo .botbtns .btn {
  width: 2rem;
  height: 0.8rem;
  border-radius: 3px;
  font-size: 0.28rem;
}
.juniorInfo .botbtns .authBtn {
  width: 2rem;
  background: #3693df;
  color: #fff;
  margin: 0.1rem;
}
/* 弹出层 */
.openBox-content {
  top: 30%;
}
.poptit {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  border-bottom: 1px solid #bbb;
}
.popitem {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.28rem;
  border-bottom: 1px solid #bbb;
}
.openBox-content .popitem-text {
  height: 1.8rem;
}
.openBox-content .lab {
  padding-left: 0.2rem;
  width: 1.8rem;
  display: inline-block;
}
.openBox-content .ipt {
  background: none;
  width: 4rem;
  font-size: 0.28rem;
  height: 0.28rem;
  padding: 0.28rem 0.12rem;
}
.openBox-content .ipt-text {
  height: 1.8rem;
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  resize: none;
  line-height: 0.4rem;
}
.openBox-btn {
  width: 100%;
  overflow: hidden;
}
.openBox-btn .popbtn {
  float: left;
  width: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.32rem;
  color: #999;
}
.openBox-btn .popbtn-sub {
  border-left: 1px solid #bbb;
  color: #157efb;
}
</style>
