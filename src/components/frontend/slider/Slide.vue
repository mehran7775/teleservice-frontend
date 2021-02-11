<template>
  <div class="example-3d">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
          <img src="../../../assets/images/slides/sl-1.jpg" alt="">
      </swiper-slide>
        <swiper-slide>
          <img src="../../../assets/images/slides/sl-6.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
          <img src="../../../assets/images/slides/sl-2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
          <img src="../../../assets/images/slides/sl-4.jpg" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    name: 'Slide',
    title: '3D Coverflow effect',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example-3d {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper {
    height: 100%;
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;
      height: 300px;
      text-align: center;
      font-weight: bold;
      font-size: 15px * 2;
      background-color: #2C8DFB;
      background-position: center;
      background-size: cover;
      color: white;
      margin: 2%;

       img{
           width: 100%;
           height: 100%;
           background-size: 100% 100%;
           background-position: cover;
       }
    }

    .swiper-pagination {
      /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: white;
      }
    }
  }
</style>