<script>
export default {
  props: {
    value: '',
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  render(createElement, context) {
    return createElement(
      this.component,
      {
        props: {
          value: this.value,
          ...this.options
        },
        on: {
          'focus': (...args) => {
            this.$emit('focus', ...args)
          },
          'blur': (...args) => {
            this.$emit('blur', ...args)
          },
          'change': (val) => {
            this.$emit('change', val)
          }
        }
      }
    )
  }
}
</script>