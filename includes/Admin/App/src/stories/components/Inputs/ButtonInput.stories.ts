import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import ButtonInput from "../../../components/Inputs/ButtonInput";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Button",
  component: ButtonInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof ButtonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary button",
    btnVariant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary button",
    btnVariant: "secondary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    btnVariant: "primary",
    disabled: true,
  },
};
