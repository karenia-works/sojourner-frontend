<template>
  <div class="searchbar">
    <input type="text" class="input" id="search" placeholder="Where?" v-model.trim="searchStr" />
    <div id="date-select">
      <span>,</span>
      <date-picker
        :selected-date.sync="startDate"
        :selected-date-end="endDate"
        :is-selecting-date-end="false"
        :has-date-end="true"
      ></date-picker>
      <span>to</span>
      <date-picker
        :selected-date="startDate"
        :selected-date-end.sync="endDate"
        :is-selecting-date-end="true"
        :has-date-end="true"
      ></date-picker>
    </div>
    <button id="search-btn" class="btn search-btn" @click.prevent="emitSearch">Search</button>
  </div>
</template>


<script lang="ts">
import { Component, Emit, Vue, Prop, Model } from "vue-property-decorator";
import moment, { Moment } from "moment";
import DatePicker from "./DatePicker.vue";

@Component({
  components: { DatePicker }
})
export default class SearchBar extends Vue {
  @Prop({ default: () => moment(), type: moment }) initialStartDate!: Moment;
  @Prop({ default: () => moment(), type: moment }) initialEndDate!: Moment;
  @Prop({ default: () => "", type: String }) initialSearchStr: string = "";

  startDate_: Moment = this.initialStartDate;
  endDate_: Moment = this.initialEndDate;
  searchStr: string = this.initialSearchStr;

  startDateValid: boolean = true;
  endDateValid: boolean = true;

  get startDate() {
    return this.startDate_;
  }
  get endDate() {
    return this.endDate_;
  }
  set startDate(val: Moment) {
    this.startDate_ = val;
  }
  set endDate(val: Moment) {
    this.endDate_ = val;
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  @Emit("search")
  emitSearch() {
    console.log(
      "",
      this.startDate.toString(),
      this.endDate.toString(),
      this.searchStr
    );
    return new SearchEvent(this.searchStr, this.startDate, this.endDate);
  }
}
export class SearchEvent {
  constructor(
    public searchStr: string,
    public startDate: Moment,
    public endDate: Moment
  ) {}
}
</script>

<style lang="stylus">
.searchbar {
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
</style>
