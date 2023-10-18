import TFTypeahead from "../TFTypeahead";

export default {
    title: 'Form/TFTypeahead',
    component: TFTypeahead,
    parameters: {
      layout: 'centered',
      docs: {
          description: {
              component: 'Typeahead Component for form utils using the following props'
          }
      }
    },
    tags: ['autodocs'],
  };

  export const Typeahead = {
    args: {
        name: 'department',
        placeholder: 'Choose Department',
        onChange: () => {},
        options: [{label: "Option 1", value: 1}, {label: "Option 2", value: 2}, {label: "Option 3", value: 3}, {label: "Option 4", value: 4}, {label: "Option 5", value: 5}]
    }
};