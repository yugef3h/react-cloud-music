<template>
  <div class="list-panel" @touchmove:prevent>
    <div class="list">
      <div class="list-nav">
        <i @click="hideListPanel" class="fa fa-chevron-left"></i>
        <h3>目录</h3>
      </div>
      <div class="list-content" @touchmove:prevent>
        <ul>
          <!--<li v-for="(item,index) in chapterList" @click="jumpTo(item.split('+')[1])">· {{index+1}}. {{item.split('+')[0]}}</li>-->
          <li v-for="(item,index) in chapterList" @click="jumpTo(index, item.split('+')[1])">
            · {{item.split('+')[0]}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from  'vuex'

  export default {
    data() {
      return {
        chapterList: [],
        keyn:''
      }
    },
    props: {
      bookId: {
        type:String,
        required: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      jumpTo(index,url) {
        // if (index >= 50) {
        //   index = 50
        // }
        // this.$store.dispatch('curChapter',index + 1)
        this.hideListPanel()
        this.$store.state.bar = false
        this.$router.push({name:'reader',params:{jump:'novel',random:Math.floor(Math.random()*199301),title:this.$route.params.title,crawler:url}})
        this.$router.go(0)
      },
      hideListPanel() {
        this.$store.state.list_panel = false
      },
      getList() {
        let _this = this;
          this.$reqs.post('/users/novel', {
            keyn: this.$route.params.title
          }).then(res => {
              _this.chapterList = res.data[0].titles.split('-');
          }).catch(err => {
            console.log(err)
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .list-panel {
    position: fixed;
    transition: all .3s;
    left: 0;
    top: 0;
    bottom: 0;
    right: 50px;
    z-index: 10;
    overflow: auto;
    transform: translateX(-100%);
    &.show {
      transform: translateX(0);
    }
    .list {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width:100%;
      background-color: #fff;
      opacity: 1;
      .list-nav {
        position: fixed;
        height: 50px;
        line-height: 50px;
        text-align: left;
        top: 0;
        left: 20px;
        right: 50px;
        color: #ed424b;
        background-color: #fff;
        border-bottom: 1px solid #ed424b;
        .back {
          position: absolute;
          left: 10px;
          top: 10px;
          width: 30px;
          height: 30px;
        }
        h3 {
          margin: 0 50px;
          display: inline-block;
        }
      }
      .list-content {
        background-color: #fff;
        margin-top: 50px;
        ul {
          padding: 0 15px;
        }
        li {
          color: #333;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
