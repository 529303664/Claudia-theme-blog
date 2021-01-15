<template>
  <a-input-number :value="value" @change="handleChange" v-bind="options"/>
</template>
<script>
import FormControlProps from '../mixins/FormControlProps'
export default {
  mixins: [FormControlProps],
  model: {
    prop: "value",
    event: 'change'
  },
  methods: {
    handleChange(value) {
      console.log(value)
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">

</style>