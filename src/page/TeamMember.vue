<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'团队成员'" :isback="true"></Header>
    <!-- <div class="topbtns">
      <button type="button" class="btn" @click="openAddPop">添加成员</button>
    </div> -->
    <div class="teamer-list">
      <div class="clearfix labs">
        <span class="fl item">姓名</span>
        <span class="fl item">电话</span>
        <span class="fl item">级别</span>
      </div>
      <ul>
        <li class="clearfix member-item" v-for="item in memlist" :key="item.crm_id">
          <span class="fl item name">{{ item.name }}</span>
          <span class="fl item">{{ item.account_phone }}</span>
          <span class="fl item">{{ item.system_name }}</span>
          <router-link class="fl item checkDet" :to=" '/memberDet/'+ item.crm_id ">查看详情</router-link>
        </li>
      </ul>
      <div class="nodata" v-show="nodata">暂无团队成员</div>
    </div>
    <!-- 添加人员弹出层 -->
    <div class="dialog-mask" v-if="popShow" @click="colseAddPop"></div>
    <transition name="dialogAnim">
      <div class="dialog-body openBox-content" v-if="popShow">
        <h3 class="poptit">填写成员信息</h3>
        <div class="popitem">
          <label for="sign_name">
            <span class="lab">姓名：</span>
            <input id="sign_name" class="ipt" type="text" placeholder="请输入用户真实姓名" v-model="addInfo.name">
          </label>
        </div>
        <div class="popitem">
          <label for="sign_name">
            <span class="lab">ID：</span>
            <input id="sign_name" class="ipt" type="text" placeholder="请输入ID" v-model="addInfo.id">
          </label>
        </div>
        <div class="popitem">
          <label for="sign_phonenum">
            <span class="lab">手机号码：</span>
            <input id="sign_phonenum" class="ipt" type="tel" placeholder="请输入用户手机号" v-model="addInfo.phoNum" maxlength="11">
          </label>
        </div>
        <div class="openBox-btn">
          <span class="popbtn" @click="colseAddPop">
            取消
          </span>
          <span class="popbtn popbtn-sub" @click="addMember">
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
  name: 'MemberDet',
  components: {
    Loading,
    Header
  },
  data () {
    return {
      loading: false,
      session: '',
      crm_id: '',
      memlist: [],
      nodata: false,
      popShow: false,
      addInfo: {
        name: '',
        id: '',
        phoNum: ''
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
    this.juniorId = this
    this.getMemlist()
  },
  mounted () {
  },
  methods: {
    getMemlist () {
      let self = this
      self.$api.get(
        'CrmInfo/teamCrmList',
        {
          session: self.session,
          crm_id: self.crm_id,
          id: self.$route.params.id,
          department_id: self.$route.params.department_id
        },
        r => {
          // console.log(r)
          if (r.data) {
            self.memlist = r.data
          } else {
            self.nodata = true
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
          if (e.msg === '登录消息已过期') {
            self.$router.push({name: 'Login'})
          }
        }
      )
    },
    openAddPop () {
      this.popShow = !this.popShow
    },
    colseAddPop () {
      this.popShow = !this.popShow
      this.authCode = ''
      this.signName = ''
      this.signPhone = ''
    },
    addMember () {
      let self = this
      if (!/^[\u4E00-\u9FA5]{2,}$/.test(self.signName)) {
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
        'CrmInfo/',
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
            self.$router.push({name: 'Login'})
          }
        }
      )
    }
  }
}
</script>

<style scoped>
/* 团队成员 */
.teamer-list{
  background: #fff;
}
.teamer-list .labs{
  height: .8rem;
  line-height: .8rem;
  border-bottom: 1px solid #D3D8DC;
  font-size: .3rem;
}
.teamer-list .labs .item{
  width: 25%;
  color: #666;
  text-align: center;
}
.teamer-list .member-item{
  border-bottom: 1px solid #D3D8DC;
  padding: .4rem 0;
}
.teamer-list .member-item .item{
  width: 25%;
  overflow: hidden;
  padding: 0 .1rem;
  box-sizing: border-box;
  color: #333;
  font-size: .28rem;
  text-align: center;
}
.teamer-list .member-item .name{
  overflow: hidden;
  text-align: center;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.teamer-list .member-item .checkDet{
  color: #3693DF;
}
.topbtns{
  padding: .3rem;
}
.topbtns .btn{
  width: 1.5rem;
  font-size: .26rem;
  padding: .12rem 0;
  text-align: center;
  color: #fff;
  background: #3693DF;
  border-radius: 3px;
}
/* 弹出层 */
.openBox-content {
  top: 25%;
}
.poptit {
  height: 1rem;
  line-height: 1rem;
  font-size: .3rem;
  text-align: center;
  border-bottom:1px solid #bbb;
}
.popitem {
  height: 1rem;
  line-height: 1rem;
  font-size: .28rem;
  border-bottom:1px solid #bbb;
}
.openBox-content .popitem-text{
  height: 1.8rem;
}
.openBox-content .lab{
  padding-left: .3rem;
  width: 1.5rem;
  display: inline-block;
}
.openBox-content .ipt{
  background: none;
  width: 4rem;
  font-size: .28rem;
  height: .28rem;
  padding: .28rem .12rem;
}
.openBox-content .ipt-text{
  height: 1.8rem;
  width: 100%;
  padding: .3rem;
  box-sizing: border-box;
  resize: none;
  line-height: .4rem;
}
.openBox-btn {
  width: 100%;
  overflow: hidden;
}
.openBox-btn .popbtn{
  float: left;
  width: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .32rem;
  color: #999;
}
.openBox-btn .popbtn-sub {
  border-left: 1px solid #bbb;
  color: #157efb;
}
.nodata{
  font-size: .26rem;
  text-align: center;
  padding: .3rem 0;
  color: #898989;
}
</style>
