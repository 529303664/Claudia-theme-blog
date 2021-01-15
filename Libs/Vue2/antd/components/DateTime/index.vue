<template>
  <div>
    <a-date-picker v-model="dateModel" @change="onDateChange" />
    <a-time-picker v-model="timeModel" @change="onTimeChange" />
  </div>
</template>

<script>
import moment from "moment";
import { format } from "@utils/common";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: ["value"],
  name: "DateTime",
  data() {
    return {
      dateModel: moment(new Date(), "YYYY-MM-DD HH:mm:ss").utcOffset(8),
      timeModel: moment(new Date(), "YYYY-MM-DD HH:mm:ss").utcOffset(8),
      date: null,
      time: null
    };
  },
  created() {
    this.dateModel = moment(
      new Date(this.value),
      "YYYY-MM-DD HH:mm:ss"
    ).utcOffset(8);
    this.timeModel = moment(
      new Date(this.value),
      "YYYY-MM-DD HH:mm:ss"
    ).utcOffset(8);
    this.date = moment(this.value)
      .utcOffset(8)
      .format("YYYY-MM-DD");
    this.time = moment(this.value)
      .utcOffset(8)
      .format("HH:mm:ss");
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        if (this.value) {
          this.dateModel = moment(
            new Date(this.value),
            "YYYY-MM-DD HH:mm:ss"
          ).utcOffset(8);
          this.timeModel = moment(
            new Date(this.value),
            "YYYY-MM-DD HH:mm:ss"
          ).utcOffset(8);
          this.date = moment(this.value)
            .utcOffset(8)
            .format("YYYY-MM-DD");
          this.time = moment(this.value)
            .utcOffset(8)
            .format("HH:mm:ss");
        }
      }
    }
  },
  methods: {
    moment,
    emitChange() {
      if (!this.date || !this.time) {
        this.$emit("change", "");
        return;
      }
      const newTime = +moment(`${this.date} ${this.time}`).utcOffset(8);
      this.$emit("change", newTime);
    },
    onDateChange(date, dateString) {
      this.date = dateString;
      this.emitChange();
    },
    onTimeChange(time, timeString) {
      this.time = timeString;
      this.emitChange();
    }
  }
};
</script>
<style scoped>
</style>