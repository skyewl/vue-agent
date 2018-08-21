<template>
  <div>
    <Loading v-if="loading"></Loading>
    <div class="logincont">
      <div class="loginlogo"></div>
      <div class="sigma-content">
        <div class="sigma-middle-line">
          <span class="sigma-line-text">CRM代理系统</span>
        </div>
      </div>
      <div class="loginFrom">
        <div class="login-item">
          <span class="lab">账号：</span>
          <input class="iptbox user-name" type="text" placeholder="请输入登录手机号" v-model="phoNum">
        </div>
        <div class="login-item">
          <span class="lab">密码：</span>
          <input class="iptbox pwd-code" type="password" placeholder="请输入密码" v-model="logPwd" @keyup.enter="loginSub">
        </div>
        <div class="operation">
          <router-link class="f-pwd" to="/forgetPwd">忘记密码？</router-link>
        </div>
        <div class="loginbtn">
          <button class="btn-sub" type="button" @click="loginSub">登 录</button>
        </div>
      </div>
      <div class="customer-box">
          <a href="https://www.sobot.com/chat/pc/index.html?sysNum=fa11bd9830d14413bd541f3a1c3b402d" class="cus-link">
            <i class="cus-icon"></i>客服
          </a>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/loading'
export default {
  name: 'Login',
  components: {
    Loading
  },
  data () {
    return {
      loading: false,
      phoNum: '',
      logPwd: ''
    }
  },
  mounted () {
    document.getElementsByTagName('body')[0].className = 'loginbg'
  },
  methods: {
    loginSub: function () {
      var self = this
      if (!self.phoNum) {
        self.$layer.open({
          content: '请输入登录手机号',
          skin: 'msg',
          time: 2
        })
        return
      }
      if (!/^1\d{10}$/.test(self.phoNum)) {
        self.$layer.open({
          content: '请输入正确的登录手机号',
          skin: 'msg',
          time: 2
        })
        return
      }
      if (!self.logPwd) {
        self.$layer.open({
          content: '请输入密码',
          skin: 'msg',
          time: 2
        })
        return
      }
      self.loading = true
      self.$api.get(
        'Login/login',
        {
          account_phone: self.phoNum,
          password: self.logPwd
        },
        r => {
          // console.log(r)
          self.loading = false
          if (r.data.status === '1') {
            self.$utils.set('crm_session', r.data.session)
            self.$utils.set('crm_id', r.data.crm_id)
            self.$router.push({name: 'Home'})
          } else {
            self.$layer.open({
              content: r.msg,
              skin: 'msg',
              time: 2
            })
          }
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
/* 登录 */
.logincont{
  padding-top: 1rem;
}
.loginlogo {
  width: 4.32rem;
  height: 1.6rem;
  margin: 0 auto;
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.sigma-content {
  width: 5.68rem;
  margin: 0 auto;
  text-align: right;
  margin-top: .2rem;
}
.sigma-middle-line:before {
  content: '';
  display: inline-block;
  height: 1px;
  width: 12%;
  background-color: #3693DF;
  vertical-align: middle;
  margin-right: 4px;
}
.sigma-line-text {
  font-size: 0.32rem;
  color: #3693DF;
}
.loginFrom {
  width: 5.68rem;
  margin: 0 auto;
  margin-top: .4rem;
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
  margin-top: .04rem;
}
.loginFrom .operation {
  text-align: right;
  padding: .2rem 0;
}
.loginFrom .operation .f-pwd {
  font-size: 0.26rem;
  color: #3693DF;
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
.customer-box {
  margin-top: .4rem;
  text-align: center;
}
.customer-box .cus-link{
  color: #999;
  font-size: .3rem;
}
.customer-box .cus-icon {
  width: .48rem;
  height: .48rem;
  display: inline-block;
  background-image: url(../assets/icon-service.png);
  background-repeat: no-repeat;
  background-size: cover;
  vertical-align: middle;
  margin-right: .1rem;
}
</style>
