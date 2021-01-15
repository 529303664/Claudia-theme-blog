<template>
  <div>
    <a-checkbox-group
      class="country-checkbox-group"
      :options="countryOptions"
      :value="value.split(',')"
      :disabled="disabled"
      @change="onChange" />

    <div class="btns" v-if="!disabled">
      <a-button
        type="primary"
        class="area-btn"
        v-for="area in Object.keys(countryCodes)"
        :key="area"
        @click="() => chooseArea(area)">
        {{ countryCodes[area].name }}
      </a-button>
    </div>
  </div>
</template>

<script>
import countryCodes from '../constant/country';

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },
  data() {
    return {
      countryCodes
    }
  },
  computed: {
    countryOptions() {
      const areas = Object.keys(countryCodes);
      return areas.reduce((result, area) => result.concat(Object.keys(countryCodes[area].country)), []).map(item => ({
        label: item,
        value: item
      }));
    }
  },
  methods: {
    onChange(checkedValues) {
      this.$emit('input', checkedValues.join(','));
    },
    chooseArea(area) {
      this.$emit('input', Object.keys(countryCodes[area].country).join(','));
    },
  }
}
</script>

<style lang="scss" scoped>
.btns .area-btn:not(:last-child) {
  margin-right: 20px;
}
</style>

<style lang="scss">
.country-checkbox-group .ant-checkbox-checked + span {
  color: red;
}
</style>