<template>
  <div class="novel">
    <loading v-show="loading"></loading>
    <div class="cent">
      <div class="rig">
        <input type="text" placeholder="请输入书名或作者搜索" v-model="keyn" @keyup.13="search(null,0)">
        <button type="button" @click="search(null,0)" >Search</button>
      </div>

      <p><a href="javascript:" @click="search(null,null)" v-show="tipshow">{{tips}}</a></p>
      <ul  v-show="menyshow" class="menu">
        <li v-for="(item,index) in choics" :key="'choics'+ index">
          <a href="javascript:" @click="search(item.split('+')[1],null)">{{item.split('+')[0]}}</a>
        </li>
        <li><a href="javascript:" @click="search(null,1)"class="meny">都不符合 ? 换一批 <i class="fa fa-sign-out"></i></a></li>
      </ul>

    </div>
    <ul v-show="menusshow" class="flex">
      <li class="flex-1">《{{name}}》 <span v-html="author"></span>  &nbsp; </li>
      <li v-for="(item,index) in menus" :key="'menus'+ index" class="flex-4-1">
        <a href="javascript:" @click="getDetail(item.split('+')[1])">{{item.split('+')[0]}}</a>
      </li>
    </ul>
    <div class="contents" v-show="contentshow">
      <h1>{{title}}</h1>
      <div class="con-header">

        <div class="pre"><a href="javascript:" @click="getDetail(pre)">上一章</a></div>
        <div class="list"><a href="javascript:" @click="search(null,null)">目录</a></div>
        <div class="next"><a href="javascript:" @click="getDetail(next)">下一章</a></div>
      </div>
      <div class="content">

        <p v-for="(c,i) in content" :key="i">&nbsp;&nbsp;&nbsp;&nbsp;{{c}}</p>
      </div>
      <div class="con-footer">
        <div class="pre"><a href="javascript:" @click="getDetail(pre)">上一章</a></div>
        <div class="list"><a href="javascript:" @click="search(null,null)">目录</a></div>
        <div class="next"><a href="javascript:" @click="getDetail(next)">下一章</a></div>
      </div>
    </div>

  </div>
</template>
<script>
  import loading from './loading/loading'

  export default {
    name: 'novel',
    data() {
      return {
        keyn: '',
        menus: [],
        tips: '',
        tipshow: false,
        menyshow: false,
        menusshow:false,
        loading: false,
        choics: [],
        name:'',
        author: '',
        content: [],
        pre: '',
        next: '',
        contentshow: false,
        title:''
      }
    },
    methods: {
      search(url,newpage) {
        //console.log(url);
        this.menusshow = false;
        let _this = this;
        if (this.keyn !== '') {
          this.loading = true
          this.$reqs.post('/users/novel', {
            keyn: this.keyn.trim(),
            page: ++newpage,
            depurl: url
          }).then(res => {
            this.loading = false //获取数据完成后隐藏loading
            if (res.data.tip) {
              this.tipshow = true;
              this.menyshow = false;
              _this.tips = res.data.tip;
            } else if (res.data.meny){
              this.menyshow = true;
              this.tipshow = false;
              _this.choics = res.data.meny.split('-');
            } else {
              this.tipshow = false;
              this.menyshow = false;
              this.menusshow = true;
              _this.menus = res.data[0].titles.split('-');
              _this.name = res.data[0].name;
              _this.author = res.data[0].author;
            }
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          alert('格式不为空')
        }


      },
      getDetail(url) {
        this.loading = true
        this.$reqs.post('/users/novelsc', {
          url: url
        }).then(res => {
          this.loading = false
          this.tipshow = false;
          this.menyshow = false;
          this.menusshow = false;
          this.contentshow = true;
          this.content = res.data.content.split('-');
          this.pre = res.data.previous;
          this.next = res.data.next;
          this.title = res.data.title;
        }).catch(err => {
          this.loading = false
          this.tipshow = false;
          this.menyshow = false;
          this.menusshow = true;
          this.contentshow = false;
          this.loading = false
          console.log(err)
          this.search(null,null);
        })
      }
    },
    components: {
      loading
    }
  }
</script>
<style lang="scss" scoped>
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
      margin:5px 30px;
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

</style>
