<template>
  <Swiper>
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swipperImgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '@/components/common/swiper';
    export default {
      name: "HomeSwiper",
      props: {
          banners: {
            type:Array,
            default(){
              return []
            }
          }
      },
      data(){
        return {
          isLoad:false
        }
      },
      components: {
          Swiper,
          SwiperItem
      },
      methods: {
        swipperImgLoad(){
          if(!this.isLoad) {
            this.isLoad = true;
            this.$emit('swipperImgLoad');
          }
        }
      }
    }
</script>

<style scoped>

</style>
