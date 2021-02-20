<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "Tabbar"
    }
</script>

<style scoped>
#tabbar {
  /*表示弹性布局*/
  display: flex;
  position: fixed;
  left: 0;
  right:0;
  bottom: 0;
  /*box-shaodow 设置阴影*/
  background-color: #f6f6f6;
  /*横向移动过 纵向移动过 阴影范围 颜色和不透明度*/
  box-shadow: 0 -1px 1px rgba(100,100,100,.2)
}

</style>
