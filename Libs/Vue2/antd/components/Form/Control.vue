<script>
import FormControlProps from './mixins/FormControlProps'
import Vue from 'vue';
import components from './FormControl/components';
import * as is from './util/is'
import { strToComponentName } from './util';

export default {
  mixins: [FormControlProps],
  model: {
    prop: "value",
    event: 'change'
  },
  components: components,
  computed: {
    val() {
      const mapPropFunc = this.mapPropValue;
      const value = is.func(mapPropFunc) ? mapPropFunc(this.value) : this.value;
      return value
    },
    ayncComponent() {
      if(is.string(this.component)) {
        return components[`Inner${this.component}`] || strToComponentName(this.component);
      } else {
        return this.component;
      }
    },
    isInnerComponent() {
      return is.string(this.component) && !!components[`Inner${this.component}`];
    }
  },
  render(createElement) {
    let props = {
      value: this.val,
      checked: this.val
    };
    if(this.isInnerComponent) {
      props = {
        ...props,
        options: {
          ...this.options
        }
      }
    } else {
      props = {
        ...props,
        ...this.options
      }
    }
    return createElement(
      this.ayncComponent,
      {
        props: {
          ...props
        },
        on: {
          'change': (val) => {
            const transformFunc = this.transformValue;
            if(val instanceof Event) {
              this.$emit('change', is.func(transformFunc) ? transformFunc(val.target.value) : val.target.value);
            } else {
              this.$emit('change', is.func(transformFunc) ? transformFunc(val) : val)
            }
          }
        }
      }
    )
  }
}
</script>
<style lang="scss">

</style>