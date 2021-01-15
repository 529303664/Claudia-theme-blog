<template>
  <a-range-picker :value="value" @change="e => handleChange(e)" v-bind="options"/>
</template>
<script>
import FormControlProps from '../mixins/FormControlProps';
import RangePicker from 'ant-design-vue/lib/date-picker/RangePicker';
// console.log(RangePicker)
export default {
  mixins: [FormControlProps],
  components: {
    // ARangePicker: RangePicker,
  },
  model: {
    prop: "value",
    event: 'change'
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">

</style>