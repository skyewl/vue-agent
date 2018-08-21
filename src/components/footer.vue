<template>
  <footer class="footer-wrap">
    <div class="footfix">
      <nav class="ageFoot">
        <ul class="botnav">
          <li class="navitem">
            <router-link :to="{ name : 'Home' }">
              <div class="navlink" :class="{navcur: self_isActive === 'home'}">
                <i class="ico-nav ico-home"></i>
                业绩
              </div>
            </router-link>
          </li>
          <li class="navitem">
            <router-link :to="{ name : 'Junior' }">
              <div class="navlink" :class="{navcur: self_isActive === 'junior'}">
                <i class="ico-nav ico-junior"></i>
                下级
              </div>
            </router-link>
          </li>
          <li class="navitem">
            <router-link :to="{ name : 'Spread' }">
              <div class="navlink" :class="{navcur: self_isActive === 'spread'}">
                <i class="ico-nav ico-spread"></i>
                推广
              </div>
            </router-link>
          </li>
          <li class="navitem">
            <router-link :to="{ name : 'Personal' }">
              <div class="navlink" :class="{navcur: self_isActive === 'personal'}">
                <i class="ico-nav ico-personal"></i>
                我的
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    isActive: {
      type: String,
      default: 'home'
    }
  },
  data () {
    return {
      self_isActive: this.isActive
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 底部 */
.footer-wrap{
  padding-bottom: .98rem;
}
.footfix {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
.ageFoot {
  max-width: 750px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
  height: .98rem;
  border-top: 1px solid #B2B2B2;
  box-sizing: border-box;
}
.botnav{
  width: 100%;
  overflow: hidden;
}
.botnav .navitem{
  float: left;
  width: 25%;
  font-size: .22rem;
  text-align: center;
  padding-top: .06rem;
}
.botnav .navitem .navlink{
  color: #898989;
}
.botnav .navitem .ico-nav{
  display: block;
  width: .5rem;
  height: .5rem;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
}
.botnav .navitem .navcur{
  color: #3693DF;
}
.botnav .navitem .ico-home{
  background-image: url(../assets/nor-per.png);
}
.botnav .navitem .navcur .ico-home{
  background-image: url(../assets/active-per.png);
}
.botnav .navitem .ico-junior{
  background-image: url(../assets/nor-low.png);
}
.botnav .navitem .navcur .ico-junior{
  background-image: url(../assets/active-low.png);
}
.botnav .navitem .ico-spread{
  background-image: url(../assets/nor-gen.png);
}
.botnav .navitem .navcur .ico-spread{
  background-image: url(../assets/active-gen.png);
}
.botnav .navitem .ico-personal{
  background-image: url(../assets/nor-me.png);
}
.botnav .navitem .navcur .ico-personal{
  background-image: url(../assets/active-me.png);
}
</style>
