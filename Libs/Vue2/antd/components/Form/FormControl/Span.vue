<template>
  <span v-bind="options">{{ value }}</span>
</template>

<script>
import FormControlProps from '../mixins/FormControlProps';
export default {
  mixins: [FormControlProps],
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
    }
  },

  methods: {},

  computed: {},

  mounted() {},

  components: {}
}

</script>
<style lang='scss'>
</style>