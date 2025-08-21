import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "ATOMS/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    disabled: { control: "boolean" }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button"
  }
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button"
  }
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link Button"
  }
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button"
  }
};

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Solid Button"
  }
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button"
  }
};

export const Dashed: Story = {
  args: {
    variant: "dashed",
    children: "Dashed Button"
  }
};

export const Filled: Story = {
  args: {
    variant: "filled",
    children: "Filled Button"
  }
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: "Gradient Button"
  }
};

export const WithPrefixIcon: Story = {
  args: {
    variant: "primary",
    children: "Add Item",
    prefixIcon: <Plus className="ubmisg-h-4 ubmisg-w-4" />
  }
};

export const WithSuffixIcon: Story = {
  args: {
    variant: "primary",
    children: "Add Item",
    suffixIcon: <Plus className="ubmisg-h-4 ubmisg-w-4" />
  }
};

export const Loading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Processing..."
  }
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    disabled: true
  }
};

export const DisabledGhost: Story = {
  args: {
    variant: "ghost",
    children: "Disabled Ghost",
    disabled: true
  }
};

export const DisabledText: Story = {
  args: {
    variant: "text",
    children: "Disabled Text",
    disabled: true
  }
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "Full Width",
    fullWidth: true
  }
};

export const Circle: Story = {
  args: {
    shape: "circle",
    size: "md",
    variant: "primary",
    prefixIcon: <Plus className="ubmisg-h-4 ubmisg-w-4" />,
    "aria-label": "Add"
  }
};

export const Round: Story = {
  args: {
    shape: "round",
    size: "md",
    variant: "primary",
    prefixIcon: <Plus className="ubmisg-h-4 ubmisg-w-4" />,
    children: "Add"
  }
};
