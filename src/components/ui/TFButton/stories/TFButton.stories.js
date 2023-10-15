import Button from "../TFButton";

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
        icon: '/assets/icons/Plus.svg',
        label: 'Button',
        variant: 'primary'
    }
};

export const Secondary = {
    args: {
        label: 'Secondary'
    }
};

export const PrimaryDisabled = {
    args: {
        label: 'Disabled',
        disabled: 'true'
    }
};

export const SecondaryDisabled = {
    args: {
        label: 'Disabled',
        variant: 'secondary',
        disabled: 'true',
    }
};

export const LargeButton = {
    args: {
        label: 'Large Button',
        size: 'large'
    }
};

export const SmallButton = {
    args: {
        label: 'Small Button',
        size: 'small'
    }
};


