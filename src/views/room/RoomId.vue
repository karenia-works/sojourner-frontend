<template>
  <div class="houseDetail">

<section>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</section>
  </div>
</template>

<style lang="stylus" scoped>
section {
  lost-center: 1/3;
}

div {
  lost-column: 0;
}
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class houseDetail extends Vue {
  data(){
    return{
    }
  }
}
</script>
