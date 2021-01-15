import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
const requireComponent = require.context(
  './',
  true,
  /\w+\.vue$/
);
const components = {};
requireComponent.keys().map(filename => {
  const component = requireComponent(filename);
  const componentName = upperFirst(
    camelCase(
      filename
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  components[`Inner${componentName}`] = component.default || component;
})

export default components;