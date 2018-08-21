<template>
  <header class="head-wrap">
    <div class="headfix">
      <div class="ageHead">
        <div class="txtC" :class="{ icotit : self_isback }">
          <i class="ico-goback" v-show="self_isback" @click="goBack"></i>
          <span>{{ self_titleTxt }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isback: {
      type: Boolean,
      default: false
    },
    titleTxt: {
      type: String,
      default: 'CRM系统'
    }
  },
  data () {
    return {
      self_isback: this.isback,
      self_titleTxt: this.titleTxt
    }
  },
  watch: {
    titleTxt (newValue, oldValue) {
      this.self_titleTxt = newValue
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 头部 */
.head-wrap{
  padding-top: .84rem;
}
.headfix {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
.ageHead {
  max-width: 750px;
  margin: 0 auto;
  overflow: hidden;
  height: .84rem;
  color: #2B3038;
  line-height: .84rem;
  font-size: .32rem;
  background: #fff;
  border-bottom: 1px solid #B2B2B2;
  box-sizing: border-box;
}

.icotit{
  position: relative;
}

.icotit .ico-goback{
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: .84rem;
  height: .84rem;
  background-image: url(../assets/icon-left.png);
  background-repeat: no-repeat;
  background-size: .28rem .28rem;
  background-position: center;
}
</style>
