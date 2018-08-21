<template>
  <div>
    <Header :titleTxt="'忘记密码'" :isback="true"></Header>
    <div class="maxWidth logincont">
      <p class="tip">*请通过短信验证重置密码。</p>
      <p class="tip">*重新修改后，请妥善保管自己的账号密码。</p>
      <div class="loginFrom">
        <div class="login-item">
          <span class="lab">手机号：</span>
          <input class="iptbox" type="text" placeholder="请输入登录手机号" v-model="phoNum">
        </div>
        <div class="login-item item-getvcode">
          <span class="lab">验证码：</span>
          <input class="iptbox ipt-vcode" type="text" placeholder="请输入验证码" v-model="vCode">
          <button type="button" class="btn-getvcode" :class="{disabled:getCode_disabled}" v-bind:disabled="getCode_disabled" @click="getCode">{{ getCode_btnval }}</button>
        </div>
        <div class="login-item">
          <span class="lab">新密码：</span>
          <input class="iptbox" type="password" placeholder="请输入新密码" v-model="newPwd">
        </div>
        <div class="login-item">
          <span class="lab">确认新密码：</span>
          <input class="iptbox" type="password" placeholder="请再次输入新密码" v-model="newPwd_confirm" @keyup.enter="forgetPwdSub">
        </div>
        <div class="loginbtn">
          <button class="btn-sub" type="button" @click="forgetPwdSub">确 定</button>
        </div>
      </div>
    </div>
    <Loading v-if="loading"></Loading>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
export default {
  name: 'ForgetPwd',
  components: {
    Header,
    Loading
  },
  data () {
    return {
      loading: false,
      phoNum: '',
      vCode: '',
      newPwd: '',
      newPwd_confirm: '',
      getCode_btnval: '获取验证码',
      getCode_disabled: false
    }
  },
  mounted () {
    document.getElementsByTagName('body')[0].className = 'loginbg'
  },
  methods: {
    // 获取短信验证码
    getCode () {
      let self = this
      if (!self.phoNum) {
        self.$layer.open({
          content: '请输入登录的手机号',
          skin: 'msg',
          time: 2
        })
        return
      }
      if (!/^(13|14|15|17|18)[0-9]{9}$/.test(self.phoNum)) {
        self.$layer.open({
          content: '请输入正确的手机号',
          skin: 'msg',
          time: 2
        })
        return
      }
      self.getCode_disabled = true
      let seconds = 60
      let timer = setInterval(function () {
        seconds--
        self.getCode_btnval = seconds + '秒后获取'
        if (seconds <= 0) {
          clearInterval(timer)
          self.getCode_btnval = '获取验证码'
          self.getCode_disabled = false
        }
      }, 1000)
      self.$api.get(
        'Login/sendCode',
        {
          account_phone: self.phoNum
        },
        r => {
          // console.log(r)
          self.$layer.open({
            content: r.msg,
            skin: 'msg',
            time: 2
          })
        },
        e => {
          // console.log(e)
          clearInterval(timer)
          self.getCode_btnval = '获取验证码'
          self.getCode_disabled = false
          self.$layer.open({
            content: e.msg,
            skin: 'msg',
            time: 2
          })
        }
      )
    },
    forgetPwdSub () {
      var self = this
      if (!self.phoNum) {
        self.$layer.open({
          content: '请输入登录手机号',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (!/^1\d{10}$/.test(self.phoNum)) {
        self.$layer.open({
          content: '请输入正确的手机号',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (!self.vCode) {
        self.$layer.open({
          content: '请输入验证码',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (!self.newPwd) {
        self.$layer.open({
          content: '请输入新密码',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (self.newPwd.length < 8) {
        self.$layer.open({
          content: '请输入至少8位字符的密码',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (!self.newPwd_confirm) {
        self.$layer.open({
          content: '请再次输入新密码',
          skin: 'msg',
          time: 2
        })
        return false
      }
      if (self.newPwd_confirm !== self.newPwd) {
        self.$layer.open({
          content: '请输入相同的新密码',
          skin: 'msg',
          time: 2
        })
        return false
      }
      self.loading = true
      self.$api.post(
        'Login/forgetPw',
        {
          account_phone: self.phoNum,
          code: self.vCode,
          pwd: self.newPwd
        },
        r => {
          // console.log(r)
          self.loading = false
          self.$layer.open({
            content: r.msg,
            skin: 'msg',
            time: 2
          })
          this.$router.push({name: 'Login'})
        },
        e => {
          // console.log(e)
          self.loading = false
          self.$layer.open({
            content: e.msg,
            skin: 'msg',
            time: 2
          })
        }
      )
    }
  }
}
</script>

<style scoped>
/* 忘记密码 */
.logincont{
  padding-top: .2rem;
}
.tip{
  padding-left: .3rem;
  color: #fd6060;
  font-size: .24rem;
}
.loginFrom {
  width: 5.68rem;
  margin: 0 auto;
  margin-top: .2rem;
}
.loginFrom .login-item {
  padding-top: .24rem;
}
.loginFrom .lab {
  display: block;
  font-size: .34rem;
  color: #999;
  padding-left: .08rem;
}
.loginFrom .iptbox {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: .88rem;
  border: 1px solid #DCDDDD;
  color: #333;
  font-size: .3rem;
  border-radius: .08rem;
  padding: 0 .3rem;
  margin-top: .08rem;
}
.loginFrom .ipt-vcode{
  padding-right: 2.4rem;
}
.item-getvcode{
  position: relative;
}
.item-getvcode .btn-getvcode{
  width: 1.76rem;
  height: .66rem;
  border-radius: 3px;
  background: #2EA087;
  color: #fff;
  display: block;
  position: absolute;
  right: .12rem;
  top: .92rem;
  font-size: .26rem;
}
.item-getvcode .btn-getvcode.disabled{
    background: #ccc;
}
.loginFrom .loginbtn{
  margin-top: .5rem;
}
.loginFrom .btn-sub {
  display: block;
  width: 100%;
  height: .88rem;
  line-height: .88rem;
  text-align: center;
  border-radius: .08rem;
  color: #fff;
  font-size: .4rem;
  background: #3693DF;
}
</style>
