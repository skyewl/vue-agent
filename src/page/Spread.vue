<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'推广'"></Header>
    <div class="spreadCont">
      <div class="spread-box">
        <p class="inv-code">我的邀请码：{{ inviteInfoData.invitecode }}</p>
        <div class="codebox">
            <img :src="inviteInfoData.imgurl" alt="" width="100%">
        </div>
        <p class="tip">请通过长按或截图来保存二维码</p>
        <p class="link">
          <input class="ipt-link" type="text" :value="inviteInfoData.inviteurl" readonly>
        </p>
        <p class="btns">
          <button type="button" v-clipboard:copy="inviteInfoData.inviteurl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</button>
          <button type="button" @click="download">下载二维码</button>
        </p>
      </div>
      <p class="weekinv">
        <span v-if="inviteInfoData.myweekuser===0" class="noinv">本周未邀玩家</span>
        <router-link v-else class="goinv" to="/invitedPlayers">本周的已邀玩家({{ inviteInfoData.myweekuser }}) >></router-link>
      </p>
    </div>

    <Footer :isActive="'spread'"></Footer>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
export default {
  name: 'Spread',
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
      inviteInfoData: {
        invitecode: '',
        imgurl: '',
        inviteurl: '',
        myweekuser: ''
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
    this.getSpreadData()
  },
  methods: {
    getSpreadData () {
      let self = this
      self.$api.get(
        'Invite/inviteInfo',
        {
          session: self.session,
          crm_id: self.crm_id
        },
        r => {
          // console.log(r)
          self.inviteInfoData = r.data
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
    onCopy (e) {
      this.$layer.open({
        content: '复制链接成功！',
        skin: 'msg',
        time: 2
      })
    },
    onError (e) {
      this.$layer.open({
        content: '无法复制链接，请通过二维码分享',
        skin: 'msg',
        time: 2
      })
    },
    download () {
      var url = this.inviteInfoData.imgurl
      var a = document.createElement('a')
      var event = new MouseEvent('click')
      a.download = '推广二维码'
      a.href = url
      a.dispatchEvent(event)
    }
  }
}
</script>

<style scoped>
/* 推广 */
.spreadCont{
  padding: .3rem;
}
.spread-box{
  width: 100%;
  height: 7.2rem;
  background: #fff;
  text-align: center;
  color: #464646;
}
.spread-box .inv-code{
  padding: .32rem 0;
  font-size: .3rem;
}
.spread-box .codebox{
  width: 4rem;
  height: 4rem;
  margin: 0 auto;
}
.spread-box .tip{
  font-size: .24rem;
  padding-top: .2rem;
}
.spread-box .link{
  padding: .1rem .56rem;
}
.spread-box .link .ipt-link{
  font-size: .24rem;
  color: #3693DF;;
  width: 100%;
  overflow: hidden;
  text-align: center;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.spread-box .btns{
  padding-top: .2rem;
}
.spread-box .btns button{
  display: inline-block;
  margin: 0 .2rem;
  padding: 0 .2rem;
  height: .5rem;
  line-height: .5rem;
  background: #3693DF;;
  font-size: .24rem;
  border-radius: 3px;
  color: #fff;
}
.weekinv{
  margin-top: .4rem;
  text-align: center;
  font-size: .28rem;
  color: #595959;
}
.weekinv .goinv{
  color: #595959;
}
.weekinv .noinv{
  color: #898989;
}
</style>
