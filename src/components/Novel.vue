<template>
  <div>
    <p>1.保存搜索记录功能</p>
    <p>2.先从数据库搜索，数据库没有再去爬取，并保存于数据库。注意: 搜索小说若为第一次不能频繁请求。</p>
    <input type="text" placeholder="请输入书名或作者搜索" v-model="keyn">
    <button type="button" @click="search">搜索小说</button>
    <p><a href="javascript:" @click="search" v-show="show">{{tips}}</a></p>
    <ul>
      <li v-for="(item,index) in menus" :key="index">
        <a :href="item.split('+')[1]">{{item.split('+')[0]}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'read',
    data () {
      return {
        keyn: '',
        menus: [],
        tips: '',
        show: false
      }
    },
    methods: {
      search () {
        let _this = this;
        if (this.keyn) {
          this.$reqs.post('/users/novel', {
            keyn: this.keyn.trim()
          }).then(res => {
            console.log(res)
            if (res.data.tip) {
              this.show = true;
              _this.tips = res.data.tip;
            } else {
              this.show = false;
              _this.menus = res.data[0].titles.split('-');
            }


        }).catch(err => {
            console.log(err)
        })
        } else {
          alert('格式不为空')
        }
      }
    }
  }
</script>
<style></style>
