<template>
  <div>
    <Loading v-if="loading"></Loading>
    <Header :titleTxt="'我的下级'"></Header>
    <div class="junior-navtabs clearfix">
      <ul>
        <li class="tabitem">
          <span class="tabnav" @click="getJuniorList('s')" :class="{ tabnavCur: isActive === 's' }" >
            介绍人
            <em class="num" v-if="isActive === 's'">({{allCount}})</em>
          </span>
        </li>
        <li class="tabitem">
          <span class="tabnav" @click="getJuniorList('a')" :class="{ tabnavCur: isActive === 'a' }" >
            金牌
            <em class="num" v-if="isActive === 'a'">({{allCount}})</em>
          </span>
        </li>
        <li class="tabitem">
          <span class="tabnav" @click="getJuniorList('b')" :class="{ tabnavCur: isActive === 'b' }">
            银牌
            <em class="num" v-if="isActive === 'b'">({{allCount}})</em>
          </span>
        </li>
        <li class="tabitem">
          <span class="tabnav" @click="getJuniorList('c')" :class="{ tabnavCur: isActive === 'c' }">
            代理
            <em class="num" v-if="isActive === 'c'">({{allCount}})</em>
          </span>
        </li>
        <li class="tabitem">
          <span class="tabnav" @click="getJuniorList('d')" :class="{ tabnavCur: isActive === 'd' }">
            用户
            <em class="num" v-if="isActive === 'd'">({{allCount}})</em>
          </span>
        </li>
      </ul>
    </div>
    <div class="clearfix junior-queryBox">
      <div class="searchBox">
        <i class="ico-search"></i>
        <input class="ipt" type="text" placeholder="输入下级代理名称或手机号" v-model="searchVal">
      </div>
      <button class="btn query-btn" @click="fn_search()">查询</button>
      <button class="btn reset-btn" onclick="location.reload()">重置</button>
    </div>
    <div class="junior-list">
      <p class="clearfix labs">
        <span class="fl item">昵称</span>
        <span class="fl item">服务费</span>
        <span class="fl item" v-if="isActive !== 'd'">用户</span>
        <span class="fl item" v-else>加入时间</span>
      </p>
      <ul>
        <li class="clearfix junior-item" v-for="item in juniorList" :key="item.agent_id">
          <div class="fl item name">{{ item.name }}</div>
          <div class="fl item">{{ item.money }}</div>
          <div class="fl item" v-if="isActive !== 'd'">{{ item.usercount }}</div>
          <div class="fl item" v-else>{{ item.statday }}</div>
          <div class="fl item" v-if="isActive !== 'd'">
            <router-link class="checkDet" :to="'/juniorDet_a/'+ item.agent_id">查看详情</router-link>
          </div>
          <div class="fl item" v-else>
            <router-link class="checkDet" :to="'/juniorDet_u/' + item.userid">查看详情</router-link>
          </div>
        </li>
      </ul>
      <p class="datatip" v-if="tipmsg !== ''">{{ tipmsg }}</p>
    </div>
    <Footer :isActive="'junior'"></Footer>
  </div>
</template>

<script>
import Loading from '../components/loading'
import Header from '../components/header'
import Footer from '../components/footer'
export default {
  name: 'Junior',
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
      isActive: 's',
      allCount: 0,
      page: 1,
      searchVal: '',
      juniorList: [],
      tipmsg: '',
      flag: true
    }
  },
  created () {
    this.session = this.$utils.get('crm_session')
    this.crm_id = this.$utils.get('crm_id')
    if (!this.session) {
      this.$router.push({name: 'Login'})
      return false
    }
    this.getJuniorList(this.isActive)
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    fn_search () {
      if (this.searchVal !== '') {
        this.getJuniorList(this.isActive)
      } else {
        this.$layer.open({
          content: '请输入查询内容！',
          skin: 'msg',
          time: 2
        })
      }
    },
    getJuniorList (type) {
      let self = this
      self.loading = true
      self.isActive = type
      self.allCount = ''
      self.page = 1
      self.$api.get(
        'LowerLevel/MyUserList',
        {
          session: self.session,
          crm_id: self.crm_id,
          p: self.page,
          type: self.isActive,
          search: self.searchVal
        },
        r => {
          // console.log(r)
          self.allCount = r.data.allCount
          self.juniorList = r.data.user_list
          if (self.juniorList.length > 0) {
            if (self.juniorList.length === 10) {
              self.tipmsg = '上拉加载更多数据'
              self.flag = true
            } else {
              self.tipmsg = ''
              self.flag = false
            }
          } else {
            self.tipmsg = '暂无数据'
            self.flag = false
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
            self.$router.push({name: 'Login'})
          }
        }
      )
    },
    getMoreJunior () {
      var self = this
      self.$api.get(
        'LowerLevel/MyUserList',
        {
          session: self.session,
          crm_id: self.crm_id,
          p: self.page,
          type: self.isActive,
          search: self.searchVal
        },
        r => {
          // console.log(r)
          self.loading = false
          if (r.data.user_list.length > 0) {
            for (let i = 0; i < r.data.user_list.length; i++) {
              self.juniorList.push(r.data.user_list[i])
            }
            if (r.data.user_list.length === 10) {
              self.tipmsg = '上拉加载更多数据'
            } else {
              self.tipmsg = '暂无更多数据'
              self.flag = false
            }
          } else {
            self.tipmsg = '暂无更多数据'
            self.flag = false
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
    // 判断滚动到底部
    handleScroll () {
      let h1 = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop
      let h2 = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight
      let h3 = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight
      if ((h1 + h2) >= h3 && this.flag) {
        this.loading = true
        this.page++
        this.getMoreJunior()
      }
    }
  }
}
</script>

<style scoped>
/* 我的下级 */
.junior-navtabs{
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #DCDDDD;
}
.junior-navtabs .tabitem{
  float: left;
  width: 20%;
  height: .84rem;
  text-align: center;
  display: table;
}
.junior-navtabs .tabitem .tabnav{
  height: .83rem;
  font-size: .3rem;
  color: #595959;
  box-sizing: border-box;
  display: table-cell;
  vertical-align: middle;
}
.junior-navtabs .tabitem .tabnavCur{
  border-bottom: .02rem solid #3693DF;
  color: #3693DF;
}
.junior-navtabs .tabitem .num{
  font-size: .2rem;
}
.junior-queryBox{
  background: #fff;
  padding: .2rem .3rem;
}
.searchBox{
  height: .6rem;
  line-height: .6rem;
  width: 4.4rem;
  border: 1px solid #DCDDDD;
  border-radius: 3px;
  display: inline-block;
  vertical-align: middle;
}
.searchBox .ico-search{
  width: .28rem;
  height: .28rem;
  display: inline-block;
  background-image: url(../assets/icon-search.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: .16rem;
  vertical-align: middle;
}
.searchBox .ipt{
  font-size: .26rem;
}
.junior-queryBox .btn{
  width: .96rem;
  height: .52rem;
  vertical-align: middle;
  margin-left: .15rem;
  border-radius: 3px;
  font-size: .24rem;
  border: 1px solid #3693DF;
}
.junior-queryBox .query-btn{
  background: #3693DF;
  color: #fff;
}
.junior-queryBox .reset-btn{
  background: #fff;
  color: #3693DF;
}

.junior-list{
  margin-top: .2rem;
  background: #fff;
}
.junior-list .labs{
  height: .8rem;
  line-height: .8rem;
  border-bottom: 1px solid #D3D8DC;
  font-size: .3rem;
}
.junior-list .labs .item{
  width: 25%;
  color: #666;
  text-align: center;
}
.junior-list .junior-item{
  border-bottom: 1px solid #D3D8DC;
  padding: .3rem 0;
}
.junior-list .junior-item .item{
  width: 25%;
  overflow: hidden;
  padding: 0 .1rem;
  box-sizing: border-box;
  color: #333;
  font-size: .26rem;
  text-align: center;
  line-height: .5rem;
}
.junior-list .junior-item .name{
  overflow: hidden;
  text-align: center;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.datatip{
  font-size: .26rem;
  text-align: center;
  padding: .3rem 0;
  color: #898989;
}
.junior-list .junior-item .checkDet{
  padding: 0 .1rem;
  border: 1px solid #3693DF;
  color: #3693DF;
  height: .5rem;
  line-height: .5rem;
  font-size: .24rem;
  border-radius: 3px;
  display: inline-block;
  box-sizing: border-box;
}
</style>
