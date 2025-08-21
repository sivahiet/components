import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  tags: ["autodocs"],
  component: Input,
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: { type: "select" },
      options: [
        "text",
        "email",
        "password",
        "tel",
        "url",
        "number",
        "search",
        "date",
        "time",
        "datetime_local",
        "month",
        "week",
        "color"
      ]
    }
  }
};
export default meta;

type Story = StoryObj<typeof Input>;

/** ─── Default ─── **/
export const Default: Story = {
  args: {
    id: "default",
    label: "Default Input",
    placeholder: "",
    type: "text" // ✅ default type
  }
};

/** ─── Controlled ─── **/
const ControlledInputExample = () => {
  const [val, setVal] = useState("");
  return (
    <Input
      id="controlled"
      value={val}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(e: any) => setVal(e.target.value)}
      allowClear
      helpText="Type something and use the ✕ to clear"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledInputExample />
};

/** ─── Sizes ─── **/
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input id="small" size="small" label="Small" placeholder="" />
      <Input id="medium" size="medium" label="Medium" placeholder="" />
      <Input id="large" size="large" label="Large" placeholder="" />
    </div>
  )
};

/** ─── Status States ─── **/
export const StatusStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input id="success" status="success" label="Success" placeholder="" />
      <Input id="warning" status="warning" label="Warning" placeholder="" />
      <Input id="error" status="error" label="Error" placeholder="" />
    </div>
  )
};

/** ─── Prefix & Suffix ─── **/
export const WithPrefixSuffix: Story = {
  args: {
    id: "prefix-suffix",
    label: "Search URL",
    prefix: <span>🔍 </span>,
    suffix: <span>.com</span>,
    placeholder: ""
  }
};

/** ─── Disabled ─── **/
export const Disabled: Story = {
  args: {
    id: "disabled",
    label: "Disabled Input",
    placeholder: "",
    disabled: true
  }
};

/** ─── Required ─── **/
export const Required: Story = {
  args: {
    id: "required",
    label: "Required Field",
    placeholder: "",
    required: true,
    helpText: "This field is mandatory"
  }
};
