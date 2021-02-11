<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
          <a @click.prevent="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tab-details">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: "Tabs",
  data() {
    return {
      tabs: [],
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name;
      });
    },
  },
  beforeMount() {
    // this.$store.dispatch('showDashboard')
  },
  mounted() {
  },
  created() {
    this.tabs = this.$children;
  },
};
</script>

<style scoped>
</style>