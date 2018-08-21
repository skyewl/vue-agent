<template>
  <div>
    <Header :titleTxt="'密码修改'" :isback="true"></Header>
    <div class="maxWidth logincont">
      <div class="loginFrom">
        <div class="login-item">
          <span class="lab">旧密码：</span>
          <input class="iptbox" type="password" placeholder="请输入旧密码" v-model="oldPwd">
        </div>
        <div class="login-item">
          <span class="lab">新密码：</span>
          <input class="iptbox" type="password" placeholder="请输入新密码" v-model="newPwd">
        </div>
        <div class="login-item">
          <span class="lab">确认新密码：</span>
          <input class="iptbox" type="password" placeholder="请再次输入新密码" v-model="newPwd_confirm" @keyup.enter="resetPwdSub">
        </div>
        <div class="loginbtn">
          <button class="btn-sub" type="button" @click="resetPwdSub">确 定</button>
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
  name: 'ResetPwd',
  components: {
    Header,
    Loading
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      oldPwd: '',
      newPwd: '',
      newPwd_confirm: ''
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
  },
  mounted () {
    document.getElementsByTagName('body')[0].className = 'loginbg'
  },
  methods: {
    resetPwdSub () {
      var self = this
      if (!self.oldPwd) {
        self.$layer.open({
          content: '请输入旧密码',
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
      if (self.oldPwd === self.newPwd) {
        self.$layer.open({
          content: '新密码须不同于旧密码',
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
      self.$api.get(
        'CrmInfo/changePwd',
        {
          session: self.session,
          crm_id: self.crm_id,
          old_pwd: self.oldPwd,
          new_pwd: self.newPwd
        },
        r => {
          // console.log(r)
          self.loading = false
          self.$layer.open({
            content: r.msg,
            skin: 'msg',
            time: 2
          })
          self.$router.push({name: 'Login'})
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
  padding-bottom: .06rem;
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
    vertical-align: middle;
    position: absolute;
    right: .1rem;
    top: .86rem;
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
