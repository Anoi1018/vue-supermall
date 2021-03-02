<template>
    <div class="check-button">
      <div  class="TickUnchecked" v-show="!isChecked"></div>
      <div  class="TickChecked" v-show="isChecked"></div>
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props:{
          isChecked:{
            type:Boolean,
            default:true
          }
      },

    }
</script>

<style scoped>
  .TickUnchecked {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #5f646e;
  }
  .TickChecked {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f13e3a;
  }
  .TickUnchecked:before,.TickUnchecked:after,
  .TickChecked:before,.TickChecked:after {
    content: '';
    pointer-events: none;
    position: absolute;
    color: white;
    border: 1px solid;
    background-color: white;
  }
  .TickChecked:before,.TickUnchecked:before {
    width: 1px;
    height: 1px;
    left: 25%;
    top: 50%;
    transform: skew(0deg,50deg);
  }
  .TickChecked:after,.TickUnchecked:after {
    width: 3px;
    height: 1px;
    left: 45%;
    top: 42%;
    transform: skew(0deg,-50deg);
  }
</style>
