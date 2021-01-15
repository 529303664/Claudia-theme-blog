import ArrayControl from './Array.vue';
//https://storybook.js.org/docs/react/essentials/controls
export default {
  title: 'Example/Form/FormControl/Array',
  component: ArrayControl,
  argTypes: {
    change: {
      description: '回调函数',
    },
    options: {
      description: '配置',
      default: {
        label: ''
      },
      control: {
        type: 'object',
      },
    },
    value: { 
      description: '值',
      default: [],
      control: {
        type: 'object',
      },
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ArrayControl },
  template: '<array-control v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  value: ['PT', 'BR', 'AO']
};