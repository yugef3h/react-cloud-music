<template>
    <div>
        <button type="button" class="back-top" @click="backTop()" v-show="backTopShow"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                backTopShow:false
            }
        },
        components: {},
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            backTop() {
                let back = setInterval(() => {
                    if(document.body.scrollTop||document.documentElement.scrollTop){
                        document.body.scrollTop-=100;
                        document.documentElement.scrollTop-=100;
                    }else {
                        clearInterval(back)
                    }
                });
            },
            handleScroll(){
                if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
                    this.backTopShow=true;
                }
                else {
                    this.backTopShow=false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
  .back-top {
      position: fixed;
      right: 30px;
      bottom: 60px;

      cursor: pointer;
      border: 1px solid #F0F2F5;
      background: #fff;
      border-radius: 3px;
      padding: 4px 10px 8px;
      opacity: 0.5;
      outline:none;
      i {
          display: block;
/*            transform: rotate(-90deg);*/
          font-size: 24px;
          color: #32475f;
      }
  }
  .back-top:hover {
    opacity: 1;
  }

</style>