<template>
  <a-switch :checked="value" @change="e => handleChange(e)" v-bind="options"/>
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
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss">

</style>