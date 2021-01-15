<template>
  <a-form>
    <template v-for="formItemGroup in formItems">
      <a-form-item 
       :label="formItemGroup.config.label" 
       :class="`form-item-group ${formItemGroup.groupClassName}`" 
       :key="formItemGroup.groupId">
        <a-row v-bind="formItemGroup.config.row">
          <a-col class="my-form-control" v-for="formItem in formItemGroup.dataSource" :key="formItem.name" v-bind="formItemGroup.config.col">
            <div :ref="formItem.name">
              <a-form-item
                v-if="!getFieldItemHidden(formItem.name)"
                :required="formItem.required"
                :validate-status="errorsFields[formItem.name] ? 'error' : ''"
                :help="errorsFields[formItem.name] || formItem.tip"
                :label="formItem.label"       
                :label-col="formItemGroup.config.labelCol || layout.labelCol"
                :wrapper-col="formItemGroup.config.wrapperCol || layout.wrapperCol"
              >
                <form-control
                  v-bind="formItem.control"
                  :component="formItem.control.component || formatControlType(formItem.type, innerValue[formItem.name])"
                  :options="formatOptions(formItem.control.options, collectValue)"
                  :transformValue="formItem.transformValue"
                  :mapPropValue="formItem.mapPropValue"
                  v-model="innerValue[formItem.name]"
                  @change="value => handleChange(formItem, value)"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>
      </a-form-item>
    </template>
    <a-form-item 
      v-if="layout.submit"
      :label-col="layout.labelCol"
      :wrapper-col="{...layout.wrapperCol, offset: layout.labelCol? layout.labelCol.span : ''}"
    >
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import FormControl from './Control';
import { travelObject, formatControlType, formatOptions } from './util';
import _ from 'lodash';
import * as is from './util/is'
import Schema from 'async-validator';
import debounce from 'lodash/debounce';
import FormProps from './mixins/FormProps'
export default {
  model: {
    prop: "value",
    event: 'change'
  },
  mixins: [FormProps],
  components: {
    FormControl,
  },
  data() {
    this.debounceValidateItem = debounce(this.debounceValidateItem, 500);
    this.validateFields = debounce(this.validateFields, 500)
    this.debounceChange = debounce(this.debounceChange, 200);
    return {
      renderData: [],
      innerValue: this.expendsValue(this.defaultValue),
      errorsFields: {},
    }
  },
  watch: {
    value: {
      handler(val, oldValue) {
        if(!_.isEqual(val, oldValue)) {
          this.mappingValueToInnerValue(val);
        }
      },
      deep: true,
    }
  },
  computed: {
    defaultExpendValues() {
      const data = this.expendsValue(this.defaultValue);
      console.log(data)
      return data
    },
    continueKeys() {
      const { continueKeys = [] } = this.decorator;
      return continueKeys;
    },
    hiddenKeys() {
      const { hiddenKeys = []} = this.decorator;
      return hiddenKeys;
    },
    collectValue() {
     return this.collect();
    },
    descriptor() {
      const descriptor = {};
      this.formItems.map(formItemGroup => {
        formItemGroup.dataSource.map(formItem => {
          descriptor[formItem.name] = formItem.rules;
        })
      });
      return descriptor;
    },
    validator() {
      return new Schema(this.descriptor);
    },
    dataSource() {
      const { valueTypes = {} } = this.decorator;
      const expendsValue = this.defaultExpendValues
      return Object.keys(expendsValue).map(name => {
        const valueOption = valueTypes[name.replace(`value.`, '')] || {};
        const {label, control, rules, ...resetOptions } = valueOption;
        const required = rules ? !!rules.filter(item => item.required)[0] : false
        return {
          name,
          label: label !== undefined ? label : name.replace(/^value\./, ''),
          type: expendsValue[name].type,
          control: {
            ...control
          },
          required, 
          rules: this.rebuildRules(rules || []),
          ...resetOptions,
        }
      })
    },
    /**
     * 构建表单
     */
    formItems() {
      const { continueKeys = [], hiddenKeys = [], valueTypes = {}, group = {} } = this.decorator;
      const dataSource = this.dataSource;
      const groups = _(dataSource).groupBy(item => item.groupIndex === undefined ? Number.POSITIVE_INFINITY : item.groupIndex).value();
      const groupsKey = Object.keys(groups).map(key => Number(key)).sort();
      const groupsData = groupsKey.map(key => {
        const source = groups[key] || [];
        const groupClassName = source[0] ? source[0].groupClassName || `form-item-group-${key}` : `form-item-group-${key}`;
        return {
          groupId: key,
          groupClassName,
          config: group[key] || {},
          dataSource: source
        }
      });
      return groupsData;
    }
  },
  mounted() {
    this.mappingValueToInnerValue(this.value);
  },
  methods: {
    mappingValueToInnerValue(value) {
      const expendsValue = this.expendsValue(this.mapPropsToState(value));
      const expendsValueKeys = Object.keys(expendsValue);
      //empty
      if(expendsValueKeys.length === 0) {
        this.resetForm()
      }
      expendsValueKeys.map(key => {
        if(expendsValue[key] !== undefined) {
          this.innerValue[key] = expendsValue[key];
        } else {
          this.innerValue[key] = this.defaultExpendValues[key]
        }
      })
    },
    //重置表单
    resetForm() {
      Object.keys(this.defaultExpendValues).map(key => {
        this.innerValue[key] = this.defaultExpendValues[key]
      })
    },
    transformStateToProps(state) {
      const { transformStateToProps } = this.decorator;
      if(transformStateToProps){
        return transformStateToProps(state)
      }
      return state;
    },
    mapPropsToState(value) {
      const { mapPropsToState } = this.decorator;
      if(mapPropsToState){
        return mapPropsToState(value)
      }
      return value;
    },
    formatControlType(...args) {
      return formatControlType(...args)
    },
    formatOptions(...args) {
      return formatOptions(...args)
    },
    /**
     * 判断当前表单是否被隐藏
     */
    getFieldItemHidden(fieldName) {
      const target = this.dataSource.filter(item => item.name === fieldName)[0];
      if(!target) {
        return false;
      }
      const $options = formatOptions(target.control.options || {}, this.collectValue);
      return $options.hidden
    },
    /**
     * 根据decorator，value构建出表单值
     */
    expendsValue(value) {
      let continueKeys = this.decorator.continueKeys || [];
      let hiddenKeys = this.decorator.hiddenKeys || [];
      const expendsValue = travelObject(value, 'value', {}, {
        continueKeys: continueKeys.map(item => `value.${item}`),
        hiddenKeys: hiddenKeys.map(item => `value.${item}`),
        showValueOnly: true
      });
      return expendsValue
    },
    handleChange(formItem, value) {
      this.debounceValidateItem(formItem.name, value);
      this.debounceChange(formItem.name, value);
    },
    debounceChange(fieldName, value) {
      const collectValue = this.collect();
      this.$emit('change', this.transformStateToProps(collectValue));
      this.$emit('fieldChange', fieldName.replace(/^value\./, ''), value)
    },
    /**
     * 重新构建rules
     */
    rebuildRules(rules) {
      return rules.map(item => {
        const { validator,  asyncValidator, ...resets } = item;
        return {
          ...item,
          validator: validator ? validator.bind(null, this.collectValue) : null,
          asyncValidator: asyncValidator ? asyncValidator.bind(null, this.collectValue) : null
        }
      });
    },
    /**
     * 获取表单校验Schema
     */
    getValidatorSchema(fields) {
      let descriptor = {};
      Object.keys(this.descriptor).filter(fieldName => {
        const isHidden = this.getFieldItemHidden(fieldName);
        return !isHidden && !!this.descriptor[fieldName];
      }).map(fieldName => descriptor[fieldName] = this.descriptor[fieldName]);
      if(Array.isArray(fields)) {
        descriptor = fields.reduce((prev, field)=> {
          if(!descriptor[field]) {
            return prev;
          }
          return {
            ...prev,
            [field]: descriptor[field]
          }
        }, {});
      }
      return new Schema(descriptor);
    },
    /**
     * 同于校验并清除现有的错误提示
     */
    validateField(fields) {
      // const descriptor = fields.reduce((prev, field)=> {
      //   return {
      //     ...prev,
      //     [field]: this.descriptor[field]
      //   }
      // }, {})

      const validator = this.getValidatorSchema(fields);
      validator.validate(this.innerValue).then(() => {
        fields.map(field => {
          this.errorsFields[field] = undefined;
        })
      }).catch(({ errors }) => {
        if(Array.isArray(errors)) {
          const errorFields = errors.reduce((prev, cur) => {
            return {
              ...prev,
              [cur.field]: cur.message.replace(/value\./g, '')
            }
          }, {});

          fields.map(field => {
            this.errorsFields = {
              ...this.errorsFields,
              [field]: errorFields[field]
            };
          })
        }
      });
    },
    /**
     * 校验一个表单
     */
    debounceValidateItem(formItemName) {
      this.validateField(Object.keys(this.errorsFields).concat([formItemName]));
    },
    validateFields(callback) {
      let ruleNumber = 0;
      const validator = this.getValidatorSchema();
      Object.keys(validator.rules).map(key => {
        ruleNumber += validator.rules[key].length;
      })
      if(ruleNumber === 0) {
         is.func(callback) && callback(null, this.transformStateToProps(this.collectValue))
         return;
      }
      validator.validate(this.innerValue).then(() => {
        this.errorsFields = {};
        // validation passed or without error message
        is.func(callback) && callback(null, this.transformStateToProps(this.collectValue))
      }).catch((err) => {
        const { errors, fields } = err;
        if(!is.array(errors)) {
          console.error(err)
          callback(err, null)
          return;
        }
        const firstError = errors[0];
        const firstField = firstError.field;
        this.scrollIntoView(firstField)
        this.errorsFields = errors.reduce((prev, cur) => {
          return {
            ...prev,
            [cur.field]: cur.message.replace(/value\./g, '')
          }
        }, {})
        is.func(callback) && callback(errors, null);
      });
    },
    /**
     * TODO 兼容性处理
     */
    scrollIntoView(formItemName) {
      try{
        // const element = this.$refs[formItemName][0];
        // if(element) {
        //   element.scrollIntoView();
        // }
      } catch(error) {
        console.warn(`this browser is not support scrollIntoView api`)
      }

    },
    handleSubmit() {
      this.validateFields((errors, value) => {
        console.log(errors, value)
      });
    },
    /**
     * value转化
     */
    collect() {
      let newValue = {};
      try{
        Object.keys(this.innerValue).map(name => {
          newValue = new Function(`value`, `name`, `itemValue`, `${name} = itemValue; return value;`).apply(null, [newValue, name, this.innerValue[name]])
        })
      } catch(err) {
        console.log(err)
      }
      return newValue;
    }
  }
}
</script>
<style lang="scss">
.form-item-group.ant-form-item{
  margin-bottom: 0;
}
.my-form-control{
  .ant-form-item{
    margin: 0 0 10px;
  }
}
</style>