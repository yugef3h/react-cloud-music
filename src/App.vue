<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      //document.addEventListener('visibilitychange', this.changeTitle, false)
    },
    methods: {
      changeTitle () {            // 切换标签页后，改变title
        if (document.hidden) {
          document.title = '去吧，皮卡丘！'
        } else {
          document.title = '欢迎回来'
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

