import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeProvider } from "./ThemeProvider";

const themes = ["light", "dark"] as const;

const meta: Meta<typeof ThemeProvider> = {
  title: "THEMES/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false, // disables controls UI for children
      table: {
        disable: true // hides children from Args table in Docs
      },
      description: "Children content (hidden in controls)"
    },
    theme: {
      control: { type: "select" },
      options: themes,
      description: "Select UBMedia theme",
      defaultValue: "light"
    }
  }
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

const ThemedContent: React.FC = () => (
  <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", padding: 20 }}>
    Theme Content
  </div>
);

// Custom render to convert children string into React nodes safely
export const Playground: Story = {
  args: {
    theme: "dark"
  },
  render: ({ theme }) => (
    <ThemeProvider theme={theme}>
      <ThemedContent />
    </ThemeProvider>
  )
};

// Optional: Pre-made theme variants using the Playground story
export const LightTheme: Story = {
  ...Playground,
  args: { theme: "light" }
};

export const DarkTheme: Story = {
  ...Playground,
  args: { theme: "dark" }
};
