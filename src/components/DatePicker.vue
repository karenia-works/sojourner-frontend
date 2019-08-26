<template>
  <div class="date-picker">
    <v-popover>
      <input type="text" class="picker-input input" readonly :value="dateStr" />
      <template slot="popover">
        <div class="picker-modal">
          <div class="month-selector">
            <div class="month-select-last" @click="moveMonthLast()">
              <chevron-left-icon />
            </div>
            <div class="month-display">{{focusedDate.year()}} / {{focusedDate.month()+1}}</div>
            <div class="month-select-next" @click="moveMonthNext()">
              <chevron-right-icon />
            </div>
          </div>
          <div class="calendar">
            <div
              class="calendar-date"
              v-for="day in monthDates()"
              :key="day.unix  "
              :class="day.getClass()"
              @click="selectDate(day.date)"
            >{{day.date.date()}}</div>
          </div>
        </div>
      </template>
    </v-popover>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  PropSync,
  Model,
  Vue,
  Watch,
  Emit
} from "vue-property-decorator";
import moment, { Moment } from "moment";
import { VPopover } from "v-tooltip";
import ChevronLeftIcon from "mdi-vue/ChevronLeft.vue";
import ChevronRightIcon from "mdi-vue/ChevronRight.vue";

@Component({
  components: { VPopover, ChevronLeftIcon, ChevronRightIcon }
})
export default class DatePicker extends Vue {
  // @Prop({ default: () => moment(), type: moment }) FocusedDate!: Moment;
  // @Prop({ default: () => moment(), type: moment }) SelectedDate!: Moment;
  // @Prop({ default: () => moment(), type: moment })
  // SelectedDateEnd!: Date;
  @Prop({ default: () => "YYYY-MM-DD", type: String }) dateFormat!: string;
  @Prop({ default: false, type: Boolean }) isSelectingDateEnd!: boolean;
  @Prop({ default: false, type: Boolean }) hasDateEnd!: boolean;

  @PropSync("focusedDate", { default: () => moment(), type: moment })
  syncFocusedDate!: Moment;
  @PropSync("selectedDate", { default: () => moment(), type: moment })
  syncSelectedDate!: Moment;
  @PropSync("selectedDateEnd", { default: () => moment(), type: moment })
  syncSelectedDateEnd!: Moment;

  active: boolean = false;

  get dateStr(): string {
    let selectedDay = this.isSelectingDateEnd
      ? this.syncSelectedDateEnd
      : this.syncSelectedDate;
    return selectedDay.format(this.dateFormat);
  }

  monthDates(): Array<DateDirective> {
    let list: Array<DateDirective> = [];
    let currentDay = this.syncFocusedDate
      .clone()
      .startOf("month")
      .startOf("week");
    let selectedDay = this.isSelectingDateEnd
      ? this.syncSelectedDateEnd
      : this.syncSelectedDate;
    for (let i = 0; i < 42; i++) {
      list.push(
        new DateDirective(
          currentDay.clone(),
          currentDay.isSame(this.syncFocusedDate, "month"),
          currentDay.isSame(selectedDay, "day"),
          currentDay.isSameOrAfter(this.syncSelectedDate, "day") &&
            currentDay.isSameOrBefore(this.syncSelectedDateEnd, "day")
        )
      );
      currentDay.add(1, "day");
    }
    return list;
  }

  selectDate(date: Moment) {
    if (this.isSelectingDateEnd && this.hasDateEnd)
      this.syncSelectedDateEnd = date;
    else if (this.hasDateEnd) this.syncSelectedDate = date;
    else {
      this.syncSelectedDate = this.syncSelectedDateEnd = date;
    }
    this.syncFocusedDate = date.clone();
  }

  moveMonthLast() {
    this.moveMonth(-1);
  }
  moveMonthNext() {
    this.moveMonth(1);
  }
  moveMonth(delta: number) {
    this.syncFocusedDate = this.syncFocusedDate.add(delta, "month");
    this.$forceUpdate();
  }
}

class DateDirective {
  constructor(
    public date: Moment,
    public isCurrentMonth: boolean = true,
    public isSelected: boolean = false,
    public isSelectedBackground: boolean = false
  ) {}

  getClass(): {
    "not-current-month": boolean;
    selected: boolean;
    "selected-background": boolean;
  } {
    return {
      "not-current-month": !this.isCurrentMonth,
      selected: this.isSelected,
      "selected-background": this.isSelectedBackground
    };
  }
}
</script>


<style lang="stylus" scoped>
.picker-input {
  font-size: inherit
  width: calc(100% - 16px)
}

.picker-modal {
  background: colors.bg-light
  padding: spaces._4
  box-shadow: spaces._0 spaces._1 12px #79787644
  font-family: fonts-body
  font-weight: 500
  text-align: center
  font-size: font-sizes.body-larger

  .month-selector {
    display: flex
    flex-direction: row

    .month-display {
      flex-grow: 1
    }
  }

  .calendar {
    width: 300px
    lost-flex-container: row

    .calendar-date {
      lost-waffle: 1 / 7 flex 4px

      &.not-current-month {
        color: #797876
      }

      &.selected,
      &.selected.selected-background {
        background: colors.accent
      }

      &.selected-background {
        background: alpha(colors.accent, 0.2)
      }
    }
  }
}
</style>
