<template>
  <div>
    <loading v-show="loading"></loading>
    <div class="cent">
      <p>1.保存搜索记录功能</p>
      <p>2.翻页</p>
      <input type="text" placeholder="请输入书名或作者搜索" v-model="keyn" @keyup.13="search(null,0)">
      <button type="button" @click="search(null,0)" >Search</button>
      <p><a href="javascript:" @click="search(null,null)" v-show="tipshow">{{tips}}</a></p>
      <ul  v-show="menyshow">
        <li v-for="(item,index) in choics" :key="index">
          <a href="javascript:" @click="search(item.split('+')[1],null)">{{item.split('+')[0]}}</a>
        </li>
        <p><a href="javascript:" @click="search(null,1)"class="meny">都不符合 ? 换一批 =></a></p>
      </ul>

    </div>
    <ul v-show="menusshow" class="flex">
      <li class="flex-1">《{{name}}》 <span v-html="author"></span>  &nbsp; </li>
      <li v-for="(item,index) in menus" :key="index" class="flex-4-1">
        <a :href="item.split('+')[1]">{{item.split('+')[0]}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import loading from './loading/loading'

  export default {
    name: 'read',
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
        author: ''
      }
    },
    methods: {
      search(url,newpage) {

        //console.log(url);
        this.loading = true
        this.menusshow = false;
        let _this = this;
        if (this.keyn) {
          this.$reqs.post('/users/novel', {
            keyn: this.keyn.trim(),
            page: ++newpage,
            depurl: url
          }).then(res => {
            this.loading = false //获取数据完成后隐藏loading
            //console.log(res);
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
            console.log(err)
          })
        } else {
          alert('格式不为空')
        }
      }
    },
    components: {
      loading
    }
  }
</script>
<style lang="scss" scoped>
  .cent {
    text-align: center;
    margin: 5px auto;
  }
  .meny{
    color:orangered;
  }
  .flex{
    background: #E9FAFF;
    border: 2px solid #88C6E5;
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
    background: #C3DFEA;
    text-align: center;
    color: #000;

  }
  li {
    margin: 2px;
  }
  @media only screen and (min-width:768px) {
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 30px;
    }
    .flex-4-1 {
      flex-grow:1;
      width: 30%;

    }
  }
  @media only screen and (max-width: 767px) {
    .flex {
      display: flex;
      flex-wrap: wrap;
      margin:5px 30px;
    }
    .flex-4-1 {
      width: 100%;
    }
  }
</style>
