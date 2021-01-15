import CountryGroup from './CountryGroup.vue';
//https://storybook.js.org/docs/react/essentials/controls
export default {
  title: 'Example/Form/FormControl/CountryGroup',
  component: CountryGroup,
  argTypes: {
    change: {
      description: '回调函数',
    },
    value: { 
      description: '国家码',
      default: [],
      control: {
        type: 'object',
      },
    },
  },
};
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CountryGroup },
  template: '<country-group v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  value: ['PT', 'BR', 'AO']
};