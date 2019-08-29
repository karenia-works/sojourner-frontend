<template>
  <div class="searchbarAdmin">
    <div class="search-line">
      <input
        type="text"
        class="input"
        id="search"
        placeholder="Type in the keyword you would like to find"
        v-model.trim="status.keyword"
      />
      <button id="search-btn" class="btn search-btn" @click.prevent="emitSearch">Search</button>
    </div>
    <div class="search-filters"></div>
  </div>
</template>


<script lang="ts">
import {
  Component,
  Emit,
  Vue,
  Prop,
  Model,
  PropSync
} from "vue-property-decorator";
import { SearchStatus } from "@/store/search.ts";

@Component({
  components: {}
})
export default class searchbarAdmin extends Vue {
  @PropSync("searchStatus", {
    type: SearchStatus,
    default: () => new SearchStatus()
  })
  status!: SearchStatus;

  @Prop({ type: Boolean, default: false })
  showFiters!: boolean;

  @Emit("search")
  emitSearch() {
    return this.status;
  }
}
</script>

<style lang="stylus" scoped>
.search-line {
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center
  flex-wrap: wrap
  // Fonts
  font-family: fonts-title
  font-size: font-sizes.medium-title

  input,
  button {
    font-size: font-sizes.medium-title
  }

  &>* {
    margin-v: spaces._3
  }

  * {
    align-items: center
  }

  #search {
    +break-screen(breakpoints.medium, 0) {
      lost-column: 9 / 12
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 3 / 3
    }
  }

  #search-btn {
    +break-screen(breakpoints.medium, 0) {
      lost-column: 2 / 12
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 1 / 4
    }
  }
}
</style>
