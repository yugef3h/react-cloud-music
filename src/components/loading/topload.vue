<template>
  <div class="loading">
    <div id="barbg">
      <div id="bar">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'topload',
    data () {
      return {
        msg: '加载中...'
      }
    },
    mounted () {
      document.onreadystatechange = function(){
        let bar = document.getElementById('bar');
        let barbg = bar.parentNode;
        let wd = document.body.scrollWidth || document.documentElement.scrollWidth;
        let t = 10;
        let d = 0;
        let i = 0;
        let timer = setInterval(goto,10);
        function goto(){
          d = d + t ;
          bar.style.width = d + 'px';
          if(d >= wd){
            clearInterval(timer);
            bar.style.background = 'rgba(230,10,10,0)';
            none();
          }
        }
        function none(){
          let a = 10 - i;
          i++;
          if(a != 0 && a != 10){a = a * 0.1}
          if(a === 10){a = 1}
          if(a === 0){a = 0}
          barbg.style.background = 'rgba(230,10,10,' + a + ')';
          if(a === 0){barbg.style.display = 'none'}
          if(a != 0){setTimeout(none,50);}
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.loading {
  z-index: 5;
}
  #barbg{height:5px; background:rgb(149,143,143)}
  #barbg div{width:0; height:5px; position:relative; background:rgb(230,10,10);}
</style>



// WEBPACK FOOTER //
// src/components/common/loading/Loading.vue