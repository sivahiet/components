import type { Meta, StoryObj } from "@storybook/react-vite";

import InputMask from "./InputMask";

const meta: Meta<typeof InputMask> = {
  title: "Components/InputMask",
  component: InputMask,
  tags: ["autodocs"],
  argTypes: {
    mask: { control: "text" },
    size: { control: "radio", options: ["small", "medium", "large"] },
    status: { control: "radio", options: ["default", "success", "warning", "error"] }
  }
};
export default meta;

type Story = StoryObj<typeof InputMask>;

export const PhoneNumber: Story = {
  args: {
    id: "phone",
    mask: "999-999-9999",
    placeholder: "Enter phone",
    allowClear: true
  }
};

export const CreditCard: Story = {
  args: {
    id: "cc",
    mask: "9999 9999 9999 9999",
    status: "success"
  }
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    mask: "99/99/9999",
    disabled: true,
    defaultValue: "01012000"
  }
};

export const ErrorState: Story = {
  args: {
    id: "error",
    mask: "999-99-9999",
    status: "error",
    helpText: "Invalid SSN format"
  }
};

export const DateFormat: Story = {
  args: {
    id: "date",
    mask: "99/99/9999",
    placeholder: "MM/DD/YYYY",
    label: "Date",
    helpText: "Format: mm/dd/yyyy",
    allowClear: true
  }
};
