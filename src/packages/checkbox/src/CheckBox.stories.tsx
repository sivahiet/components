import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './CheckBox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    status: {
      control: { type: 'radio' },
      options: ['default', 'error', 'warning', 'success'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Checkbox',
    checked: true,
    disabled: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    label: 'Disabled Indeterminate Checkbox',
    indeterminate: true,
    disabled: true,
  },
};

export const ErrorStatus: Story = {
  args: {
    label: 'Error Checkbox',
    status: 'error',
    checked: true,
  },
};

export const SuccessStatus: Story = {
  args: {
    label: 'Success Checkbox',
    status: 'success',
    checked: true,
  },
};

export const WarningStatus: Story = {
  args: {
    label: 'Warning Checkbox',
    status: 'warning',
    checked: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: 'large',
  },
};

export const NoLabel: Story = {
  args: {},
};

export const VisuallyHiddenLabel: Story = {
  args: {
    label: 'Visually Hidden Label',
    visuallyHiddenLabel: true,
  },
};