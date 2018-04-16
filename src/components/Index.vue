<template>
  <div class="page-wrapper">
    <div class="page-navbar" :class="nav_box === true?' navbar-fixed':''">
      <nav class="navbar">
        <div class="container">
          <button class="navbar-toggle btn btn-link btn-icon" type="button" @click="navtoggle">
            <i><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></i>
          </button>
          <div class="navbar-header">
            <a href="/" class="navbar-brand"></a>
            <a href="http://www.blackatall.cn" class="navbar-login btn btn-link btn-icon">
                <i class="zmdi zmdi-account-o zmdi-hc-fw"></i>
            </a>
          </div>
          <div class="navbar-container">
            <ul class="nav navbar-nav navbar-main">
              <li><router-link :to="{name:'index'}">Home</router-link></li>
              <li class="dropdown">
                <a href="#" data-toggle="dropdown">Note</a>
                <ul class="dropdown-menu">
                  <li  v-for="(item,index) in menu" :key="index">
                    <router-link :to="{name:item.name}">
                    &nbsp;{{item.router_name}}
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" data-toggle="dropdown">Tools</a>
                <ul class="dropdown-menu">
                  <li><a href="http://www.bootcdn.cn/" target="_blank">BootCDN</a></li>
                  <li><a href="https://tinypng.com/" target="_blank">TinyPNG</a></li>
                  <li><a href="http://www.zhangxinxu.com/sp/base64.html" target="_blank">DragIn Base64</a></li>
                  <li><a href="http://www.zhangxinxu.com/sp/css-compress-mini.html" target="_blank">Css Compressor</a></li>
                </ul>
              </li>
              <li class="dropdown">
                <a href="#" data-toggle="dropdown">Enjoy</a>
                <ul class="dropdown-menu">
                  <li class="nov-search"><router-link to="/novel">Novel Search</router-link></li>
                </ul>
              </li>
              <li>
                <router-link to="/home">Features</router-link>
              </li>
            </ul>
            <ul class="nav navbar-buttons">
              <li><router-link to="/login" class="btn btn-outline btn-light">Log In</router-link></li>
              <li><a href="#" class="btn btn-dark">Create Account</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div class="page-banner page-banner-home">
      <br/><br/><br/><br/><br/><br/>
    </div>
    <section class="wrap">
      <div class="fl">
        <keep-alive exclude="contents">
          <router-view></router-view>
        </keep-alive>
      </div>


      <sidebar class="fr"></sidebar>
    </section>
    <ft></ft>
    <bp></bp>
  </div>
</template>
<script>
  import ft from './vmods/footer.vue'
  import bp from './vmods/backtop.vue'
  import sidebar from './vmods/sidebar.vue'
  import {addClass, removeClass, hasClass} from '../../static/js/untils'
  /* 引入公共方法 */
  export default{
    name: 'index',
    // 传递组件用
    props: {
      scrollmyself: {
        type: Boolean,  // 这是选择滚动对象的props值，如果滚动的对象是当前组件的父元素，就设置scrollObj为true.如果没有设置就默认为window对象
        default: false
      }
    },
    data(){
      return {
        open: !this.index || false,
        nav_box: false,
        isShow: false,
        reg: /yuge/,
        nav_mob: false,
        searchwhat: "",
        search: false,
        bool: true,
        opac: false,
        toggle: false,
        menu: [
          {name: "articles", router_name: "Accessibility"},
          {name: "articles", router_name: "CSS"},
          {name: "articles", router_name: "Design"},
          {name: "articles", router_name: "Frontend Jobs"}
        ]
      }
    },
    /*监控路由变化 isTab是对应方法*/
    watch: {
      //'$route':'isTab'
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      // Show navigation menu on button click
      navtoggle () {
        let btn = this;
        //let target = document.body;
        let target = document.getElementsByClassName('page-wrapper')[0];
        if (!hasClass(target, 'navbar-open')) {
          addClass(btn, 'active');
          addClass(target, 'navbar-open');
        } else {
          addClass(target, 'navbar-closing');
          setTimeout(function () {
            addClass(target, 'navbar-bgfade');
          }, 400);
          setTimeout(function () {
            removeClass(btn, 'active');
            removeClass(target, 'navbar-open navbar-closing navbar-bgfade');
          }, 800);
        }
      },
      //双监控
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var oNav_box = document.querySelector('.page-navbar')
        var offsetTop = oNav_box.offsetTop
        if (scrollTop > offsetTop) {
          this.nav_box = true
          this.isShow = true
        } else {
          this.nav_box = false
          this.isShow = false
        }
      }
    },
    components: {
      ft,
      bp,
      sidebar
    }
  }
</script>
<style scoped>

  .container {
    padding-right: 10px;
    padding-left: 10px;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 768px) {
    .navbar-header {
      float: left;
    }
  }
  @media (min-width: 768px) {
    .container > .navbar-header,
    .container-fluid > .navbar-header,
    .container > .navbar-collapse,
    .container-fluid > .navbar-collapse {
      margin-right: 0;
      margin-left: 0;
    }
  }
  .navbar-brand {
    height: 58px;
    padding: 0;
    margin: -6px 0 -6px;
    font-size: 18px;
    line-height: 20px;
  }
  @media (min-width: 768px) {
    .navbar-brand {
      float: left;
    }
    .navbar > .container .navbar-brand,
    .navbar > .container-fluid .navbar-brand {
      margin-left: 0;
    }
  }
  .navbar-brand {
    height: 58px;
    width: 167px;
    background: url(/static/img/vrlogo.svg) no-repeat 0 0;
    background-size: cover;
  }
  @media (max-width: 767px) {
    .page-navbar .container {
      padding: 0 10px;
    }
    .page-navbar .navbar-header {
      position: relative;
      z-index: 2;
      padding: 0 0 0 36px;
      margin: 0;
      text-align: center;
    }
    .navbar-header .navbar-brand {
      display: inline-block;
      float: right;
      height: 52px;
      width: 152px;
    }
    .navbar-open .navbar-toggle span {
      background-color: #1e88e5;
    }
    .navbar-brand {
      margin: -3px 0 -11px;
    }
  }
  @media (min-width: 768px) {
    .navbar-brand {
      float: left;
    }
    .navbar > .container .navbar-brand,
    .navbar > .container-fluid .navbar-brand {
      margin-left: 0;
    }
  }
  .navbar-login {
    float: none;
  }
  .zmdi {
    display: inline-block;
    font: normal normal normal 14px/1 'Material-Design-Iconic-Font';
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .zmdi-hc-fw {
    width: 1.28571429em;
    text-align: center;
  }

  .btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled], fieldset[disabled] .btn-link {
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {
    border-color: transparent;
  }
  .navbar-toggle:focus {
    outline: 0;
  }
  .btn.btn-icon.btn-link {
    color: #616366;
  }

  .btn {
    display: inline-block;
    min-width: 100px;
    padding: 12px 24px;
    margin-bottom: 0;
    font-size: 15px;
    font-weight: bold;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  @media (max-width: 991px){
    .btn {
      min-width: 86px;
    }
  }


  .btn-icon {
    min-width: 0;
    padding-left: 12px;
    padding-right: 12px;
  }
  .btn:hover, .btn:focus, .btn.focus {
    text-decoration: none;
  }
  .btn:active, .btn.active, .btn.btn-outline:active, .btn.btn-outline.active {
    background-image: none;
    outline: 0;
  }


  .btn-link:hover, .btn-link:focus {
    color: #1e88e5;
    background-color: transparent;
  }
  .btn.btn-icon.btn-link:hover, .btn.btn-icon.btn-link:active, .btn.btn-icon.btn-link.active {
    color: #1e88e5;
  }



  .btn-link {
    color: #1e88e5;
  }
  .btn i {
    margin-right: 16px;
    font-size: 24px;
    vertical-align: bottom;
  }
  .navbar-toggle i {
    padding: 4px 0;
  }
  .btn.btn-icon i, .btn.btn-circle i {
    float: none;
    display: block;
    height: 24px;
    width: 24px;
    margin: 0 auto;
    font-size: 24px;
  }


  .navbar-toggle .icon-bar {
    display: block;
    width: 24px;
    height: 2px;
    border-radius: 1px;
  }
  @media (max-width: 767px){
    .navbar-open .navbar-toggle span {
      background-color: #1e88e5;
    }
  }

  .navbar-toggle .icon-bar + .icon-bar {
    margin-top: 5px;
  }
  .navbar-nav {
    margin: 7.5px -15px;
  }
  .nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .nav > li {
    position: relative;
    display: block;
  }
  @media (min-width: 768px){
    .navbar-nav > li {
      float: left;
    }
  }
  @media (min-width: 768px){
    .navbar-main > li:first-child {
      display: none;
    }
  }


  .nav > li > a {
    position: relative;
    display: block;
    padding: 12px 15px;
  }
  .navbar-nav > li > a {
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 20px;
  }



  a {
    background-color: transparent;
    -webkit-transition: color ease-in .15s;
    transition: color ease-in .15s;
  }
  a, .link {
    color: #1e88e5;
    text-decoration: none;
  }
  a {
    -webkit-transition: color ease-in .15s;
    -moz-transition: color ease-in .15s;
    -ms-transition: color ease-in .15s;
    -o-transition: color ease-in .15s;
    transition: color ease-in .15s;
  }


  .dropup, .dropdown {
    position: relative;
  }
  .navbar-nav > li > .dropdown-menu {
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  .dropdown-menu, .dropdown-confirmation {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: block;
    float: left;
    min-width: 200px;
    padding: 12px 0;
    margin: 2px 0 0;
    font-size: 15px;
    text-align: left;
    list-style: none;
    visibility: hidden;
    opacity: 0;
    background-color: #fff;
    border: 1px solid #dcdee0;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border-radius: 4px;
    -webkit-backface-visibility: hidden;
    -webkit-box-shadow: 0 10px 40px -5px rgba(37,45,51, .25);
    box-shadow: 0 10px 40px -5px rgba(37,45,51, .25);
    -webkit-transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    -webkit-transform: translateX(0px) translateY(20px);
    transform: translateX(0px) translateY(20px);
  }
  .dropdown-menu > li > a, .dropdown-menu > li > span {
    display: block;
    padding: 4px 24px;
    clear: both;
    color: #616366;
    font-weight: 300;
    line-height: 25px;
    white-space: nowrap;
  }
  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus, .dropdown-menu > li > a:active, .dropdown-menu > li > span:hover, .dropdown-menu > li > span:focus, .dropdown-menu > li > span:active {
    color: #1e88e5;
    text-decoration: none;
    cursor: pointer;
  }

  /*btn-light*/
  .btn.btn-light {
    color: #fff;
    background-color: rgba(255,255,255, 0.2);
    border-color: transparent;
  }
  .btn.btn-light.btn-outline {
    border-color: rgba(255,255,255, 0.2);
  }
  .btn.btn-light:hover {
    color: #fff;
    background-color: rgba(255,255,255, 0.2);
    border-color: transparent;
  }
  .btn.btn-outline, .btn.btn-outline.disabled, .btn.btn-outline[disabled], .btn.btn-outline.disabled:hover, .btn.btn-outline[disabled]:hover, .btn.btn-outline.disabled:focus, .btn.btn-outline[disabled]:focus, .btn.btn-outline.disabled.focus, .btn.btn-outline[disabled].focus, .btn.btn-outline.disabled:active, .btn.btn-outline[disabled]:active, .btn.btn-outline.disabled.active, .btn-primary[disabled].active, fieldset[disabled] .btn.btn-outline, fieldset[disabled] .btn.btn-outline:hover, fieldset[disabled] .btn.btn-outline:focus, fieldset[disabled] .btn.btn-outline.focus, fieldset[disabled] .btn.btn-outline:active, fieldset[disabled] .btn.btn-outline.active {
    background: transparent;
    box-shadow: none;
  }



  @media (max-width: 767px){
    .page-navbar {
      -webkit-transition: -webkit-transform .5s .5s, background .5s, padding .1s;
      -moz-transition: -moz-transform .5s .5s, background .5s, padding .1s;
      -o-transition: -o-transform .5s .5s, background .5s, padding .1s;
      transition: transform .5s .5s, background .5s, padding .1s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  }
  .page-navbar {
    height: 96px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1002;
    width: 100%;
    padding: 25px 0;
  }
  @media (min-width: 768px){
    .page-navbar {
      -webkit-transition: background .5s, padding .1s;
      -moz-transition: background .5s, padding .1s;
      -o-transition: background .5s, padding .1s;
      transition: background .5s, padding .1s;
    }
  }


  @media (max-width: 767px){
    .container {
      padding-left: 20px;
      padding-right: 20px;
    }
  }


  @media (min-width: 768px){
    .container {
      width: 100%;
      /* width: 750px; */
    }
  }
  @media (min-width: 992px){
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px){
    .container {
      width: 1170px;
    }
  }

  @media (max-width: 991px){
    .container {
      padding-left: 24px;
      padding-right: 24px;
    }
  }
  @media (min-width: 768px){
    .navbar {
      border-radius: 4px;
    }
  }
  .navbar-toggle {
    position: absolute;
    z-index: 10;
    left: 10px;
  }
  @media (min-width: 768px){
    .navbar-toggle {
      display: none;
    }
  }

  .navbar-toggle .icon-bar {
    background-color: #fff;
  }
  @media (max-width: 767px){
    .navbar-container {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      padding-top: 25px;
      background-color: transparent;
      -webkit-transition: linear background .15s;
      transition: linear background .15s;
      visibility: hidden;
      overflow-y: auto;
    }
  }
  @media (max-width: 767px){
    .navbar-open .navbar-container {
      z-index: 3;
      background-color: rgba(255,255,255,0.95);
      visibility: visible;
    }
  }

  @media (min-width: 767px){
    .navbar-container {
      float: right;
    }
  }

  @media (max-width: 767px){
    .page-navbar .nav {
      margin: 0 0 30px 0;
    }
  }
  @media (min-width: 768px){
    .navbar-nav {
      float: left;
      margin: 0;
    }
  }
  .navbar-main {
    margin: 0;
  }
  .navbar-main > li > a {
    padding: 15px 24px;
    color: rgba(196, 227, 255, 0.8);
    font-size: 16px;
    font-weight: bold;
    -webkit-transition: ease-in color .15s;
    transition: ease-in color .15s;
  }
  .navbar-main > li.active > a,
  .navbar-main > li.open > a,
  .navbar-main > li:hover > a,
  .navbar-main > li:focus > a {
    color: #fff;
    text-decoration: none;
  }

  @media (max-width: 767px){
    .page-navbar .nav > li {
      position: relative;
      padding-left: 65px;
      padding-right: 65px;
    }
  }


  @media (max-width: 1199px){
    .navbar-main > li > a {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  @media (max-width: 991px){
    .navbar-main > li > a {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
  @media (max-width: 767px){
    .navbar-main > li > a {
      color: #363b40;
      text-align: center;
    }
  }




  .page-navbar .navbar-main > li .dropdown-menu {
    border: none;
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }

  @media (min-width: 768px) {
    html:not(.mobile) .page-navbar .navbar-main > li:hover .dropdown-menu,
    html:not(.mobile) .page-navbar .navbar-main > li.open .dropdown-menu {
      opacity: 1;
      visibility: visible;
      -webkit-transform: translateX(0px) translateY(0px);
      transform: translateX(0px) translateY(0px);
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-main > li .dropdown-menu {
      width: 100%;
      min-width: 0;
      padding: 0;
      background: none;
      -webkit-box-shadow: none;
      box-shadow: none;
      -webkit-transition: none;
      transition: none;
      -webkit-transform: translateX(0px) translateY(0);
      transform: translateX(0px) translateY(0);
    }
  }
  .dropdown-menu:after, .dropdown-menu:before, .dropdown-confirmation:after, .dropdown-confirmation:before {
    position: absolute;
    left: 30px;
    top: -16px;
    display: block;
    content: "";
    width: 0;
    height: 0;
    border: 8px solid;
    border-color: transparent transparent #fff transparent;
  }



  .page-navbar .navbar-main > li.open .dropdown-menu {
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 767px){
    .page-navbar .navbar-main > li .dropdown-menu > li {
      text-align: center;
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-main > li .dropdown-menu > li > a {
      -webkit-transition: none;
      transition: none;
    }
  }


  .navbar-buttons {
    float: left;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  @media (max-width: 767px){
    .navbar-buttons {
      float: none;
      padding: 0;
    }
  }
  @media (max-width: 767px){
    .page-navbar .nav {
      margin: 0 0 30px 0;
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-buttons, .page-navbar .navbar-main > li, .navbar-open.navbar-closing .page-navbar .navbar-buttons, .navbar-open.navbar-closing .page-navbar .navbar-main > li {
      -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
      -webkit-transform: translate3d(-100%, 0, 0) translate3d(-2em, 0, 0) scale3d(0.5, 1, 1);
      transform: translate3d(-100%, 0, 0) translate3d(-2em, 0, 0) scale3d(0.5, 1, 1);
      -webkit-transform-origin: 100% 50%;
      transform-origin: 100% 50%;
    }
  }
  @media (max-width: 767px){
    .navbar-open .page-navbar .nav > li, .navbar-open .page-navbar .navbar-buttons {
      -webkit-transition: -webkit-transform 0.5s;
      transition: transform 0.5s;
      -webkit-transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);
      transition-timing-function: cubic-bezier(0.56, 1.19, 0.2, 1.05);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @media (max-width: 767px){
    .navbar-open.navbar-closing .navbar-main > li:first-child, .navbar-open .page-navbar .navbar-buttons {
      -webkit-transition-delay: .3s;
      transition-delay: .3s;
    }
  }


  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li:first-child {
      padding: 0 8px 0 65px;
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li {
      width: 50%;
      padding: 0 8px;
      margin: 0;
    }
  }


  .navbar-buttons > li {
    float: left;
    margin-left: 15px;
  }
  .page-navbar .navbar-buttons > li > a {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    .navbar-container {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      padding-top: 25px;
      background-color: transparent;
      -webkit-transition: linear background .15s;
      transition: linear background .15s;
      visibility: hidden;
      overflow-y: auto;
    }
    .navbar-open .navbar-container {
      z-index: 3;
      background-color: rgba(255,255,255,0.95);
      visibility: visible;
    }
    .navbar-open.navbar-bgfade .navbar-container {
      background-color: transparent;
    }
  }
  @media (max-width: 400px){
    .navbar-container ul:nth-child(2) .btn {
      font-size: .75em;
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li .btn {
      display: block;
      width: 100%;
      min-width: 0;
    }
  }
  .btn-dark {
    color: #fff;
    background-color: #1669ba;
    border-color: #1669ba;
  }
  .btn-dark:hover,
  .btn-dark:active,
  .btn-dark:focus {
    color: #fff;
    background-color: #2177c2;
    border-color: #2177c2;
  }
  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li .btn-dark {
      border-color: #1e88e5;
      background-color: #1e88e5;
    }
  }
  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li .btn-outline {
      border-color: #1e88e5;
      color: #1e88e5;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .navbar-buttons li:last-child {
      display: none;
    }
  }

  @media (max-width: 767px){
    .page-navbar .navbar-buttons > li:last-child {
      padding: 0 65px 0 8px;
    }
  }
  @media (max-width: 767px){
    .page-banner.page-banner-home {
      padding-bottom: 35px;
    }
  }
  .page-banner {
    position: relative;
    padding: 115px 0 60px;
    color: #fff;
  }
  @media (max-width: 991px){
    .page-banner {
      padding-top: 95px;
      padding-bottom: 60px;
    }
  }
  @media (max-width: 626px){
    .page-banner {
      padding-top: 80px;
    }
  }
  @media (max-width: 767px){
    .page-banner-home {
      position: relative;
    }
  }




  .page-banner:after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    min-width: 700px;
    background: #026FCE;
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -ms-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -moz-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -o-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -webkit-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
  }

  .page-banner-home:after {
    height: 300px;
  }
  @media (max-width: 767px){
    .page-banner-home:after {
      height: 100%;
    }
  }
  .bold {
    font-size: 15px;
    font-weight: bold;
  }
  .page-navbar.navbar-fixed {
    position: fixed;
    height: 76px;
    padding: 13px 0;
    background: #026FCE;
    background: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -ms-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -moz-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -o-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: -webkit-linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    background-image: linear-gradient(45deg, #0B4182 1%, #1e88e5 64%, #40BAF5 97%);
    -webkit-box-shadow: 0 0 1px rgba(37,45,51, .5);
    box-shadow: 0 0 1px rgba(37,45,51, .5);
    -webkit-transition: top .1s, background .1s, padding .1s;
    transition: top .1s, background .1s, padding .1s;
  }
  .page-navbar.navbar-fixed.navbar-hidden {
    top: -76px;
    opacity: 0;
  }
  .page-navbar.navbar-fixed.navbar-visible {
    top: 0;
    opacity: 1;
  }
  .fl{
    float:left;
  }
  .fr{
    float:right;
  }
</style>
<style scoped>
  .fl {
    width:850px;
    margin: 10px 10px auto 50px;
  }


  .fr{

    margin: 10px 50px 10px 50px;
  }

  .wrap{
    display:flex;
    justify-content:center;
  }
  @media only screen and (max-width:991px) {
    .fr{
      display: none;
    }
    .fl {
      flex-grow:1;
      width:90%;
      margin: 10px 50px 10px;
    }
  }
  @media only screen and (max-width:767px) {
    .fr{
      display: none;
    }
    .fl {
      flex-grow:1;
      width:90%;
      margin: 0px 20px;
    }
  }
</style>
