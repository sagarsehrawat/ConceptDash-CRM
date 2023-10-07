import Button from "../Button";

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Primary = {
    args: {
        label: 'Button',
        variant: 'primary'
    }
};

export const IconPrimary = {
    args: {
        icon: '../../Images/allProjects.png',
        label: 'Button',
        variant: 'primary'
    }
};

export const Secondary = {
    args: {
        label: 'Secondary'
    }
};

export const Disabled = {
    args: {
        label: 'Disabled',
        variant: ['primary','secondary'],
        disabled: 'true'
    }
};

export const Primary_Disabled = {
    args: {
        label: 'Disabled',
        disabled: 'true'
    }
};

export const Secondary_Disabled = {
    args: {
        label: 'Disabled',
        variant: 'secondary',
        disabled: 'true',
    }
};

export const Large_Button = {
    args: {
        label: 'Large Button',
        size: 'large'
    }
};

export const Small_Button = {
    args: {
        label: 'Small Button',
        size: 'small'
    }
};


