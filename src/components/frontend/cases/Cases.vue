<template>
  <div v-if="items !=''" class="d-flex flex-column align-items-around">
    <div class="title">
      <h5 class="text-dark text-right">فایل های رادیولوژی:</h5>
    </div>
    <div class="d-flex flex-row align-items-center">
      <div class="p-2">
        <span class="text-left mr-1">انتخاب حوزه تخصص:</span>
      </div>
      <div>
        <select
          class="form-control"
          size="1"
          id="selectBox"
          ref="category"
          @change="checkCategory()"
        >
          <option value="all">همه</option>
          <option
            :value="category"
            v-for="category in categories"
            v-text="category"
          ></option>
        </select>
      </div>
    </div>
    <div
      class="d-flex flex-row justify-content-around align-items-stretch flex-wrap"
    >
      <case
        v-for="item in items"
        :id="item.id"
        :name="item.fullNameSick"
        :meliNumber="item.meliNumber"
        :category="item.category"
        :status="item.status"
        :created_at="item.created_at"
        :expired_at="item.expired_at"
        :name_file="item.name"
      />
    </div>
  </div>
</template>

<script>
import Case from "@/components/frontend/cases/case";
// import Case from './Case'
export default {
  name: "Cases",
  components: { Case },
  data() {
    return {
      category: "all",
    };
  },
  beforeMount() {
    this.$store.dispatch("get_casses");
  },
  computed: {
    items() {
      return this.$store.getters.casses(this.category);
    },
    categories() {
      return this.$store.getters.categories;
    },
    // case_details() {
    //   return this.$store.getters.case_details;
    // },
  },
  // watch: {
  //     items(){
  //         return this.$store.getters.cases;
  //  this.$forceUpdate();
  //     }
  // },
  methods: {
    checkCategory() {
      this.category = this.$refs.category.value;
    },
  },
};
</script>

<style scoped>
.title {
  width: auto;
  height: auto;
  padding: 5px;
}
#selectBox {
  width: auto;
}
#selectBox:hover {
  cursor: pointer;
}
</style>