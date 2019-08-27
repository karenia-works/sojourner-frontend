<template>
  <div class="searchbar">
    <div class="search-line">
      <input
        type="text"
        class="input"
        id="search"
        placeholder="Take me anywhere"
        v-model.trim="status.keyword"
        @keypress.enter="emitSearch"
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
        <list-selection :options="options" :selection.sync="roomType" :multiselect="true"></list-selection>
      </div>
      <div class="filter-frame filter-item">
        <div class="filter-frame-title">Bill by</div>
        <list-selection
          :options="rentOptions"
          :selection.sync="rentType"
          :multiselect="false"
          :allow-empty="true"
        ></list-selection>
      </div>
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
  PropSync,
  Watch
} from "vue-property-decorator";
import moment, { Moment } from "moment";
import DatePicker from "./DatePicker.vue";
import { SearchStatus, RoomType } from "@/store/search.ts";
import ListSelection from "./ListSelection.vue";

@Component({
  components: { DatePicker, ListSelection }
})
export default class SearchBar extends Vue {
  @PropSync("searchStatus", {
    type: SearchStatus,
    default: () => new SearchStatus()
  })
  status!: SearchStatus;

  @Prop({ type: Boolean, default: false })
  showFilters!: boolean;

  options = ["One", "Two", "Four"];
  static roomTypes: Array<RoomType> = ["single", "double", "quad"];
  rentOptions = ["Day", "Month"];

  get roomType(): Set<number> {
    let roomType = new Set<number>();
    this.status.roomType.forEach(val =>
      roomType.add(SearchBar.roomTypes.findIndex(item => item == val))
    );
    return roomType;
  }

  set roomType(value: Set<number>) {
    this.status.roomType.clear();

    Array.from(value.values())
      .map(value => SearchBar.roomTypes[value])
      .forEach(val => this.status.roomType.add(val));
  }

  get rentType(): Set<number> {
    if (this.status.useLongRent === true) {
      return new Set([1]);
    } else if (this.status.useLongRent === false) {
      return new Set([0]);
    } else {
      return new Set([0, 1]);
    }
  }

  set rentType(value: Set<number>) {
    let long = value.has(1);
    let short = value.has(0);

    if (long && !short) this.status.useLongRent = true;
    else if (!long && short) this.status.useLongRent = false;
    else this.status.useLongRent = null;
  }

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
  flex-wrap: wrap
  margin-h: -(spaces._5)

  .filter-frame {
    margin-h: spaces._5
    display: flex
    flex-direction: row

    .filter-frame-title {
      margin-right: spaces._4
      color: colors.text-medium
      font-weight: bold
    }
  }

  .filter-title {
    margin-h: spaces._5
    color: colors.text-dark
    font-weight: bold
  }
}
</style>
