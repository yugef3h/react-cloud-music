<template>
  <div class="novel">
    <top-nav></top-nav>
    <loading v-show="loading"></loading>
    <div class="cent">
      <div class="rig">
        <input type="text" placeholder="请输入书名搜索" v-model="keyn" @keyup.13="search(null,0)">
        <button type="button" @click="search(null,0)"  :disabled="disabled || time > 0">Search</button>
      </div>

      <!--倒计时并自动跳转-->
      <p><a href="javascript:" @click="toZero" v-show="tipshow" class="tips"   v-cloak><small>{{tips}}</small></a></p>


      <!--同名书籍新的api-->
      <ul  v-show="menyshow" class="menu">
        <li v-for="(item,index) in choics" :key="'choics'+ index">
          <a href="javascript:" @click="crawlerMenu(item.split('+')[1], item.split('+')[0])">{{item.split('+')[0]}}</a>
        </li>
        <li><a href="javascript:" @click="search(null,1)"class="meny">都不符合 ? 换一批 <i class="fa fa-sign-out"></i></a></li>
      </ul>

    </div>
    <!--小说目录-->
    <ul v-show="menusshow" class="flex">
      <li class="flex-1">《{{name}}》 <span v-html="author"></span>  &nbsp; </li>
      <li v-for="(item,index) in menus" :key="'menus'+ index" class="flex-4-1" v-if="pclist">
        <router-link :to="{name:'reader',params:{jump:'novel',random:Math.floor(Math.random()*199301),title:keyn.trim(),crawler:item.title.split('+')[1]}}"
                      >{{item.title.split('+')[0]}}</router-link>
      </li>
      <li v-for="(item,index) in menus" :key="'menus'+ index" class="flex-4-1"  v-else>
        <router-link :to="{name:'reader',params:{jump:'novel',random:Math.floor(Math.random()*199301),title:keyn.trim(),crawler:item.title.split('+')[1]}}"
        >{{item.title.split('+')[0]}}</router-link>

<!--location change!!-->
        <!--<pagebar-->
        <!--v-if="ifpage"-->
        <!--:current="pageInfo.current"-->
        <!--:showItem="pageInfo.showItem"-->
        <!--:allpage="pageInfo.allpage"-->
        <!--@on-gopage="gopage">-->
        <!--</pagebar>-->
      </li>
    </ul>
    <div class="search-tags" v-show="tags">
      <a href="javascript:" v-for="(item,index) in recommend" class="btn-line-gray" @click="search(null,0,item.key)">{{item.tag}}</a>
    </div>

  </div>
</template>
<script>
  import loading from '../common/loading'
  import pagebar from '../common/pagebar.vue'


  export default {
    name: 'novel',
    data() {
      return {
        keyn: '',
        menus: [],
        tips: '',
        tipshow: false,
        menyshow: false,
        menusshow: false,
        pclist:true,
        loading: false,
        tags: true,
        choics: [],

        name: '',
        author: '',
        content: [],
        pre: '',
        next: '',
        title: '',
        recommend: [
          {tag: "深夜书屋", key: "深夜书屋"},
          {tag: "龙王传说", key: "龙王传说"},
          {tag: "蛊真人", key: "蛊真人"},
          {tag: "顾道长生", key: "顾道长生"},
          {tag: "重燃", key: "重燃"},
          {tag: "他从地狱来", key: "他从地狱来"},
          {tag: "异化", key: "异化"},
          {tag: "逆流纯真年代", key: "逆流纯真年代"}

        ]
      }
    },

    methods: {
      toZero () {
        this.loading = true
        setTimeout(this.search, 5000)
      },
      //menu爬取加载
      crawlerMenu(url,keyn) {
        this.loading = true
        this.$reqs.post('/users/crawler', {
          url:url,
          keyn:keyn
        }).then(res => {
          this.loading = false
          this.menyshow = false;

          this.tips = res.data.tip;
          this.tipshow = true;
        }).catch(err => {
          console.log(err)
        })
      },

      //搜书分两种，一已收录，二未收录。
      search(url, newpage, key) {
        this.menusshow = false;
        this.loading = true
        let _this = this;


        if (key) this.keyn = key;
        if (this.keyn === '') return;
        this.$reqs.post('/users/novel', {

          keyn: this.keyn.trim(),
          page: ++newpage,
          depurl: url
        }).then(res => {

          this.tags = false;
          this.loading = false //获取数据完成后隐藏loading
          if  (res.data.section){
            this.menyshow = true;
            this.tipshow = false;
            _this.choics = res.data.section.split('-');
          } else {

            this.tipshow = false;
            this.menyshow = false;
            this.menusshow = true;
            // if (document.body.clientWidth <= 500) {
            //   this.pclist = false;
            // }
            //获取目录
             _this.menus = res.data;
             _this.name = res.data[0].novelname;
             _this.author = res.data[0].author;

          }
        }).catch(err => {
          this.loading = false
          console.log(err)
        })


      },
      //获取文章列表
      // getArticleList(page){
      //   let _this = this;
      //   this.$reqs.post('/users/article',{
      //     page:page,
      //     rows:5
      //   }).then(result =>{
      //     _this.listData = result.data.data;
      //     _this.pageInfo.allpage = Math.ceil( result.data.total[0].count/5 );
      //   }).catch(error => {
      //     console.log(error)
      //   });
      // },
      // gopage(index){
      //   this.pageInfo.current = index;
      //   //查询数据
      //   this.getArticleList(index)
      // },

    },
    components: {
      loading,
    }
  }
</script>
<style lang="scss" scoped>
  [v-cloak]{ display:none}
  .novel {
    font-size: 18px;
  }
  .cent {
    text-align: center;
    margin: 18px auto;
  }

  .menu {
    margin: 20px auto;
    width:35%;
    background: #E9FAFF;
    border: 2px solid #88C6E5;
    li {
      border-bottom: 1px dashed #ccc;
    }
    .meny{
      color:#000;

    }
    li:last-child {
      background: #C3DFEA;
    }
  }

  .content {
    letter-spacing: 0.2em;
    padding: 15px;
    font-family: 方正启体简体,"Microsoft YaHei",微软雅黑,宋体;
  }
  input{
    border: 1px solid #1e88e5;
    outline: none;
    padding: 4px;
  }
  button{
    padding: 5px 20px;
    border: 1px solid rgb(200,200,200);
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    color: rgb(255,255,255);
    border-radius: 3px;
    outline:none;
  }
  .flex-4-1{
    border-bottom: 1px dashed #ccc;
    text-align: left;
    text-indent: 10px;
    a{
      color: #000;
    }
  }
  .flex-1 {
    flex-grow:5;
    width:100%;
    background: rgba(229, 230, 241, 0.5);
    text-align: center;
    color: #1669ba;
    font-weight: bold;
  }
  li {
    margin: 2px;
  }
  @media only screen and (min-width:768px) {
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 5px;
    }
    .flex-4-1 {
      flex-grow:1;
      width: 30%;

    }
  }
  @media only screen and (max-width: 767px) {
    .menu {
      width: 70%;
    }
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 30px;
    }
    .flex-4-1 {
      width: 45%;
    }

  }
  @media only screen and (max-width: 499px) {

    input {
      width: 59%;
    }
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 5px;
    }
    .flex-4-1 {
      width: 100%;
    }
  }
  @media only screen and (min-width:992px) and (max-width:1199px) {
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 5px;
    }
    .flex-4-1 {
      flex-grow:1;
      width: 45%;

    }
  }
  .flex,.content,.con-footer div,.con-header div,h1{
    background: #f9f9fc;
    border: 1px solid #d4d8eb;
    font-size: 13px;
    li a {
      color: #6d93e4;
    }
  }
  p {
    line-height: 1.8;
    overflow: hidden;
    margin: .8em 0;
    font-size:2rem;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }
  .con-footer,.con-header{
    display: flex;

    div {
      flex: 1;
      text-align: center;
      padding:5px;
      border-top:transparent ;
      a {
        color:#000;
      }
    }
    div:first-child {
      border-right: transparent;
    }
    div:nth-child(2) {
      border-right: transparent;
    }
  }
  .con-header div{
    border: 1px solid #d4d8eb;
    border-bottom: transparent;
  }
  h1{
    text-align: center;
    font-size: 18px;
    padding: 20px;
    border-bottom: transparent;
  }
  .tips{
    color: #9966cc;
    font-size: 16px;
  }
  .search-tags {
    padding: .25rem .5rem .75rem 1rem;
  }
  .btn-line, .btn-line-gray, .btn-tag {
    font-size: .8125rem;
    line-height: 1.6875rem;
    display: inline-block;
    padding: .125rem .625rem;
    text-align: center;
    border: 1px solid #d4d8eb;
    border-radius: 99px;
    color:#969ba3;
    font-size: 16px;
    margin: .5rem .5rem 0 0;
  }
</style>
