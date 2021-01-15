<template>
  <a-input :value="value" @change="e => handleChange(e)" v-bind="options"/>
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
    handleChange(e) {
      console.log(e instanceof Event)
      this.$emit('change', e.target.value)
    }
  }
}
</script>
<style lang="scss">

</style>