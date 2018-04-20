<template>
  <div>
    <div class="container">
      <div class="progress">
        <div class="progress-bar">
          <div class="progress-shadow"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loading',
    data () {
      return {
        msg: '加载中...'
      }
    }
  }
</script>
<style lang="scss" scoped>
  /* GRID */
  .container {
    width: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 9;
  }
  /* PROGRESS */
  .progress {
    background-color: #e5e9eb;
    height: 2px;
    position: relative;
  }
  .progress-bar {
    animation-duration: 6s;
    animation-name: width;
    background-image: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
    /*background-size: 24em 0.25em;*/
    height: 100%;
    position: relative;
  }
  .progress-shadow {
    background-image: linear-gradient(to bottom, #eaecee, transparent);
    height: 1px;
    position: absolute;
    top: 100%;
    transform-origin: 0 0;
    width: 100%;
  }
  /* ANIMATIONS */
  @keyframes width {
    0%, 100% {
      transition-timing-function: cubic-bezier(1, 0, 0.65, 0.85);
    }
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
</style>

