<template>
  <div>
   <vueper-slides autoplay>
  <vueper-slide v-for="(slide) in slides"
    :key="slide.id"
    :title="slide.title"
    :content="slide.content"
    :style="'background-color:red'" />
  <template v-slot:pause>
    <i class="icon pause_circle_outline"></i>
  </template>
</vueper-slides>
  </div>
</template>


<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  name: "Slider",
  components: { VueperSlides, VueperSlide },
  data: () => ({
    pauseOnHover: true,
    autoPlaying: true,
    internalAutoPlaying: true,
    slides: [
      {
        id: "slide-1",
        title: 'Slide <b style="font-size: 1.3em;color: yellow">#1</b>',
        content:
          'Slide title can be HTML.<br>And so does the slide content, <span style="font-size: 1.2em;color: yellow">why not?</span>',
      },
      // Other slides...
    ],
  }),
};
</script>


<style scoped>
</style>