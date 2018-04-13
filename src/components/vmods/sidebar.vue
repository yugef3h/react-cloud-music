<template>
  <div id="sidebar">
    <div class="sidebar-list">
      <div class="hd"><h2>Notice</h2></div>
      <div class="bd">
      </div>
    </div>
    <div class="sidebar-list">
      <div class="hd"><h2>Recent Posts</h2></div>
      <div class="bd">
        <ul class="list-type">
          <li><a href="#">We’ve Moved to Tumblr!</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">YUI Gallery Deprecation Announcement</a></li>

        </ul>
      </div>
    </div>
    <div class="sidebar-list">
      <div class="hd"><h2>Archives</h2></div>
      <div class="bd">
        <select>
          <option>Select Month &nbsp;&nbsp;</option>
          <option>March 2018</option>
          <option>February 2018</option>
          <option>January 2018</option>
        </select>
      </div>
    </div>
    <div class="sidebar-list widget-categories">
      <div class="hd"><h2>Categories</h2></div>
      <div class="bd">
        <ul class="list-type">
          <li><a href="#">Accessibility </a>(25)</li>
          <li><a href="#">CSS 101 </a>(8)</li>
          <li><a href="#">Design </a>(51)</li>
          <li><a href="#">Development </a>(13)</li>
          <li><a href="#">Frontend Jobs at Yahoo </a>(8)</li>
          <li><a href="#">Graded Browser Support </a>(81)</li>
          <li><a href="#">In the Wild  </a>(18)</li>
          <li><a href="#">Target Environments  </a>(8)</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'sidebar',
    data: () => ({
      bFloat: false,
      blogInfo: {
        sidebar_notice: `v2版 Blog 发布`,
        getSidebarCount: 'on',
        getAllCountTag:94,
        getAllCountArticle:109,
        getAllCountPage: 5,
        getAllCountComment:980,
        getAllCountCat: 19,
        lastUpDate:'2018-4-11',
        link: `<a href='/'>Yuge Blog</a>`
      }
    }),
    computed: {

    },
    mounted () {
      let that = this
      window.addEventListener('scroll', function () {
        this.scrollY > 1500 ? that.bFloat = true : that.bFloat = false
      }, false)
    }
  }
</script>
<style lang="scss" scoped>
  .sidebar-list{
    width:300px;
    background: #f9f9fc;
    margin: 20px 0;
    border-radius: 5px;
    border: 1px solid #d4d8eb;
  }
  .sidebar-list:first-child{
    height:90px;
    margin: 25px 0 20px;
  }

  .list-type li {
    color: #d4d5e3;
    list-style-type: disc;
    a {
      color: #6d93e4;
      text-decoration: none;
    }
  }
  h2{
    color: #1669ba;
    font-weight: bold;
  }
  .hd {
    background: rgba(229, 230, 241, 0.5);
    border-radius: 3px 3px 0 0;
    padding: 4px 7px 5px;
  }
  .bd{
    border-radius: 0 0 3px 3px;
    padding: 10px 8px 10px;
  }
  ul, select{
    margin: 0;
    padding-left: 14px;
    font-size:12px;
  }
</style>
