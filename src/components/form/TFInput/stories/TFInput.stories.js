import TFInput from "../TFInput";

export default {
    title: 'Form/TFInput',
    component: TFInput,
    parameters: {
      layout: 'centered',
      docs: {
          description: {
              component: 'Input Component for form utils using the following props'
          }
      }
    },
    tags: ['autodocs'],
  };

  export const Input = {
    args: {
        name: 'department',
        placeholder: 'Choose Department',
        onChange: () => {},
    }
};

