<template>
  <div class="essay">
    <div class="indexContainer">
      <!--<div class="btnsContainer">
        <div class="btn" @click="getMdValueFn">获取mdValue</div>
        <div class="btn" @click="getHtmlValueFn">获取htmlValue</div>
      </div>-->
      <!--<div class="maskContainer" v-if="dilogStatus">
        <div class="contentContainer">
          <div class="closeBtnContainer" @click="closeMaskFn"></div>
          <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
        </div>
      </div>-->
      <div class="editorContainer">
        <markdown
          :mdValuesP="msg.mdValue"
          :fullPageStatusP="false"
          :editStatusP="true"
          :previewStatusP="true"
          :navStatusP="true"
          :icoStatusP="false"
          @childevent="childEventHandler"
        ></markdown>
        <!--变量后面的大写P表示是从父组件中传入的参数-->
        <!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
        <!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
        <!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
        <!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
        <!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
        <!--:icoStatusP="false" 加载时是否显示版权标志（true显示/false不显示）,如果取消掉，请勿忘挖井人，谢谢！-->
        <!--@childevent="childEventHandler" 子组件的$.emit()事件触发，便于父组件监听-->
      </div>
    </div>
    <button class="btn uploadBtn" @click="release">发布</button>&nbsp
    <button class="btn" @click="toArtlist()">取消</button>
  </div>
</template>
<script>
  import markdown from './markdown.vue'
  export default {
    name: 'essay',
    data () {
      return {
        editor: null,
        title:'',
        //msgShow:'我要显示的内容',
        //dilogStatus:false,
        msg: {
          mdValue:''
        }
      }
    },
    mounted() {
      document.querySelector('.essay').style.overflow='hidden';
    },
    components: {
      markdown
    },
    methods: {
      release () {
        //console.log(this.msg.title)
        var _this = this
        _this.$reqs.post("/users/essay",{
          title:this.msg.title,
          content:this.msg.htmlValue
        }).then(res => {
          // 有response才跳转
          if(res){
            //console.log(res)
            this.$router.push({path:'/backStage/articleList'});
          }
        }).catch(error => {
          //失败
          console.log(error)
        });
      },
      toArtlist () {
        this.$router.push({path:'/backStage/articleList'});
      },
      // markdown以下
      childEventHandler:function(res){
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.msg=res;
      },
/*      getMdValueFn:function(){
        this.msgShow=this.msg.mdValue;
        this.dilogStatus=true;
      },
      getHtmlValueFn:function(){
        this.msgShow=this.msg.htmlValue;
        this.dilogStatus=true;

      },
      closeMaskFn:function(){
        this.msgShow='';
        this.dilogStatus=false;
      }*/
    }
  }
</script>
<style scoped>

  /*markdown*/
    .show{
      position: absolute;
      left: 0;
      top: 0;
    }
    .indexContainer {
      margin-top: 10px;
      width: 100%;
      height: 470px;
      background: #ddd;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .btnsContainer{
      position: absolute;
      z-index: 10;
      left: 65px;
      top: 5px;
      height: 25px;
      min-width: 300px;
    // background: pink;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    .btn{
      display: inline-block;
      border:1px solid #ccc;
      margin-right: 10px;
      box-sizing: border-box;
      padding: 0 10px;
      background: #fff;
      font-size: 12px;
      height: 25px;
      line-height: 25px;
      cursor:pointer;
      moz-user-select: -moz-none;
      -moz-user-select: none;
      -o-user-select:none;
      -khtml-user-select:none; /* you could also put this in a class */
      -webkit-user-select:none;/* and add the CSS class here instead */
      -ms-user-select:none;
      user-select:none;/**禁止选中文字*/
    &:active{
       opacity: 0.8;
       background: lightblue;
     }
    }
    }
    .maskContainer{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      height: 100vh;
      width: 100vw;
      background: rgba(0,0,0,0.5);
    // z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
    .contentContainer{
      width: 60%;
      height: 60%;
      background: #fefefe;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
    .showAreaContainer{
      height: 100%;
      width: 100%;
      outline: none;
      background: #eee;
      display: block;
      resize: none;
      padding: 10px;
      box-sizing: border-box;
    }
    .closeBtnContainer{
      position: absolute;
      height: 30px;
      width: 30px;
      right: -40px;
      top: -40px;
      border:1px solid #fff;
      border-radius: 50%;
    &::before{
       content: '';
       position: absolute;
       width: 70%;
       height: 2px;
       display: bblock;
       background: #fff;
       left: 15%;
       top: calc(50% - 1px);
       transform: rotate(45deg);
       -webkit-transform: rotate(45deg);
       -moz-transform: rotate(45deg);
     }
    &::after{
       content: '';
       position: absolute;
       width: 70%;
       height: 2px;
       display: bblock;
       background: #fff;
       left: 15%;
       top: calc(50% - 1px);
       transform: rotate(-45deg);
       -webkit-transform: rotate(-45deg);
       -moz-transform: rotate(-45deg);
     }
    }
    }
    }

    .editorContainer {
      width: 100%;
      height: 100%;
      border: 1px solid #ddd;
    }


</style>
