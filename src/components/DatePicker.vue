<template>
  <div class="date-picker">
    <v-popover>
      <input type="text" class="picker-input input" readonly :value="dateStr" />
      <template slot="popover">
        <div class="picker-modal">
          <div class="year-selector">{{focusedDate.year()}}</div>
          <div class="month-selector">{{focusedDate.month()+1}}</div>
          <div class="calendar">
            <div
              class="calendar-date"
              v-for="day in monthDates"
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
import { Component, Prop, Model, Vue } from "vue-property-decorator";
import moment, { Moment } from "moment";
import { VPopover } from "v-tooltip";

@Component({
  components: { VPopover }
})
export default class DatePicker extends Vue {
  @Prop({ default: () => new Date(), type: Date }) initialFocusedDate!: Date;
  @Prop({ default: () => new Date(), type: Date }) initialSelectedDate!: Date;
  @Prop({ default: () => new Date(), type: Date })
  initialSelectedDateEnd!: Date;
  @Prop({ default: () => "YYYY-MM-DD", type: String }) format!: string;
  @Prop({ default: false, type: Boolean }) isSelectingDateEnd!: boolean;
  @Prop({ default: false, type: Boolean }) hasDateEnd!: boolean;

  focusedDate: Moment = moment(this.initialFocusedDate);
  selectedDate: Moment = moment(this.initialSelectedDate);
  selectedDateEnd: Moment = moment(this.initialSelectedDate);
  active: boolean = false;

  get dateStr(): string {
    return this.selectedDate.format(this.format);
  }

  get monthDates(): Array<DateDirective> {
    let list = [];
    let currentDay = this.focusedDate
      .clone()
      .startOf("month")
      .startOf("week");
    for (let i = 0; i < 42; i++) {
      list.push(
        new DateDirective(
          currentDay.clone(),
          currentDay.isSame(this.focusedDate, "month"),
          currentDay.isSame(this.selectedDate, "day"),
          currentDay.isSameOrAfter(this.selectedDate, "day") &&
            currentDay.isSameOrBefore(this.selectedDateEnd, "day")
        )
      );
      currentDay.add(1, "day");
    }
    return list;
  }

  selectDate(date: Moment) {
    if (this.isSelectingDateEnd && this.hasDateEnd) this.selectedDateEnd = date;
    else if (this.hasDateEnd) this.selectedDate = date;
    else {
      this.selectedDate = this.selectedDateEnd = date;
    }
    this.focusedDate = date.clone();
    console.log(date);
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
  width: auto
}

.picker-modal {
  background: colors.bg-light
  padding: spaces._4
  box-shadow: spaces._0 spaces._1 12px #79787644
  font-family: fonts-body
  font-weight: 500
  text-align: center
  font-size: font-sizes.body-larger

  .calendar {
    width: 300px
    lost-flex-container: row

    .calendar-date {
      lost-column: 1 / 7 0px 0px
      margin: spaces._1

      &.not-current-month {
        color: #797876
      }

      &.selected {
        background: colors.accent
      }

      &.selected-background {
        background: opacity(colors.accent, 0.6)
      }
    }
  }
}
</style>
