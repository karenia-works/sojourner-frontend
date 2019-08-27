<template>
  <div class="searchbar">
    <div class="search-line">
      <input
        type="text"
        class="input"
        id="search"
        placeholder="Where?"
        v-model.trim="status.keyword"
      />
      <div id="date-select">
        <!-- <span>,</span> -->
        <date-picker
          :selected-date.sync="status.startTime"
          :selected-date-end="status.endTime"
          :is-selecting-date-end="false"
          :has-date-end="true"
        ></date-picker>
        <span>to</span>
        <date-picker
          :selected-date="status.startTime"
          :selected-date-end.sync="status.endTime"
          :is-selecting-date-end="true"
          :has-date-end="true"
        ></date-picker>
      </div>
      <button id="search-btn" class="btn search-btn" @click.prevent="emitSearch">Search</button>
    </div>
    <div class="search-filters" v-if="showFilters">
      <div class="filter-title filter-item">Filters</div>
      <div class="filter-frame filter-item">
        <div class="filter-frame-title">Room for</div>
        <input type="checkbox" name="roomFor" id="roomFor_one" />
        <label for="roomFor_one">One</label>
        <input type="checkbox" name="roomFor" id="roomFor_two" />
        <label for="roomFor_two">Two</label>
        <input type="checkbox" name="roomFor" id="roomFor_four" />
        <label for="roomFor_four">Four</label>
      </div>
      <div class="filter-frame"></div>
    </div>
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
import moment, { Moment } from "moment";
import DatePicker from "./DatePicker.vue";
import { SearchStatus } from "@/store/search.ts";

@Component({
  components: { DatePicker }
})
export default class SearchBar extends Vue {
  @PropSync("searchStatus", {
    type: SearchStatus,
    default: () => new SearchStatus()
  })
  status!: SearchStatus;

  @Prop({ type: Boolean, default: false })
  showFilters!: boolean;

  @Emit("search")
  emitSearch() {
    return this.status;
  }
}
</script>

<style lang="stylus">
.search-line {
  display: flex
  flex-direction: row
  justify-content: flex-start
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
      lost-column: 5 / 12
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 3 / 3
    }
  }

  #date-select {
    display: flex
    flex-wrap: nowrap

    +break-screen(breakpoints.medium, 0) {
      lost-column: 4 / 12
    }

    +break-screen(0, breakpoints.medium) {
      lost-column: 2 / 4
    }

    .date-picker {
      // display: flex
      flex-shrink: 1
      width: auto
      min-width: 100px
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

.search-filters {
  display: flex
  flex-direction: row
  margin-h: -(spaces._5)

  .filter-frame {
    margin-h: spaces._5
    display: flex
    flex-direction: row

    .filter-frame-title {
      color: colors.text-medium
      font-weight: bold
    }

    .filter-item {
      label:active {
        font-weight: 500
      }
    }
  }

  .filter-title {
    margin-h: spaces._5
    color: colors.text-dark
    font-weight: bold
  }
}
</style>
