<template>
  <a-row class="country-group-list">
    <a-button-group>
      <a-button v-if="!disabledAll" :type="checkSelectAllByGroup() ? 'primary' : ''" @click="tiggerAll">ALL</a-button>
      <a-button :type="areaChecked.includes(item) ? 'primary' : ''" v-for="item in groups" :key="item" @click="handleSelectGroup(item)">
        {{item}}
      </a-button>
    </a-button-group>
    <div style="width: 100%" class="country-group-checkbox">
      <a-checkbox-group :disabled="checkboxDisabled" v-model="checkedList" :options="checkBoxDataSource" @change="handleChange" />
    </div>
  </a-row>
</template>
<script>
import dataSource, { areaList } from '../data/country';
import FormControlProps from '../mixins/FormControlProps';
import _ from 'lodash';
export default {
  mixins: [FormControlProps],
   model: {
    prop: "value",
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    checkBoxDataSource() {
      return (this.checkboxDisabled && this.areaChecked.length > 0) ? this.dataSource.filter(item => this.areaChecked.includes(item.area)) : this.dataSource;
    },
    checkAreaDisabledAll() {
      return this.options ? this.options.checkAreaDisabledAll : false;
    },
    disabledOther() {
      return this.options ? this.options.disabledOther : false;
    },
    disabledAll() {
      return this.options ? this.options.disabledAll : false;
    },
    mergeAll() {
      return this.options ? this.options.mergeAll : false;
    },
    groups() {
      const groups = _.groupBy(this.dataSource, item => item.area);
      return Object.keys(groups).filter(key => (!this.disabledOther || key != '其他') && groups[key][0].showTab === 1);
    }
  },
  watch: {
    value: {
      handler(val) {
        if(this.mergeAll && val.includes('ALL')) { //包含了ALL
          this.checkedList = this.dataSource.map(item => item.value);
          this.areaChecked = this.groups;
        } else if(!_.isEqual(val, this.checkedList)) {
          this.checkedList = val;
          this.resetAreaChecked();
        }
      },
      deep: true
    },
    'options.disabledAreas': {
      handler(value) {
        this.dataSource = this.resetDataSource()
      },
      deep: true
    }
  },
  data() {
    return {
      modalVisable: true,
      checkedList: this.value || [],
      areaChecked: [],
      isSelectAll: false,
      checkboxDisabled: false,
      dataSource: this.resetDataSource(),
    };
  },
  mounted() {
    this.resetAreaChecked();
  },
  methods: {
    resetDataSource() {
      const disabledAreas = this.options ? this.options.disabledAreas || [] : [];
      return dataSource.filter(item => !disabledAreas.includes(item.areaCode));
    },
    resetAreaChecked() {
      this.areaChecked = [];
      this.groups.map(area => {
        const allAreaList = this.dataSource.filter(d => d.area === area).map(d => d.value);
        let checkedAreaNumber = 0;
        const checkedAreaList = this.checkedList.filter(val => {
          const target = allAreaList.filter(item => item === val)[0];
          return !!target;
        });
        if(allAreaList.length === checkedAreaList.length){
          this.areaChecked.push(area);
        } else { //不满足
          this.areaChecked = _([...this.areaChecked]).remove(d => d !== area).value()
        }
      });
      //全选了
      // if(this.checkedList.length === this.dataSource.length) {
      //   this.areaChecked.push("ALL");
      // } else {
      //   this.areaChecked = _([...this.areaChecked]).remove(d => d !== 'ALL').value()
      // }
    },
    tiggerAll() {
      if(!this.checkSelectAllByGroup()) {
        this.checkedList = [...this.dataSource].map(d => d.value);
        this.areaChecked = [...this.groups];
      } else {
        this.checkedList = []
        this.areaChecked = [];
      }
      this.handleChange(this.checkedList);
    },
    checkSelectAllByGroup(area) {
      return this.dataSource.length === this.checkedList.length;
    },
    handleChange(value) {
      const val = _.uniq(value.filter(item => !!item));
      if(this.mergeAll && val.length === this.dataSource.length) { //全选了
        this.$emit('change', ['ALL'])
      } else {
        this.$emit('change', [...val])
      }
      this.$nextTick(() => {
        this.resetAreaChecked();
      })
    },
    handleSelectGroup(area) {
      let areaChecked = [...this.areaChecked]
      //仅支持单选一个区域码
      if(this.checkAreaDisabledAll && areaChecked.length <= 1) {
        if(areaChecked.includes(area)) {
          areaChecked = [];
          this.checkboxDisabled = false;
          this.checkedList = [];
        } else {
          this.checkboxDisabled = true;
          areaChecked = [area];
          this.checkedList = this.dataSource.filter(item => item.area === area).map(item => item.value);
        }
      } else {
        if(areaChecked.includes(area)) {
          this.checkedList = [...this.checkedList].filter(val => {
            const target = this.dataSource.filter(d => d.value === val)[0];
            return target.area !== area
          })
          areaChecked = _(areaChecked).remove(d => d !== area).value();
        } else {
          areaChecked.push(area);
          const list = this.dataSource.filter(item => item.area === area).map(item => item.value);
          this.checkedList = _([...this.checkedList]).concat(list).value()
        }
      }
      this.handleChange(this.checkedList);
      this.areaChecked = areaChecked;
    }
  }
}
</script>
<style lang="scss">
.country-group-list{
  .country-group-checkbox{
    max-height: 385px;
    overflow-y: scroll;
    margin-top: 10px;
  }
  .country-group-list-control{
    .ant-btn{
      margin-bottom: 8px;
    }
  }
  .ant-checkbox-wrapper{
    width: 160px;
    
  }
}
</style>