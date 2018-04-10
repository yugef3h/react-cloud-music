<template>
    <div>
        <button type="button" class="back-top" @click="backTop()" :class="{active: bTopShow}"><i class="fa fa-angle-up" aria-hidden="true"></i></button>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              bTopShow:false
            }
        },
        components: {},
        mounted() {
          let _this = this
          window.addEventListener('scroll', function(){
            this.scrollY > 300 ? _this.bTopShow = true : _this.bTopShow = false
          })
          //window.addEventListener('scroll', this.handleScroll)
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
            /*handleScroll(){
                if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
                    this.bTopShow=true;
                }
                else {
                    this.bTopShow=false;
                }
            }*/
        }
    }
</script>
<style lang="scss" scoped>
  .back-top {
    position: fixed;
    right: -100px;
    bottom: 60px;
    transition: .7s;
    cursor: pointer;
    border: 1px solid #F0F2F5;
    background: #fff;
    border-radius: 3px;
    padding: 4px 10px 8px;
    opacity: 0.5;
    outline: none;
    &.active {
      right: 30px;
    }
    i {
      display: block;
      /*            transform: rotate(-90deg);*/
      font-size: 24px;
      color: #32475f;
    }
  }

  .back-top:hover {
    opacity: 1;
    background: #fff;
  }

</style>