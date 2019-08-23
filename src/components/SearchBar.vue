<template>
  <div class="searchbar">
    <input type="text" class="input" id="search" placeholder="Where?" v-model.trim="searchStr" />
    <div id="date-select">
      <span>,</span>
      <date-picker></date-picker>
      <span>to</span>
      <input
        type="text"
        class="input"
        id="date_end"
        v-model="endDateStr"
        placeholder="End"
        v-bind:class="{error: !endDateValid}"
      />
    </div>
    <button id="search-btn" class="btn search-btn" @click.prevent="emitSearch">Search</button>
  </div>
</template>


<script lang="ts">
import { Component, Emit, Vue, Prop, Model } from "vue-property-decorator";
import moment from "moment";
import DatePicker from "./DatePicker.vue";

@Component({
  components: { DatePicker }
})
export default class SearchBar extends Vue {
  @Prop({ default: () => new Date(), type: Date }) initialStartDate!: Date;
  @Prop({ default: () => new Date(), type: Date }) initialEndDate!: Date;
  @Prop({ default: () => "", type: String }) initialSearchStr: string = "";

  startDate: Date = this.initialStartDate;
  endDate: Date = this.initialEndDate;
  searchStr: string = this.initialSearchStr;

  startDateValid: boolean = true;
  endDateValid: boolean = true;

  startDateStr_: string = moment(this.startDate).format("MM-DD");
  get startDateStr(): string {
    return this.startDateStr_;
  }
  set startDateStr(val: string) {
    this.startDateStr_ = val;
    let _start = moment(val);
    this.startDateValid = _start.isValid();
    if (_start.isValid()) {
      this.startDate = _start.toDate();
    }
  }

  endDateStr_: string = moment(this.startDate).format("MM-DD");
  get endDateStr(): string {
    return this.endDateStr_;
  }
  set endDateStr(val: string) {
    this.endDateStr_ = val;
    let _end = moment(val);
    this.endDateValid = _end.isValid();
    if (_end.isValid()) {
      this.endDate = _end.toDate();
    }
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  @Emit("search")
  emitSearch() {
    console.log("", this.startDate, this.endDate, this.searchStr);
    return new SearchEvent(this.searchStr, this.startDate, this.endDate);
  }
}
export class SearchEvent {
  constructor(
    public searchStr: string,
    public startDate: Date,
    public endDate: Date
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

    input {
      // display: flex
      // flex-shrink: 1
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
