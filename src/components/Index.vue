<template>
    <div id="index">
        <!--大画布+atoms-->
        <div id="header">
            <div class="txt">
                <!--        <p>学习没有捷径</p><br>
                        <p>每天的努力 只为拥抱美好的明天</p><br><br>-->
                <br><br><br><br><br>
                <p>Where are you now</p><br>
                <p>Another dream</p><br><br><br>
                <i class="fa fa-angle-double-down"></i>
            </div>
            <!--atoms特效-->
            <atoms class="atoms"></atoms>
        </div>
        <!--1级导航-->
        <div id="nav_box" :class="nav_box === true?' scrolled':''">
            <div class="rig">
                <!--<li class="l2"><a href="">欢迎 {{name}}</a></li>
                  <li class="l2"><a href="#">注销登录</a></li>-->
                <div class="reg tool" @click="chopac()">Tool
                    <div class="nothing"></div>
                    <ul class="opac0" :class="opac===true?'opac0 opac':'opac0'">
                        <li><a href="http://www.zhangxinxu.com/sp/base64.html">图片转base64(拖进来)</a></li>
                        <li><a href="http://browserhacks.com/">浏览器hack</a></li>
                        <li><a href="https://tinypng.com/">TinyPNG</a></li>
                        <li><a href="http://cubic-bezier.com/#.17,.67,.83,.67">CSS贝塞尔曲线可视化</a></li>
                        <li><a href="http://www.zhangxinxu.com/sp/css-compress-mini.html">CSS在线压缩</a></li>
                    </ul>
                </div>

                <div class="log"><router-link to="/login">Login</router-link></div>
                <!--搜索待开发-->
                <div><i class="fa fa-search" @click="search=!search"></i></div>

                <div class="search_input" :class="search === true?' linear_200':' linear_0'">
                    <input type="" name="" placeholder="Search..." v-model="searchwhat" @keyup.13="search_handle" />
                </div>
            </div>
            <a href="http://www.blackatall.cn" class="logo"></a>
            <ul class="nav" :class="nav_mob===true?' _block':''">
                <!--:class-->
                <li v-for="(item,index) in menu"  :key="index">

                    <router-link :to="{name:item.router_name}" @click.native="nav_mob=!nav_mob">
                        <i class="fa" :class="item.icon"></i>&nbsp;{{item.name}}
                    </router-link>
                    <!--2级菜单-->
                    <!--<ul v-show="open" class="list" v-for="(item_l,childIndex) in article_kind" >
                      <li>
                        <router-link :to="'/' + item_l.path">
                          {{item_l.name}}
                        </router-link>
                      </li>
                    </ul>-->
                </li>
            </ul>
            <div class="navmenu" @click="nav_mob=!nav_mob">
                <i class="menu fa fa-bars" aria-hidden="true"></i>
            </div>
        </div>
        <!--路由内容-->
        <!--正则判断路由中带有yuge的正文 .main 修改背景色-->
        <div class="main" :class="reg.test($route.path)?' wrap_gray':'main'">
            <!-- 展示 -->
            <div class="one_block">
                <!--缓存在博客中不建议用-->
                <!--<keep-alive>-->
                <router-view></router-view>
                <!--</keep-alive>-->
                <ft></ft>
            </div>
        </div>
        <!--看！飞机-->
        <div id="toTop" @click="getTop" v-show="isShow">
            <i class="fa fa-space-shuttle" aria-hidden="true"></i>
        </div>
    </div>
</template>
<script>
    import atoms from './vmods/atoms.vue'
    import ft from './vmods/footer.vue'
    /* 引入公共方法 */
    export default{
        name:'index',
        // 传递组件用
        props: {
            scrollmyself: {
                type: Boolean,  // 这是选择滚动对象的props值，如果滚动的对象是当前组件的父元素，就设置scrollObj为true.如果没有设置就默认为window对象
                default: false
            }
        },
        data(){
            return{
                open:!this.index||false,
                nav_box: false,
                isShow: false,
                reg : /yuge/,
                nav_mob:false,
                searchwhat:"",
                search:false,
                bool:true,
                opac:false,
                menu:[
                    {name: "HOME",router_name:"index",icon:'fa-home'},
                    {name: "NOTE",router_name:"articles",icon:'fa-list'},
                    {name: "CASE",router_name:"cases",icon:'fa-coffee'},
                    {name: "NOVEL",router_name:"novel",icon:'fa-home'}
                ],
                article_kind:[
                    {name: "Vue",path:"articles"},
                    {name: "Node",path:"articles"},
                    {name: "Javascript",path:"articles"},
                    {name: "HTML5",path:"articles"},
                    {name: "CSS3",path:"articles"},
                    {name: "Tools",path:"articles"}
                ]
            }
        },
        /*监控路由变化 isTab是对应方法*/
        watch : {
            //'$route':'isTab'
        },
        mounted(){
            //toTop watched
            if (this.scrollmyself) {
                this.target = this.$el.parentNode
            } else {
                this.target = document.body
            }
            //nav_box watched
            window.addEventListener('scroll',this.handleScroll)
        },
        beforeDestroy () {
            //  组件销毁的时候，需要删除scroll的监听事件。
            this.target.removeEventListener('scroll', this.showIcon)
        },
        // 离开该页面需要移除这个监听的事件，不然会报错
        destroyed () {
            window.removeEventListener('scroll',this.handleScroll)
        },
        methods:{
            //双监控
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop|| document.body.scrollTop
                var oNav_box=document.querySelector('#nav_box')
                var offsetTop = oNav_box.offsetTop
                //this.nav_box = scrollTop > offsetTop
                //console.log(scrollTop,offsetTop)
                if (scrollTop > offsetTop){
                    this.nav_box=true
                    this.isShow = true
                } else {
                    this.nav_box=false
                    this.isShow = false
                }
            },
            //搜索
            search_handle () {
                let oMain = document.querySelector('.main')
                //暴力跳转
                //oMain.scrollIntoView()
                this.$router.push('/users/article')
                console.log('想搜'+this.searchwhat+'_&^361klg*吗...不好意思，喝断片了,下次再帮你搜吧,先给你张【笔记】飞机票...')
            },
            //飞机
            getTop () {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                //https://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
            },
            chopac () {
                clearTimeout(this.t)
                this.opac = !this.opac;
                let self = this;
                this.t = setTimeout(function(){
                    if (document.querySelector('.opac')){
                        document.querySelector('.opac').className = 'opac0'
                        self.opac = false
                    }
                },3000)
            }
        },
        components:{
            ft,
            atoms
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    $bottom:5px;
    #index{
        padding-top: 580px;
        font-size: 14px;
        font-family: arial, "Microsoft YaHei", SimHei;

        /*头部*/
        #header{
            background: #101928 url(/static/img/banner02.jpg) center center no-repeat;
            height:580px;
            background-size:auto;
            position:fixed;
            top:0;
            left:0;
            width:100%;

            /*canvas*/
            .atoms{
                position: absolute;
                left: 0;
                top: 0;
                max-width: 100%;
            }
        }
        /*nav*/
        #nav_box{
            height: 80px;
            line-height: 80px;
            box-shadow: 0 2px 5px rgba(13,62,73,0.4);
            position: absolute;
            top: 580px;
            width: 100%;
            min-width: 1200px;
            transition: height 0.5s ease;
            background: #fff;
            z-index: 99;
        }
        /*nav fixed*/
        #nav_box.scrolled{
            position: fixed;
            top: 0;
            width:100%;
            height:60px;
            line-height:60px;
        }
        /* router content*/
        .main {
            padding-top: 80px;
            position: relative;
            background: #fff;

            /*文章content*/
            .one_block {
                overflow: hidden;
            }
        }

        .main.wrap_gray{
            /*战时解决方案*/
            background:#f1f1f1;
        }
        /*looktop*/
        #toTop {
            position: fixed;
            right: 30px;
            bottom: 60px;
            cursor: pointer;
            border: 1px solid #F0F2F5;
            background: #fff;
            border-radius: 3px;
            padding: 10px 7px;
            opacity: 0.5;
            z-index: 999;

            /*飞机*/
            i {
                display: block;
                transform: rotate(-90deg);
                font-size: 24px;
                color: #32475f;
            }
        }
        #toTop:hover {
            opacity: 1;
        }
    }

    #header * {
        position: relative;
        color:#fff;
        z-index:3;
    }
    #header .txt{
        position: absolute;
        top: 70%;
        left: 50%;
        width: 900px;
        height: 400px;
        margin: -180px 0 0 -450px;
        text-align: center;
        font-size:22px;
    }
    i.fa-angle-double-down {
        margin-left: -5px;
        font-size: 25px;
        line-height: 1px;
        animation: arrow_move 0.5s infinite alternate;
        opacity: .7;
    }

    /*箭头动画*/
    @-webkit-keyframes arrow_move {
        to {
            bottom: $bottom;
        }
    }
    @-moz-keyframes arrow_move {
        to {
            bottom: $bottom;
        }
    }
    @-ms-keyframes arrow_move {
        to {
            bottom: $bottom;
        }
    }
    @-o-keyframes arrow_move {
        to {
            bottom: $bottom;
        }
    }
    @keyframes arrow_move {
        to {
            bottom: $bottom;
        }
    }
    /*搜索动画*/
    .linear_200  {
        animation: tof .3s linear;
        animation-fill-mode:forwards;
    }
    .linear_0{
        animation: fto .3s linear;
        animation-fill-mode:forwards;
    }

    $width_200:200px;
    $width_0:0px;
    @-webkit-keyframes tof /*Safari and Chrome*/
    {
        /*    from {width:0px;}*/
        to {width:$width_200;}
    }
    @keyframes tof {
        /*  from {width:0px;}*/
        to {width:$width_200;}
    }
    @-o-keyframes tof {
        /*from {width:0px;}*/
        to {width:$width_200;}
    }
    @-ms-keyframes tof {
        /* from {width:0px;}*/
        to {width:$width_200;}
    }


    @-webkit-keyframes fto /*Safari and Chrome*/
    {
        from {width:$width_200;}
        to {width:$width_0;}
    }
    @keyframes fto {
        from {width:$width_200;}
        to {width:$width_0;}
    }
    @-o-keyframes fto {
        from {width:$width_200;}
        to {width:$width_0;}
    }
    @-ms-keyframes fto {
        from {width:$width_200;}
        to {width:$width_0;}
    }

    /*导航条*/


    .nav {
        text-align: center;
    }
    .rig *{
        color: #fff;
    }
    #nav_box .log,#nav_box .reg,#nav_box .fa-search{
        position: fixed;
        top:50px;
        right:30px;
        line-height: 30px;
    }
    .tool{
        cursor: pointer;
    }
    .nothing{
        height:16px;
    }
    .opac0{
        opacity: 0;
        width:0;
    }
    .opac{
        opacity: 1;
    }
    .tool li{
        box-shadow: 0 2px 5px rgba(13,62,73,0.4);
        width:200px;
        margin-left:-133px;
        border-radius: 2px;
    }
    .tool li a{
        color:#979fa8;
    }
    #nav_box .logo{
        position: fixed;
        top:33px;
        width: 220px;
        height:60px;
        background: url('/static/img/logo2.png');
        background-size: 100%;
        margin-top: -2px;
    }
    #nav_box .log{
        right: 80px;
    }
    /*搜索*/
    #nav_box .fa-search{
        right: 130px;
        cursor: pointer;
    }
    .search_input{
        position: fixed;
        top:50px;
        width: 0px;
        right:165px;
        line-height: 30px;
        border-bottom: 1px solid #007aff;

        input{
            padding:5px;
            width: 95%;
            border:0;
            margin: 0 auto;
            background: transparent;
            color: #fff;
            outline: none;
        }

    }






    /*左右两个固定*/
    #nav_box.scrolled .rig * {
        color:#979fa8;
        top:14px !important;
    }
    #nav_box.scrolled .logo{
        top:3px !important;
        background: url('/static/img/logo.png');
        width: 220px;
        height:60px;
        background-size: 100%;
    }


    .nav * {
        color:#979fa8;
    }
    .nav li {
        display: inline-block;
        margin: 0 20px 0;
        transition: margin 0.5s ease;
        position: relative;
    }
    .nav li:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(to right, #5190ec 8%, #54dcca 90%);
        transition: all 0.3s ease;
    }
    .nav li:hover:after{
        width:100%;
        left:0
    }
    .navmenu{
        text-align: center;
        /*1*/
        display: none;
    }
    .navmenu i{
        cursor: pointer;
        text-rendering: auto;
        /*1*/
        display: inline-block;

        border:1px solid #F0F2F5;
        padding:5px 7px;
        border-radius: 3px;
        position: relative;
        z-index: 99;
        font-size:24px;
        margin:11px auto;
    }
    #nav_box ul li a{
        display: block;
        padding: 0 20px;
    }
    #nav_box ul li a:hover{
        color: #57c5ff;
    }
    /*vue自带点击class*/
    .router-link-exact-active{
        color:#83909e;
        font-weight: 600;
    }

    /*2级导航*/
    .list{
        display: none;
        height:246px;
        position: absolute;
        top: 100%;
        left: 0;
        width: 118px;
        background: #a2c71c;
        color: #fff;
        line-height: 40px;
        border-bottom: 1px solid #fff;
        z-index: 3;
    }
    .list li{
        display: list-item;
        text-align: -webkit-match-parent;
        border-bottom: 1px solid #ddd;
    }

    @media only screen and (min-width:992px){
        .nav {
            display: block !important;
        }
    }
    @media only screen and (max-width:992px){
        .nav {
            position: absolute;
            display: none;
            left:0;
            top:60px;
            width:175px;
            box-shadow:0 1px 5px rgba(13,62,73,.2);
            z-index: 99;
        }
        .nav._block{
            display: inline-block;
        }
        .nav li {
            width: 100%;
            margin:0;
            background:#fff;
            border-bottom:1px solid #f0f2f5;
        }
        .navmenu{
            display: inline-block;
            margin-left:70px;
        }
        #nav_box.scrolled .logo{
            background:url('/static/img/slogo.png') 6px/60px no-repeat;
        }
    }







</style>
