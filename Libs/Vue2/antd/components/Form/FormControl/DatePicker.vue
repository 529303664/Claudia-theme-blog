<template>
  <a-date-picker :value="momentValue" @change="e => handleChange(e)" v-bind="options"/>
</template>
<script>
import FormControlProps from '../mixins/FormControlProps';
import DatePicker from 'ant-design-vue/lib/date-picker';
export default {
  mixins: [FormControlProps],
  components: {
    ADatePicker: DatePicker,
  },
  model: {
    prop: "value",
    event: 'change'
  },
  computed: {
    momentValue() {
      return this.value ? moment(this.value) : null;
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value ? value : '')
    }
  }
}
</script>
<style lang="scss">

</style>