<template>
  <div class="list-panel" @touchmove:prevent>
    <div class="list">
      <div class="list-nav">
        <!--<i @click="hideListPanel" class="fa fa-chevron-left"></i>-->
        <!--目录会跟着跑bug-->
        <h3 class="btn-group-cell">目录</h3>
      </div>
      <div class="list-content" @touchmove:prevent>
        <ul>
          <li class="chapter-bar">正文卷</li>
          <li v-for="(item,index) in chapterList" @click="jumpTo(index, item.title.split('+')[1])">
            {{item.title.split('+')[0]}}
          </li>
        </ul>
      </div>
    </div>
    <load  v-show="loadingList"></load>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from  'vuex'
  import load from '../../common/loading-2'
  import localEvent from '../../../store/local'

  export default {
    data() {
      return {
        chapterList: [],
        loadingList: false,
      }
    },
    props: {
      bookId: {
        type:String,
        required: true
      },
    },
    computed: {
      ...mapState([
         'list_panel','list_key'
      ])
    },
    created () {
    },
    //监控 list_panel 的前提是要时刻计算computed  mapState的 list_panel，可能需要缓存 title
    watch: {
      list_panel :function () {
        console.log(this.$store.state.list_panel)
        if (this.$store.state.list_panel === true)
        this.getList()
      }
    },
    methods: {
      jumpTo(index,url) {
        if (index >= 50) {
          index = 50
        }

        this.$store.dispatch('curChapter',index + 1)
        this.hideListPanel()
        this.$store.state.bar = false
        this.$router.push({name:'reader',params:{jump:'novel',random:Math.floor(Math.random()*199301),title:this.$route.params.title,crawler:url}})
      },
      hideListPanel() {
        this.$store.state.list_panel = false
      },
      //获取小说目录，请求表booktitles，无需优化
      getList() {
        let keyn = this.$route.params.title
        if (localEvent.StorageGetter('list_key')) this.$store.state.list_key = localEvent.StorageGetter('list_key')

        this.loadingList = true;
        let _this = this;

        //刷新后无this.$route.params.title
          this.$reqs.post('/users/novel', {
            keyn: keyn ? keyn : this.$store.state.list_key
          }).then(res => {
            console.log(res);
            this.loadingList = false;
            _this.chapterList = res.data;
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
    left: 40px;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    overflow: auto;
    overflow-x: hidden;
    background: #fff;
    transform: translateX(200%);
    &.show {
      transform: translateX(0);
    }
    .list {
      position: relative;
      background-color: #fff;
      .list-nav {
        display: table;
        table-layout: fixed;
        height: 50px;
        line-height: 50px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        color: #ed424b;
        border-bottom: 1px solid #ed424b;
        .btn-group-cell{
          font-size: 100%;
          font-weight: 400;
          display: table-cell;
          text-align: center;
        }
      }
      .list-content {
        background-color: #fff;
        ul {
          padding: 0 15px;
        }
        li {
          color: #333;
          border-bottom: 1px solid #f0f1f2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          font-size: 12px/20px;
          padding:8px 1rem;
        }
        li:last-child {
          border-bottom: 1px solid transparent;
        }
        .chapter-bar {
          color: #969ba3;
          background-color: #f6f7f9;
          padding: 5px 1rem;
          width:200%;
          text-indent: 50px;
          margin-left: -50px;
        }
      }
    }
  }
</style>
