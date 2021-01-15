import MyForm from './Form.vue';
//https://storybook.js.org/docs/react/essentials/controls
//https://github.com/yiminghe/async-validator
export default {
  title: 'Example/Form',
  component: MyForm,
  argTypes: {
    data: { 
      description: '输入表单数据',
      control: {
        type: 'object',
      },
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyForm },
  template: '<my-form v-bind="$props" />',
});

// export const Default = Template.bind({});
// Default.args = {
//   layout: {
//     labelCol: { span: 2 },
//     wrapperCol:  { span: 22 }
//   },
//   defaultValue: {
//     name: '',
//     array: [0],
//     select: ['1'],
//     $country: ['PT', 'BR', 'AO'],
//     checked: false,
//     startTime: '2020/11/01',
//     endTime: '2020/11/02',
//     object: {
//       key1: 'https://gdl.bigo.sg/cn/bigolive-node/1c2/0QQY6X.png',
//       key2: 'https://gdl.bigo.sg/cn/bigolive-node/1c2/0QQY6X.png',
//       key3: 'https://gdl.bigo.sg/cn/bigolive-node/1c2/0QQY6X.png',
//     },
//   },
//   value: {
//   },
//   decorator: {
//     valueTypes: {
//       'startTime': {
//         control: {
//           component: 'DatePicker',
//         },
//       },
//       'name': {
//         label: '姓名',
//         groupIndex: 0
//       },
//       'array[0]': {
//         label: '数组1',
//         control: {
//           options: {
//             disabled: false,
//             style: 'width: 200px',
//           },
//         },
//         groupIndex: 1,
//       },
//       'country': {
//         label: '选择国家码',
//         groupIndex: 0,
//         control: {
//           component: 'CountryGroup',
//         },
//       },
//       'checked': {
//         label: '开启',
//         groupIndex: 2,
//       },
//       'object.key1': {
//         label: '上传头像',
//         groupIndex: 2,
//         control: {
//           component: "Image",
//         },
//       },
//       'object.key2': {
//         label: '上传头像',
//         groupIndex: 2,
//         control: {
//           component: "Image",
//         },
//       },
//       'object.key3': {
//         label: '上传头像',
//         groupIndex: 2,
//         control: {
//           component: () => import('@components/Upload/imgUrl'),
//         },
//       },
//       'select': { //拉取远程数据
//         control: {
//           component: 'Select',
//           groupIndex: 3,
//           options: {
//             mode: 'multiple',
//             placeholder: '请选择',
//             labelFormat: '{{username}}',
//             valueFormat: '{{key}}',
//             fetchOnChange: true, 
//             fetch: async (value) => {
//               return fetch('https://randomuser.me/api/?results=5').then(response => response.json()).then(body => {
//                 return body.results.map(user => ({
//                   key: `${user.name.first} ${user.name.last}`,
//                   username: user.login.username,
//                 }))
//               })
//             },
//           },
//         },
//       },
//     },
//     // continueKeys: ['country', 'object'],
//   },
//   data: [],
// };
// export const Validate = Template.bind({});
// Validate.args = {
//   layout: {
//     labelCol: { span: 2 },
//     wrapperCol:  { span: 22 }
//   },
//   defaultValue: {
//     name: '',
//     country: [],
//     checked: false,
//   },
//   value: {
//     country: ['PT'],
//     checked: true,
//   },
//   decorator: {
//     valueTypes: {
//       'name': {
//         groupIndex: 0,
//         rules: [
//           {
//             required: true,
//             message: '姓名必须'
//           }
//         ]
//       },
//       'country': {
//         label: '选择国家码',
//         groupIndex: 1,
//         control: {
//           component: 'CountryGroup',
//         },
//         rules: [
//           {
//             validator: (formValue, rule, value, callback) => {
//               if(formValue.checked && value.length > 10) {
//                 callback('国家码必须小于10');
//               } else {
//                 callback(value.length < 5  ? '国家码必须大于5' : undefined);
//               }
//             },
//           },
//         ],
//       },
//       'checked': {
//         label: '开启',
//         groupIndex: 2,
//       },
//     },
//     continueKeys: ['country']
//   },
// }

// export const Group = Template.bind({});
// Group.args = {
//   layout: {
//     labelCol: { span: 2 },
//     wrapperCol:  { span: 22 }
//   },
//   defaultValue: {
//     name: '',
//     startTime: '2020/11/12',
//     endTime: '2020/11/13',
//     checked: false,
//   },
//   decorator: {
//     group: {
//       2: {
//         label: '时间选择',
//         labelCol: {

//         },
//         row: {
//           type: 'flex',
//           justify: 'start',

//         },
//         col: {
//           span: 6
//         }
//       }
//     },
//     valueTypes: {
//       'checked': {
//         label: '开启选择时间'
//       },
//       'startTime': {
//         label: '',
//         groupIndex: 2,
//         control: {
//           component: "DatePicker",
//           options: {
//             $placeholder: "!checked ? '请选择开始日期' : '请选择开始时间'",
//             $showTime: 'checked',
//             $disabled: `name === '振振'`
//           }
//         },
//         rules: [
//           { required: true}
//         ]
//       },
//       'endTime': {
//         label: '',
//         groupIndex: 2,
//         control: {
//           component: "DatePicker",
//           options: {
//             $placeholder: "!checked ? '请选择结束日期' : '请选择结束时间'",
//             $showTime: 'checked',
//           }
//         },
//         rules: [
//           { required: true},
//           {
//             validator: (formValue, rule, value, callback) => {
//               if(new Date(formValue.startTime).getTime() >= new Date(formValue.endTime).getTime()){
//                 callback('开始时间不能大于结束时间')
//               } else {
//                 callback()
//               }
//             },
//           }
//         ]
//       },
//     }
//   }
// }
// export const MapState = Template.bind({})
// MapState.args = {
//   layout: {
//     labelCol: { span: 2 },
//     wrapperCol:  { span: 22 }
//   },
//   defaultValue: {
//     time: []
//   },
//   value: {
//     startTime: '2020/11/13',
//     endTime: '2020/11/14'
//   },
//   decorator: {
//     valueTypes: {
//       'time': {
//         label: '每日开放时间',
//         control: {
//           component: "RangePicker",
//           options: {
            
//           }
//         }
//       }
//     },
//     //将form数据改成props
//     mapPropsToState: (props) => {
//       const {
//         startTime,
//         endTime,
//         ...resets
//       } = props;
//       return {
//         time: [startTime, endTime]
//       }      
//     },
//     transformStateToProps: (state) => {
//       const { time, ...resets } = state;
//       return {
//         startTime: time[0],
//         endTime: time[1],
//         ...resets
//       }
//     },
//     continueKeys: ['time']
//   }
// }

export const $Form = Template.bind({})
$Form.args = {
  layout: {
    labelCol: { span: 2 },
    wrapperCol:  { span: 22 },
    submit: true,
  },
  defaultValue: {
    name: '',
    $$country: ['PT', 'BR', 'AO'],
  },
  decorator: {
    valueTypes: {
      country: {
        label: '国家码',
        control: {
          component: 'CountryGroup',
        },
      },
    },
  },
}