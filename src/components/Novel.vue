<template>
    <div>
        <p>1.保存搜索记录功能</p>
        <input type="text" placeholder="请输入书名或作者搜索" v-model="keyn">
        <button type="button" @click="search">搜索小说</button>
        <ul>
            <li v-for="(item,index) in menus" :key="index">
                <a :href="menus[index].url">{{menus[index].title}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    import VueJsonp from 'vue-jsonp'
    Vue.use(VueJsonp)
    export default {
        name:'read',
        data () {
            return {
                keyn: '',
                menus:''
            }
        },
        methods: {
            search () {
                if (this.keyn){
                    this.$reqs.post('/users/novel',{
                        keyn: this.keyn.trim()
                    }).then( res=> {
                        this.menus = res.data;
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
