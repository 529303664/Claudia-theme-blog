<template>
  <div>
    <a-select
      style="width: 200px"
      :not-found-content="fetching ? undefined : null"
      v-bind="originOptions"
      v-model="innerValue"
      @change="handleChange"
      @search="handleSearch"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option :value="formatData(d, 'value')" v-for="d in innerData" :key="d.value">
        {{ formatData(d, 'label') }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
import Select from 'ant-design-vue/lib/select';
import debounce from 'lodash/debounce';
import { replaceTextByData } from '../util'
import  _ from 'lodash'
const debounceTime = 800;
export default {
  components: {
    ASelect: Select
  },
  model: {
    prop: "value",
    event: 'change'
  },
  props: {
    value: {
      type: Array
    },
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    originOptions() {
      const { 
        fetch, 
        fetchOnChange, 
        data, 
        initFetchTime,
         ...resets 
      } = this.options;
      return resets
    },
  },
  watch: {
    options: {
      handler(val, oldVal) {
        if(!_.isEqual(val.data, oldVal.data)) {
          this.innerData = val.data;
        }
      },
      deep: true
    },
    value: {
      handler(val) {
        this.innerValue = _.cloneDeep(val)
      },
      deep: true
    }
  },
  data() {
    this.fetch = debounce(this.fetch, debounceTime)
    return {
      innerData: this.options.data || [],
      innerValue: [],
      fetching: false
    }
  },
  mounted() {
    const { fetch } = this.options;
    this.fetch();
  },
  methods: {
    handleSearch(value) {
      this.fetch(value)
    },
    async fetch(value) {
      const { fetch } = this.options;
      if(!fetch) {
        return
      }
      this.fetching = true;
      const res = await fetch(value);
      this.fetching = false;
      this.innerData = res;
    },
    formatData(d, key) {
      const format = this.options[`${key}Format`];
      let res = '';
      if(format) {
        res = replaceTextByData(d, format);
      }
      return res || d[key]
    },
    handleChange(value) {
      const { fetchOnChange } = this.options;
      fetchOnChange && Object.assign(this, {
        innerValue: value,
        data: [],
        fetching: false,
      });
      this.$emit('change', value)
    }
  }
};
</script>
